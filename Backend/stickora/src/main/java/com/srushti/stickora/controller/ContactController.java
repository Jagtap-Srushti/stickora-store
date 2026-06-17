package com.srushti.stickora.controller;


import com.srushti.stickora.dto.ContactRequestDto;
import com.srushti.stickora.dto.ProductDto;
import com.srushti.stickora.service.IContactService;
import com.srushti.stickora.service.IProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/contacts")
@RequiredArgsConstructor
public class ContactController {

    private final IContactService iContactService;
    @PostMapping
    public String saveContact(@RequestBody ContactRequestDto contactRequestDto){
        boolean isSaved=iContactService.saveContact(contactRequestDto);
        if(isSaved){
            return "Request Processed Successfully";
        }
        else{
            return "An error occurred. Please try again or contact dev team.";
        }
    }
}
