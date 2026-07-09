package com.srushti.stickora.repository;

import com.srushti.stickora.entity.Contact;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ContactRepository extends JpaRepository<Contact,Long> {

    List<Contact> findByStatus(String status);
}
