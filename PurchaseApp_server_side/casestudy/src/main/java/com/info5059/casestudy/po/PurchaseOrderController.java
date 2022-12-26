package com.info5059.casestudy.po;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


@CrossOrigin
@RestController

public class PurchaseOrderController {
    @Autowired
    private PurchaseOrderDAO poDAO;

    @Autowired
    private PurchaseOrderRepository poRepository;

    @PostMapping("/api/pos")
    public ResponseEntity<PurchaseOrder> addOne(@RequestBody PurchaseOrder clientrep){
        return new ResponseEntity<PurchaseOrder>(poDAO.create(clientrep), HttpStatus.OK);
    }

    @GetMapping("/api/pos")
    public ResponseEntity<Iterable<PurchaseOrder>> findAll() {
    Iterable<PurchaseOrder> pos = poRepository.findAll();
    return new ResponseEntity<Iterable<PurchaseOrder>>(pos, HttpStatus.OK);
    }

    @GetMapping("/api/pos/{id}")
    public ResponseEntity<Iterable<PurchaseOrder>> findByVendorid(@PathVariable Long id) {
    return new ResponseEntity<Iterable<PurchaseOrder>>(poRepository.findByVendorid(id),HttpStatus.OK);
    }

}
