package com.springboot.grs.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.grs.entity.GrsEntity;
import com.springboot.grs.service.GrsService;
@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class GrsController {
	 @Autowired
	    private GrsService userService;

	    @PostMapping("/register")
	    public ResponseEntity<?> registerUser(@RequestBody GrsEntity user) {
	        return userService.saveUser(user);
	    }

	    @RequestMapping(value="/confirm-account", method= {RequestMethod.GET, RequestMethod.POST})
	    public ResponseEntity<?> confirmUserAccount(@RequestParam("token")String confirmationToken) {
	        return userService.confirmEmail(confirmationToken);
	    }
	    
	    @PostMapping("/login")
	    public ResponseEntity<?> loginUser(@RequestBody Map<String, String> credentials) {
	        String email = credentials.get("userEmail");
	        String password = credentials.get("userPassword");
	        return userService.loginUser(email, password);
	    }
}
