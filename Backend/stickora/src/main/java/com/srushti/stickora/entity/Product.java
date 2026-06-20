package com.srushti.stickora.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.Instant;

@Entity
@Table(name="products")
@AllArgsConstructor
@NoArgsConstructor
@Component
@Getter
@Setter
public class Product extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="product_id",nullable = false)
    private Long productId;

    @Column(name = "name",nullable = false)
    private String name;

    @Column(name = "description",nullable = false)
    private String description;

    @Column(name = "price",nullable = false)
    private BigDecimal price;

    @Column(name = "popularity",nullable = false)
    private Integer popularity;

    @Column(name = "image_url")
    private String imageUrl;


}
