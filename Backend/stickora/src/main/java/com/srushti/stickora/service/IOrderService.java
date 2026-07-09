package com.srushti.stickora.service;

import com.srushti.stickora.dto.OrderRequestDto;
import com.srushti.stickora.dto.OrderResponseDto;
import com.srushti.stickora.entity.Order;

import java.util.List;

public interface IOrderService {

    void createOrder(OrderRequestDto orderRequest);

    List<OrderResponseDto> getCustomerOrders();

    List<OrderResponseDto> getAllPendingOrders();

    Order updateOrderStatus(Long orderId, String orderStatus);
}
