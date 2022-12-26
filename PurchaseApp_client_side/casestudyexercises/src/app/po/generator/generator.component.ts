import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Vendor } from '@app/vendor/vendor';
import { Product } from '@app/product/product';
import { Po } from '@app/po/po';
import { PoItem } from '@app/po/po-item';

import { VendorService } from '@app/vendor/vendor.service';
import { ProductService } from '@app/product/product.service';
import { PoService } from '@app/po/po.service';

import { PDFURL } from '@app/constants';

@Component({
  templateUrl: './generator.component.html',
  selector: 'autocomplete-simple-example',
})
export class GeneratorComponent implements OnInit, OnDestroy {
//form
generatorForm: FormGroup;
vendorid: FormControl;
productid:FormControl;

//form control for Qty
productqty:FormControl;

//data
formSubscription?: Subscription;
products$?: Observable<Product[]>; 
vendors$?: Observable<Vendor[]>;
vendorproducts$?: Observable<Product[]>;

items: Array<PoItem>;
selectedproducts: Product[];
selectedProduct: Product;
selectedVendor: Vendor;



//misc
pickedProduct: boolean;
pickedVendor: boolean;

//create boolean for qty
//create selectedQty
selectedQty: String;
pickedQty: boolean;
options: String[] = ['EOQ','0','1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20'];

generated: boolean;
hasProducts: boolean;
msg: string;
total: number;
reportno: number = 0;

sub:number;
subWithTax: number;
tax: number = 0.13;


constructor(
  private builder: FormBuilder, 
  private vendorService: VendorService,
  private productService: ProductService,
  private poSerice: PoService,
  ) {
    this.pickedVendor = false;
    this.pickedProduct = false;

    //initialize picked quantity
    this.pickedQty = false;


    this.generated = false;
    this.msg = '';

    this.vendorid = new FormControl('');
    this.productid = new FormControl('');

    //initializing the form for Qty
    this.productqty = new FormControl('');
    

    this.generatorForm = this.builder.group({
      productid: this.productid,
      vendorid: this.vendorid,

      //form for product quantity
      productqty: this.productqty,
    });

    this.selectedProduct ={
      id:'',
      vendorid:0,
      name:'',
      costprice:0.0,
      msrp:0.0,
      rop:0,
      eoq:0,
      qoh:0,
      qoo:0,
      qrcode:null,
      qrcodetxt :'',
    };

    this.selectedVendor ={
      id:0,
      address1:'',
      city:'',
      province:'',
      postalcode:'',
      phone:'',
      type:'',
      name:'',
      email:'',
    };

    //new variable to hold qty of products
    this.selectedQty = '';

    this.items = new Array<PoItem>();
    this.selectedproducts = new Array<Product>();
    this.hasProducts = false;
    this.total = 0.0;

    this.sub = 0.0;
    this.subWithTax = 0.0;

   }// end of constructor

   ngOnInit(): void {
    this.onPickVendor();
    this.onPickProduct();

    //create onPickQty
    this.onPickQty();

    

    this.msg = 'loading vendors and products from server...';

    (this.vendors$ = this.vendorService.get()),
    catchError((err) => (this.msg = err.message));

    (this.products$ = this.productService.get()),
    catchError((err) => (this.msg = err.message));

    this.msg = 'server data loaded';

  }//ng OnInit

  ngOnDestroy(): void {
      if (this.formSubscription !== undefined) {
        this.formSubscription.unsubscribe();
    }// ngOnDestroy
  }

  onPickVendor(): void {
    this.formSubscription = this.generatorForm.get('vendorid')
    ?.valueChanges.subscribe((val) => {
      this.selectedProduct = {
      id:'',
      vendorid:0,
      name:'',
      costprice:0.0,
      msrp:0.0,
      rop:0,
      eoq:0,
      qoh:0,
      qoo:0,
      qrcode:null,
      qrcodetxt:''

      };

      this.selectedVendor = val;
      this.loadVendorProducts();
      this.pickedProduct = false;
      this.hasProducts = false;
      this.msg = 'choose product for vendor';
      this.pickedVendor = true;

      //pickedqty not ready yet
      this.pickedQty = false;

      this.generated = false;
      this.items = [] //array for the purchase item
      this.selectedproducts = [];
  });
  }// onPickVendor

