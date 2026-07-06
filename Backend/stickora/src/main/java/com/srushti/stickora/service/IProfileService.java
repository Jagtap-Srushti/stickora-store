package com.srushti.stickora.service;


import com.srushti.stickora.dto.ProfileRequestDto;
import com.srushti.stickora.dto.ProfileResponseDto;

public interface IProfileService {
    ProfileResponseDto getProfile();

    ProfileResponseDto updateProfile(ProfileRequestDto profileRequestDto);
}
