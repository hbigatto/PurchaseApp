package com.info5059.casestudy.po;

import java.math.BigDecimal;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@Entity
@RequiredArgsConstructor

public class PurchaseOrderLineitem {

@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long id;
private Long poid;
private String productid;
private int qty;
private BigDecimal price;
private String productName;
}