  onPickProduct():void {
    const productSubscription = this.generatorForm.get('productid')
    ?.valueChanges.subscribe((val) => {
      this.selectedProduct = val;

      const item:PoItem ={
        id:0,
        poid: 0,
        productid: this.selectedProduct?.id,
        qty: 1,
        price: this.selectedProduct.costprice,
        productName: this.selectedProduct?.name,

      };

      if(this.items.find((item) => item.productid === this.selectedProduct?.id)){
        //ignore entry
      }
      else{
        //add entry
        this.items.push(item);
        this.selectedproducts.push(this.selectedProduct);
      }

      if(this.items.length > 0){
        this.hasProducts = true;
        this.pickedProduct = true;
        this.pickedQty = true;
      }

      //might need to adjust this area here
      //create varialbes to adjust mrsp, add tax...etc..
      this.sub = 0.0;
      this.items.forEach((pro) => (this.sub += pro.price))
      this.subWithTax = this.selectedProduct.costprice * this.tax;
      this.total = this.sub + this.subWithTax;
     
    });
    this.formSubscription?.add(productSubscription); //add it as a child
  }// end method onPickProduct

  onPickQty(): void {
    const productqtySubscription = this.generatorForm.get('productqty')
    ?.valueChanges.subscribe((val) => {

      if (val === 'EOQ') {
        this.items.find((i) => {
          if (i.productid === this.selectedProduct?.id) {
            i.qty = this.selectedProduct.eoq;
            //i.price = this.selectedProduct.costprice * this.selectedProduct.eoq;
            i.price = this.selectedProduct.msrp;
            this.msg = `${i.qty} ${this.selectedProduct.name} added`;
          }
        });
      
      }
      else if(val === '0'){
        this.items = this.items.filter(
          (i) => i.productid !== this.selectedProduct?.id
        );
        this.selectedproducts = this.selectedproducts.filter(
          (i) => i.id !== this.selectedProduct?.id
        );
        this.msg = `All ${this.selectedProduct.name} removed!`;
      }
      else {
       var tempQty = Number(val);
       this.items.find((i) => {
        if (i.productid === this.selectedProduct?.id) 
        {
          i.qty = tempQty;
          //i.price = this.selectedProduct.costprice * tempQty; 
          i.price = this.selectedProduct.costprice;
          this.msg = `${i.qty} ${this.selectedProduct.name} added`;
        }
      });

      }

      if (this.items.length === 0) {
        this.hasProducts = false;
        this.pickedProduct = false;
      }

      this.sub = 0.0;
      this.items.forEach((i) => {this.sub += i.price * i.qty;});
      this.subWithTax = this.sub * this.tax;
      this.total = this.sub + this.subWithTax;
      
    });
    
    this.formSubscription?.add(productqtySubscription); //add it as a child
  }

  loadVendorProducts(): void {

    this.vendorproducts$ = this.products$?.pipe(
      map((products) => 
      products.filter(
        (product)=> product.vendorid === this.selectedVendor?.id
        )
      )
    );
  }//end method loadVendorProducts

  createPo(): void {
    this.generated = false;
    const po: Po ={
      id: 0,
      vendorid: this.selectedProduct.vendorid,
      items: this.items,
      amount: this.total,
    };

    this.poSerice.add(po).subscribe({
      //observer object
      next: (po: Po) => {
        po.id > 0 ? (this.msg = `Purchase order ${po.id} added!`)
        : (this.msg = `Purchase order note added! - server error`);
        this.reportno = po.id;
      },

      error: (err:Error) => (this.msg = `Purchase order not added! - ${err.message}`),
      complete: () => {
        this.hasProducts = false;
        this.pickedVendor = false;
        this.pickedProduct = false;
        this.generated = true;
        this.pickedQty = false;
      },



    });


  }// end method createPo 
  viewPdf(): void {
    window.open(`${PDFURL}${this.reportno}`, '');
    } // viewPdf
 

}// end GeneratorComponent
