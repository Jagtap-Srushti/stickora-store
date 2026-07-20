package com.srushti.stickora.service.impl;

import com.srushti.stickora.dto.ProductDto;
import com.srushti.stickora.entity.Product;
import com.srushti.stickora.repository.ProductRepository;
import com.srushti.stickora.service.IProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements IProductService {

    private final ProductRepository productRepository;

    @Cacheable(cacheNames = "products")
    @Override
    public List<ProductDto> getProductService() {
        return productRepository.findAll()
                .stream().map(this::transformToDto).collect(Collectors.toList());
    }

    private ProductDto transformToDto(Product product) {
        ProductDto productDto = new ProductDto();
        BeanUtils.copyProperties(product, productDto);
        return productDto;
    }
}
