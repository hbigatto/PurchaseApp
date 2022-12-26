package com.info5059.casestudy.po;

import java.io.ByteArrayInputStream;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import com.info5059.casestudy.product.Product;
import com.info5059.casestudy.product.ProductRepository;
import com.info5059.casestudy.vendor.Vendor;
import com.info5059.casestudy.vendor.VendorRepository;

import com.info5059.casestudy.product.QRCodeGenerator;


import com.itextpdf.io.font.constants.StandardFonts;
import com.itextpdf.kernel.font.PdfFontFactory;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.kernel.font.PdfFont;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.borders.Border;
import com.itextpdf.layout.element.Cell;
import com.itextpdf.layout.element.Image;
import com.itextpdf.layout.element.Paragraph;
import com.itextpdf.io.image.ImageDataFactory;
import com.itextpdf.kernel.colors.ColorConstants;
import com.itextpdf.layout.element.Table;

import com.itextpdf.layout.properties.TextAlignment;
import com.itextpdf.layout.properties.UnitValue;
import java.io.ByteArrayOutputStream;
import java.math.BigDecimal;
import java.math.MathContext;
import java.math.RoundingMode;
import java.net.URL;
import java.text.NumberFormat;
import java.time.format.DateTimeFormatter;
import java.util.Locale;
import java.util.Optional;
import java.util.logging.Level;
import java.util.logging.Logger;




@CrossOrigin
@RestController

public class PurchaseOrderPDFGenerator {

    public static ByteArrayInputStream generateReport(String poid,PurchaseOrderRepository purchaseOrderRepository,VendorRepository vendorRepository,
    ProductRepository productRepository)throws java.io.IOException 

