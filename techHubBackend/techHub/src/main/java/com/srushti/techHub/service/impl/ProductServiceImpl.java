package com.srushti.techHub.service.impl;

import com.srushti.techHub.entity.Product;
import com.srushti.techHub.repository.ProductRepository;
import com.srushti.techHub.service.IProductService;
import com.srushti.techHub.dto.ProductDto;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements IProductService {

    private final ProductRepository productRepository;

    @Override
    public List<ProductDto> getProductService() {
        return productRepository.findAll()
                .stream().map(this::transformToDto).collect(Collectors.toList());
    }

    private ProductDto transformToDto(Product product){
        ProductDto productDto=new ProductDto();
        BeanUtils.copyProperties(product,productDto);
        return productDto;
    }
}
