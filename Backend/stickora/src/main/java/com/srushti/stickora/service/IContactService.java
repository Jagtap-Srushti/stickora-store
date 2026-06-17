package com.srushti.stickora.service;

import com.srushti.stickora.dto.ContactRequestDto;

public interface IContactService {

    boolean saveContact(ContactRequestDto contactRequestDto);
}
