package com.info5059.casestudy.po;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@Data
@RequiredArgsConstructor

public class PurchaseOrder {
// PurchaseOrder private members
@Id
@GeneratedValue
private Long id;
private Long vendorid;
private BigDecimal amount;

@JsonFormat(pattern="yyyy-MM-dd@HH:mm:ss")
private LocalDateTime podate;

@OneToMany(mappedBy = "poid", cascade = CascadeType.ALL, orphanRemoval = true)
private List<PurchaseOrderLineitem> items = new ArrayList<PurchaseOrderLineitem>();
}
