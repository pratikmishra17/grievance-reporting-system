package com.springboot.grs.service;


import org.springframework.http.ResponseEntity;

import com.springboot.grs.entity.GrsEntity;

public interface GrsService {
	ResponseEntity<?> saveUser(GrsEntity user);

    ResponseEntity<?> confirmEmail(String confirmationToken);
    ResponseEntity<?> loginUser(String email, String password);
}