    {
        URL imageUrl = PurchaseOrderPDFController.class.getResource("/static/assets/images/hugomarket.png");
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        PdfWriter writer = new PdfWriter(baos);
        // Initialize PDF document to be written to a stream not a file
        PdfDocument pdf = new PdfDocument(writer);
        // Document is the main object
        Document document = new Document(pdf);
        PdfFont font = PdfFontFactory.createFont(StandardFonts.HELVETICA);
        // add the image to the document
        Image img = new Image(ImageDataFactory.create(imageUrl)).scaleAbsolute(120, 100).setFixedPosition(80,710);
        document.add(img);
        // now let's add a big heading
        document.add(new Paragraph("\n\n"));
        Locale locale = new Locale("en", "US");
        NumberFormat formatter = NumberFormat.getCurrencyInstance(locale);

        
    

        try{
            Optional<PurchaseOrder> getPurchaseOrder = purchaseOrderRepository.findById(Long.parseLong(poid));
            PurchaseOrder purchaseOrder = getPurchaseOrder.get();
            document.add(new Paragraph(String.format("Purchase Order")).setFont(font).setFontSize(24)
                            .setMarginRight(75).setTextAlignment(TextAlignment.RIGHT).setBold());
            document.add(new Paragraph("#:" + poid).setFont(font).setFontSize(16).setBold()
                            .setMarginRight(90).setMarginTop(-10).setTextAlignment(TextAlignment.RIGHT));
            document.add(new Paragraph("\n\n"));
            // now a 4 column productTable
            Table vendorTable = new Table(2);
            vendorTable.setWidth(new UnitValue(UnitValue.PERCENT, 50));

            Optional<Vendor> opt = vendorRepository.findById(purchaseOrder.getVendorid());
            if (opt.isPresent()) {
                    Vendor vendor = opt.get();
                    Cell vendorCell = new Cell().add(new Paragraph("Vendor:")).setBorder(Border.NO_BORDER)
                                    .setTextAlignment(TextAlignment.RIGHT);
                    vendorTable.addCell(vendorCell);
                    vendorCell = new Cell().add(new Paragraph(vendor.getName())).setBorder(Border.NO_BORDER)
                                    .setTextAlignment(TextAlignment.LEFT)
                                    .setBackgroundColor(ColorConstants.LIGHT_GRAY);
                    vendorTable.addCell(vendorCell);
                    vendorTable.addCell(new Cell().setBorder(Border.NO_BORDER));
                    vendorCell = new Cell().add(new Paragraph(vendor.getAddress1()))
                                    .setBorder(Border.NO_BORDER).setTextAlignment(TextAlignment.LEFT)
                                    .setBackgroundColor(ColorConstants.LIGHT_GRAY);
                    vendorTable.addCell(vendorCell);
                    vendorTable.addCell(new Cell().setBorder(Border.NO_BORDER));
                    vendorCell = new Cell().add(new Paragraph(vendor.getCity())).setBorder(Border.NO_BORDER)
                                    .setTextAlignment(TextAlignment.LEFT)
                                    .setBackgroundColor(ColorConstants.LIGHT_GRAY);
                    vendorTable.addCell(vendorCell);
                    vendorTable.addCell(new Cell().setBorder(Border.NO_BORDER));
                    vendorCell = new Cell().add(new Paragraph(vendor.getProvince()))
                                    .setBorder(Border.NO_BORDER).setTextAlignment(TextAlignment.LEFT)
                                    .setBackgroundColor(ColorConstants.LIGHT_GRAY);
                    vendorTable.addCell(vendorCell);
                    vendorTable.addCell(new Cell().setBorder(Border.NO_BORDER));
                    vendorCell = new Cell().add(new Paragraph(vendor.getEmail()))
                                    .setBorder(Border.NO_BORDER).setTextAlignment(TextAlignment.LEFT)
                                    .setBackgroundColor(ColorConstants.LIGHT_GRAY);
                    vendorTable.addCell(vendorCell);
                    document.add(vendorTable);
                    document.add(new Paragraph("\n\n"));


                    
                    Image qrcode = null ;
                    byte[] qrcodebin = addSummaryQRCode(vendor,purchaseOrder);
                    qrcode = new Image(ImageDataFactory.create(qrcodebin)).scaleAbsolute(100, 100).setFixedPosition(460,60);
                    document.add(qrcode);

            }

           


            // now a 4 column productTable
            Table productTable = new Table(5);
            productTable.setWidth(new UnitValue(UnitValue.PERCENT, 100));
            // Unfortunately we must format each cell individually :(
            // productTable headings
            Cell cell = new Cell()
                            .add(new Paragraph("Product Code").setFont(font).setFontSize(12).setBold())
                            .setTextAlignment(TextAlignment.CENTER);
            productTable.addCell(cell);
            cell = new Cell().add(new Paragraph("Description").setFont(font).setFontSize(12).setBold())
                            .setTextAlignment(TextAlignment.CENTER);
            productTable.addCell(cell);
            cell = new Cell().add(new Paragraph("Qty Sold").setFont(font).setFontSize(12).setBold())
                            .setTextAlignment(TextAlignment.CENTER);
            productTable.addCell(cell);
            cell = new Cell().add(new Paragraph("Price").setFont(font).setFontSize(12).setBold())
                            .setTextAlignment(TextAlignment.CENTER);
            productTable.addCell(cell);
            cell = new Cell().add(new Paragraph("Ext. Price").setFont(font).setFontSize(12).setBold())
                            .setTextAlignment(TextAlignment.CENTER);
            productTable.addCell(cell);
            // productTable details
            BigDecimal tot = new BigDecimal(0.0);
            // dump out the line items
            for (PurchaseOrderLineitem line : purchaseOrder.getItems()) {         

                    Optional<Product> optx = productRepository.findById(line.getProductid());
                    if (optx.isPresent()) {
                            Product product = optx.get();

                            cell = new Cell().add(new Paragraph(product.getId()).setFont(font)
                                            .setFontSize(12).setTextAlignment(TextAlignment.CENTER));
                            productTable.addCell(cell);
                            cell = new Cell().add(new Paragraph(product.getName()).setFont(font)
                                            .setFontSize(12).setTextAlignment(TextAlignment.CENTER));
                            productTable.addCell(cell);
                            cell = new Cell().add(new Paragraph(Integer.toString(line.getQty()))
                                            .setFont(font).setFontSize(12)
                                            .setTextAlignment(TextAlignment.CENTER));
                            productTable.addCell(cell);

                        
                            cell = new Cell().add(new Paragraph(formatter.format(line.getPrice()))
                                            .setFont(font).setFontSize(12)
                                            .setTextAlignment(TextAlignment.LEFT));
                            productTable.addCell(cell);
                            cell = new Cell().add(new Paragraph(formatter.format(line.getPrice().multiply(BigDecimal.valueOf(line.getQty()))))
                                                            .setFont(font).setFontSize(12)
                                                            .setTextAlignment(TextAlignment.RIGHT));
                                               
                            productTable.addCell(cell);
                            tot = tot.add(line.getPrice().multiply(BigDecimal.valueOf(line.getQty()),
                                            new MathContext(8, RoundingMode.UP)));
                    }
            }
            // purchaseOrder total
            cell = new Cell(1, 4).add(new Paragraph("Sub Total:")).setBorder(Border.NO_BORDER)
                            .setTextAlignment(TextAlignment.RIGHT);
            productTable.addCell(cell);
            cell = new Cell().add(new Paragraph(formatter.format(tot)))
                            .setTextAlignment(TextAlignment.RIGHT);
                     
            productTable.addCell(cell);

            // purchaseOrder total
            cell = new Cell(1, 4).add(new Paragraph("Tax:")).setBorder(Border.NO_BORDER)
                            .setTextAlignment(TextAlignment.RIGHT);
            productTable.addCell(cell);
            cell = new Cell().add(new Paragraph(formatter.format(tot.multiply(BigDecimal.valueOf(0.13)))))
                            .setTextAlignment(TextAlignment.RIGHT);
            productTable.addCell(cell);

            // purchaseOrder total
            cell = new Cell(1, 4).add(new Paragraph("PO Total:")).setBorder(Border.NO_BORDER)
                            .setTextAlignment(TextAlignment.RIGHT);
            productTable.addCell(cell);
            cell = new Cell().add(new Paragraph(formatter.format(tot.multiply(BigDecimal.valueOf(1.13)))))
                            .setTextAlignment(TextAlignment.RIGHT)
                            .setBackgroundColor(ColorConstants.YELLOW);
            productTable.addCell(cell);
            document.add(productTable);
            document.add(new Paragraph("\n\n"));
            DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss a");
            document.add(new Paragraph(dateFormatter.format(purchaseOrder.getPodate())).setTextAlignment(TextAlignment.CENTER));


            document.close();
        }
        catch(Exception ex){
            Logger.getLogger(PurchaseOrderPDFGenerator.class.getName()).log(Level.SEVERE, null, ex);
        }
        return new ByteArrayInputStream(baos.toByteArray());


    }

    //create a new method
    private static byte[] addSummaryQRCode(Vendor vendor, PurchaseOrder po) {

        DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss a");

        Locale locale = new Locale("en", "US");
        NumberFormat formatter = NumberFormat.getCurrencyInstance(locale);

        QRCodeGenerator qrGen = new QRCodeGenerator();

        return qrGen.generateQRCode("Summary for Purchase Order:" + po.getId() + "\nDate:"
        + dateFormatter.format(po.getPodate()) + "\nVendor:"
        + vendor.getName()
        + "\nTotal:" + formatter.format(po.getAmount()));

        
    }

    
}
