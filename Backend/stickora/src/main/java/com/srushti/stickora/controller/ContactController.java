package com.srushti.stickora.controller;


import com.srushti.stickora.dto.ContactRequestDto;
import com.srushti.stickora.dto.ProductDto;
import com.srushti.stickora.service.IContactService;
import com.srushti.stickora.service.IProductService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/contacts")
@RequiredArgsConstructor
public class ContactController {

    private final IContactService iContactService;
    @PostMapping
    public ResponseEntity<String> saveContact( @Valid @RequestBody ContactRequestDto contactRequestDto){
        iContactService.saveContact(contactRequestDto);
            return ResponseEntity.status(HttpStatus.CREATED).body("Request Processed Successfully");
    }
}
