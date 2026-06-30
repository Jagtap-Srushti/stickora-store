package com.srushti.stickora.repository;

import com.srushti.stickora.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CustomerRepository extends JpaRepository {

    Optional<Customer> findByEmail(String email);
    Optional<Customer> findByEmailOrMobileNumber(String email, String mobileNumber);
}
