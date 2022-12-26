import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Product } from '@app/product/product';
import { ProductService } from '@app/product/product.service';
import { Vendor } from '@app/vendor/vendor';
import { VendorService } from '@app/vendor/vendor.service';
import { Observable, Subscription } from 'rxjs';
import { PoService } from '../po.service';
import { catchError, map } from 'rxjs/operators';
import { Po } from '@app/po/po';
import { PDFURL } from '@app/constants';


@Component({
  selector: 'app-poviewer',
  templateUrl: './poviewer.component.html',
  styles: [
  ]
})
export class PoviewerComponent implements OnInit, OnDestroy {
  
  poviewerForm: FormGroup;
  vendorid:FormControl;
  poid:FormControl;
  formSubscription?: Subscription;

  //observables
  vendors$?: Observable<Vendor[]>; //all vendors
  products$?: Observable<Product[]>; //all products
  purchaseOrders$?:Observable<Po[]>

  //arrays
  vendorProducts?: Product[]; // products for selected vendor
  purchaseOrderProducts?: Product[]; //products from the purchase order
  selectedproducts: Product[]; // expenses that being displayed currently in app

  //objects
  selectedVendor: Vendor; //the current selected vendor
  selectedPurchaseOrder: Po; //current selected purchase order

 
  msg: string;
  pickedVendor: boolean;
  pickedPurchaseOrder: boolean;
  generated: boolean;
  total: number;
  purchaseOrderNo: number = 0;
  tax: number;
  sub: number;
  showPdf: boolean;
  

  constructor(private builder:FormBuilder, 
    private vendorService: VendorService,
    private poService: PoService,
    private productService: ProductService) {

      this.vendorid = new FormControl('');
      this.poid = new FormControl('');

      this.poviewerForm = this.builder.group({
        vendorid: this.vendorid,
        poid: this.poid,
      })

      this.msg = '';
      this.pickedVendor = false;
      this.pickedPurchaseOrder = false;
      this.generated = false;
      this.total = 0.0;
      this.selectedproducts = new Array<Product>();
      this.sub = 0;
      this.tax = 0;
      this.showPdf = false;

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

      this.selectedPurchaseOrder ={
        id:0,
        vendorid:0,
        amount:0.0,
        items:[],
        podate:'',
      }

    } //end constructor

  ngOnInit(): void {
    this.onPickVendor();
    this.onPickPurchaseOrder();

    (this.vendors$ = this.vendorService.get()),
    catchError((err) => (this.msg = err.message));

    (this.purchaseOrders$ = this.poService.get()),
    catchError((err) => (this.msg = err.message));

    this.msg = "server data loaded";

  }// end ngOnInit

  ngOnDestroy(): void {
    if (this.formSubscription !== undefined) {
      this.formSubscription.unsubscribe();
    }
  }//end ngOnDestroy

  onPickVendor(): void {
    this.formSubscription = this.poviewerForm.get('vendorid')
    ?.valueChanges.subscribe((val) => {

      this.selectedVendor = val;
      this.loadVendorProducts(this.selectedVendor.id);
      this.loadVendorPurchaseOrders(this.selectedVendor.id)
      this.msg = 'choose a purchase order for vendor';
      this.pickedVendor = true;
      this.showPdf = false;

  });
  }// onPickVendor

  onPickPurchaseOrder(): void {
    const purchaseOrderSubscription = this.poviewerForm.get('poid')?.valueChanges.subscribe((po) => {
      
      this.selectedPurchaseOrder = po; //get the selected purchase order
      this.total = 0;
      
      
      if (this.vendorProducts!.length > 0){
        this.pickedPurchaseOrder = true; 
      }
      
      //retrieve products from the purchase order
      if(this.vendorProducts !== undefined){

        this.purchaseOrderProducts = this.vendorProducts.filter((product) => 
          this.selectedPurchaseOrder?.items.some(
            (item) => item.productid === product.id
          )
        );

        if (this.purchaseOrderProducts !== undefined) {
          this.showPdf = true;
        }

        this.selectedPurchaseOrder?.items.forEach((exp) => (this.total += exp.price * exp.qty));
        this.sub = this.total;
        this.tax = this.total * 0.13;
        this.total = this.tax + this.sub;
        

      }

      this.msg = `Report ${this.selectedPurchaseOrder.id} selected`;
      this.generated = true;
      this.purchaseOrderNo = this.selectedPurchaseOrder.id;
  
    });
    this.formSubscription?.add(purchaseOrderSubscription);
  }


    /**
   * loadVendorProducts - obtain a particular vendor's products
   * we'll match the purchase orders to them later
   */
     loadVendorProducts(id: number): void {
      // products aren't part of the page, so we don't use async pipe here
      this.msg = 'loading products...';
    
      this.products$ = this.productService.getSome(id);
      this.products$.subscribe((products) => this.vendorProducts = products);

    }

      /**
   * loadVendorPurchaseOrders - obtain a particular vendor's purchase orders
   * we'll match the purchase orders products to them later
   */
    loadVendorPurchaseOrders(id: number): void {
      // products aren't part of the page, so we don't use async pipe here
      this.msg = 'loading purchase orders...';
      this.purchaseOrders$ =  this.poService.getSome(id);
      
    }

    viewPdf(): void {
      window.open(`${PDFURL}${this.purchaseOrderNo}`, '');
    } // viewPdf



}
 