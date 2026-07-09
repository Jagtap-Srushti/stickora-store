package com.srushti.stickora.repository;

import com.srushti.stickora.entity.Contact;
import com.srushti.stickora.entity.Customer;
import com.srushti.stickora.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByCustomerOrderByCreatedAtDesc(Customer customer);

    List<Order> findByOrderStatus(String orderStatus);
}
