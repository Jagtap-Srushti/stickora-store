package com.srushti.stickora.dto;

public record LoginResponseDto(String message,UserDto user,String jwtToken) {
}
