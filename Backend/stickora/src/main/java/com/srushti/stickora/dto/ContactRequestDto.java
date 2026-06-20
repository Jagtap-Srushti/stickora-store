package com.srushti.stickora.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ContactRequestDto {

    @NotBlank(message = "Name can not be empty")
    @Size(min = 5, max = 30,message = "Name must be between 5 to 30 characters")
    private String name;

    @NotBlank(message = "Email can not be empty")
    @Email(message = "Invalid email address")
    private String email;

    @NotBlank(message = "Mobile No. can not be empty")
    @Pattern(regexp = "^\\d{10}$",message = "Invalid mobile number")
    private String mobileNumber;

    @NotBlank(message = "Message field can not be empty")
    @Size(min = 5,max = 500,message ="Message must be between 5 to 500" )
    private String message;
}
