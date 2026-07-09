package com.srushti.stickora.service;

import com.srushti.stickora.dto.ContactRequestDto;

import java.util.List;

public interface IContactService {

    boolean saveContact(ContactRequestDto contactRequestDto);

    List<ContactRequestDto> getAllOpenMessages();

    void updateMessageStatus(Long contactId,String status);
}
