package com.info5059.casestudy.po;

import java.time.LocalDateTime;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.info5059.casestudy.product.Product;
import com.info5059.casestudy.product.ProductRepository;

@Component
public class PurchaseOrderDAO {

@PersistenceContext
private EntityManager entityManager;

@Autowired
private ProductRepository prodRep;
    
@Transactional
public PurchaseOrder create (PurchaseOrder clientrep){

   PurchaseOrder realPurchaseOrder = new PurchaseOrder();

   realPurchaseOrder.setPodate(LocalDateTime.now());
   realPurchaseOrder.setVendorid(clientrep.getVendorid());
   realPurchaseOrder.setAmount(clientrep.getAmount());
   entityManager.persist(realPurchaseOrder);

   for(PurchaseOrderLineitem item : clientrep.getItems()){

    PurchaseOrderLineitem realItem = new PurchaseOrderLineitem();

    realItem.setPoid(realPurchaseOrder.getId());
    realItem.setProductid(item.getProductid());
    realItem.setPrice(item.getPrice());
    realItem.setQty(item.getQty());
    realItem.setProductName(item.getProductName());

    entityManager.persist(realItem);

    Product prod = prodRep.getReferenceById(item.getProductid());
    prod.setQoo(prod.getQoo() + item.getQty());
    prodRep.saveAndFlush(prod);
      
    };

    entityManager.refresh(realPurchaseOrder);
    return realPurchaseOrder;
 
   }

  
}

