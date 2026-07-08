package com.srushti.stickora.service;

import com.srushti.stickora.dto.OrderRequestDto;

public interface IOrderService {
    void createOrder(OrderRequestDto orderRequest);
}
