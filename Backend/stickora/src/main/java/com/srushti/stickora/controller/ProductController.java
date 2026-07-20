package com.srushti.stickora.controller;


import com.srushti.stickora.dto.ProductDto;
import com.srushti.stickora.service.IProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/v1/products")
@RequiredArgsConstructor

@CrossOrigin(origins = "${frontend.url}")
public class ProductController {

    @Value("${frontend.url}")
    private String frontendUrl;

    private final IProductService iProductService;
    @GetMapping
    public ResponseEntity<List<ProductDto>> getProducts(){
        List<ProductDto> productList=iProductService.getProductService();
        return ResponseEntity.status(HttpStatus.OK).body(productList);
    }
}
