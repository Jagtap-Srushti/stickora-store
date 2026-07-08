package com.srushti.stickora.service;

import com.srushti.stickora.dto.PaymentIntentRequestDto;
import com.srushti.stickora.dto.PaymentIntentResponseDto;

public interface IPaymentService {

    PaymentIntentResponseDto createPaymentIntent(PaymentIntentRequestDto requestDto);
}
