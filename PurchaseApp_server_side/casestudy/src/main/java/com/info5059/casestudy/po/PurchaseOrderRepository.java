package com.info5059.casestudy.po;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin
@Repository
@RepositoryRestResource(collectionResourceRel = "pos", path = "pos")

public interface PurchaseOrderRepository extends CrudRepository <PurchaseOrder, Long> {
    @Modifying
    @Transactional
    @Query("delete from PurchaseOrder where id = ?1")
    int deleteOne(Long poid);

    

    List<PurchaseOrder> findByVendorid(Long vendorid);
}

