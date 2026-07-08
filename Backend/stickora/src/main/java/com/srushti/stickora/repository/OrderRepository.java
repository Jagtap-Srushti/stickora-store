package com.srushti.stickora.repository;

import com.srushti.stickora.entity.Contact;
import com.srushti.stickora.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Long> {
}
