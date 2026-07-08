package com.srushti.stickora.controller;

import com.srushti.stickora.dto.OrderRequestDto;
import com.srushti.stickora.service.IOrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/orders")
@RequiredArgsConstructor
public class OrderController {

    private final IOrderService iOrderService;

    @PostMapping
    public ResponseEntity<String> createOrder(@RequestBody OrderRequestDto requestDto) {
        iOrderService.createOrder(requestDto);
        return ResponseEntity.ok("Order created successfully!");
    }

    @GetMapping
    public ResponseEntity<List<OrderResponseDto>> loadCustomerOrders() {
        return ResponseEntity.ok(iOrderService.getCustomerOrders());
    }
}