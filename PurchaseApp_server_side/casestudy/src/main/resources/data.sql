-- Vendord data
INSERT INTO Vendor (Address1,City,Province,PostalCode,Phone,Type,Name,Email)VALUES ('123 Maple St','London','On', 'N1N-1N1','(555)555-5555','Trusted','ABC Supply Co.','abc@supply.com');
INSERT INTO Vendor (Address1,City,Province,PostalCode,Phone,Type,Name,Email) VALUES ('543 Sycamore Ave','Toronto','On', 'N1P-1N1','(999)555-5555','Trusted','Big Bills Depot','bb@depot.com');
INSERT INTO Vendor (Address1,City,Province,PostalCode,Phone,Type,Name,Email) VALUES ('922 Oak St','London','On', 'N1N-1N1','(555)555-5599','Untrusted','Shady Sams','ss@underthetable.com');
INSERT INTO Vendor (Address1,City,Province,PostalCode,Phone,Type,Name,Email) VALUES ('007 Redwood St','London','On', 'N6Y-2N2','(555)555-2222','Trusted','Hugo Market','hm@market.com');



-- Product Data

--private String id;
--private int vendorid;
--private String name;
--private BigDecimal costprice;
--private BigDecimal msrp;
--private int rop; Reorder point
--private int eoq; Economic Order Quantity
--private int qoh; Quantity on hand
--private int qoo; Quantity on order

INSERT INTO Product (id,vendorid, name, costprice, msrp,rop,eoq,qoh,qoo,qrcode) VALUES('01X51',1, 'Screwdriver',5.99, 9.99,2,10,35,0,null);
INSERT INTO Product (id,vendorid, name, costprice, msrp,rop,eoq,qoh,qoo,qrcode) VALUES('01X52',1, 'Hammer',10.99, 15.99,2,10,35,0,null);
INSERT INTO Product (id,vendorid, name, costprice, msrp,rop,eoq,qoh,qoo,qrcode) VALUES('01X53',1, 'Drill',100.99, 155.99,2,10,35,0,null);


INSERT INTO Product (id,vendorid, name, costprice, msrp,rop,eoq,qoh,qoo,qrcode) VALUES('02X61',2, 'Fridge',1000.99, 2000.99,2,10,35,0,null);
INSERT INTO Product (id,vendorid, name, costprice, msrp,rop,eoq,qoh,qoo,qrcode) VALUES('02X62',2, 'Dishwasher',750.90, 1200.99,2,10,35,0,null);
INSERT INTO Product (id,vendorid, name, costprice, msrp,rop,eoq,qoh,qoo,qrcode) VALUES('02X63',2, 'Stove',800.99, 1300.99,2,10,35,0,null);


INSERT INTO Product (id,vendorid, name, costprice, msrp,rop,eoq,qoh,qoo,qrcode) VALUES('03X71',3, 'Wrench',8.99, 18.99,2,10,35,0,null);
INSERT INTO Product (id,vendorid, name, costprice, msrp,rop,eoq,qoh,qoo,qrcode) VALUES('03X72',3, 'Silicone',10.99, 17.99,2,10,35,0,null);
INSERT INTO Product (id,vendorid, name, costprice, msrp,rop,eoq,qoh,qoo,qrcode) VALUES('03X73',3, 'Teflon tape',0.99, 1.99,2,10,35,0,null);


INSERT INTO Product (id,vendorid, name, costprice, msrp,rop,eoq,qoh,qoo,qrcode) VALUES('04X81',4, 'Shovel',20.99, 42.99,2,10,35,0,null);
INSERT INTO Product (id,vendorid, name, costprice, msrp,rop,eoq,qoh,qoo,qrcode) VALUES('04X82',4, 'Rake',9.99, 15.99,2,10,35,0,null);
INSERT INTO Product (id,vendorid, name, costprice, msrp,rop,eoq,qoh,qoo,qrcode) VALUES('04X83',4, 'Axe',25.99, 50.99,2,10,35,0,null);

