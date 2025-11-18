package com.springboot.grs.service;


import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.springboot.grs.entity.ConfirmationToken;
import com.springboot.grs.entity.GrsEntity;
import com.springboot.grs.repo.ConfirmationTokenRepository;
import com.springboot.grs.repo.GrsRepo;


@Service
public class GrsServiceImpl implements GrsService {

    @Autowired
    private GrsRepo userRepository;

    @Autowired
    ConfirmationTokenRepository confirmationTokenRepository;

    @Autowired
    GrsEmailService emailService;
    
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public ResponseEntity<?> saveUser(GrsEntity user) {

        if (userRepository.existsByUserEmail(user.getUserEmail())) {
            return ResponseEntity.badRequest().body("Error: Email is already in use!");
        }

        user.setUserPassword(passwordEncoder.encode(user.getUserPassword()));
        user.setRole("USER");
        
        GrsEntity savedUser = userRepository.save(user);
        ConfirmationToken confirmationToken = new ConfirmationToken(savedUser);
        confirmationTokenRepository.save(confirmationToken);

        String confirmationUrl = "http://localhost:8085/confirm-account?token=" + confirmationToken.getConfirmationToken();
        
        String htmlBody = "<h2>Welcome to Grievance Reporting System!</h2>"
                        + "<p>To confirm your account, please click the link below:</p>"
                       
                        + "<p><a href=\"" + confirmationUrl + "\">Confirm Your Account</a></p>"
                        + "<br>"
                        + "<p>If you did not request this, please ignore this email.</p>"
        				+ "<p>This is an auto generated email, please do not reply.</p>";

        
       
            
            emailService.sendHtmlEmail(savedUser.getUserEmail(), "Complete Registration!", htmlBody);
       

        System.out.println("Confirmation Token: " + confirmationToken.getConfirmationToken());
       
        return ResponseEntity.ok("Verify email by the link sent on your email address");
    }

    @Override
    public ResponseEntity<?> confirmEmail(String confirmationToken) {
        ConfirmationToken token = confirmationTokenRepository.findByConfirmationToken(confirmationToken);

        if(token != null)
        {
            GrsEntity user = userRepository.findByUserEmailIgnoreCase(token.getUserEntity().getUserEmail());
            user.setEnabled(true);
            userRepository.save(user);
            return ResponseEntity.ok("Email verified successfully!");
        }
        return ResponseEntity.badRequest().body("Error: Couldn't verify email");
    }
    
    @Override
    public ResponseEntity<?> loginUser(String email, String password) {
        Optional<GrsEntity> userOptional = userRepository.findByUserEmail(email); 

        if (userOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password.");
        }

        GrsEntity user = userOptional.get();

        if (!user.isEnabled()) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Account not verified. Please check your email.");
        }

        // --- THIS IS THE FIX ---
        // Use passwordEncoder.matches() instead of .equals()
        if (passwordEncoder.matches(password, user.getUserPassword())) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password.");
        }
    }
    
}

