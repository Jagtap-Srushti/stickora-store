package com.srushti.stickora.service;

import com.srushti.stickora.dto.ContactRequestDto;
import com.srushti.stickora.dto.ContactResponseDto;

import java.util.List;

public interface IContactService {

    boolean saveContact(ContactRequestDto contactRequestDto);

    List<ContactResponseDto> getAllOpenMessages();

    void updateMessageStatus(Long contactId, String status);
}
