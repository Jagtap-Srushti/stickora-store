package com.srushti.stickora.util;

import com.srushti.stickora.constants.ApplicationConstants;
import com.srushti.stickora.entity.Customer;
import lombok.RequiredArgsConstructor;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.core.env.Environment;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;

@Component
@RequiredArgsConstructor
public class JwtUtil {

    private final Environment env;

    public String generateJwtToken(Authentication authentication){
        String jwt = "";
        String secret = env.getProperty(ApplicationConstants.JWT_SECRET_KEY,
                ApplicationConstants.JWT_SECRET_DEFAULT_VALUE);

        SecretKey secretKey = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
        Customer fetchedUser = (Customer) authentication.getPrincipal();

        jwt = Jwts.builder()
                .issuer("Stickora")
                .subject("JWT Token")
                .claim("email", fetchedUser.getEmail())
                .issuedAt(new java.util.Date())
                .expiration(new java.util.Date(System.currentTimeMillis() + 60 * 60 * 1000))
                .signWith(secretKey)
                .compact();

        return jwt;
    }
}
