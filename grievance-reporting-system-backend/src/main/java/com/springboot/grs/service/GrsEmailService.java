package com.springboot.grs.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

// Import a logger (SLF4J is standard with Spring)
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.UnsupportedEncodingException; // Import this exception

@Service("emailService")
public class GrsEmailService {

    // Add a logger for exception handling
    private static final Logger LOGGER = LoggerFactory.getLogger(GrsEmailService.class);

    private JavaMailSender javaMailSender;

    @Value("${spring.mail.username}")
    private String fromEmail;

    @Autowired
    public GrsEmailService(JavaMailSender javaMailSender) {
        this.javaMailSender = javaMailSender;
    }

    @Async
    // Remove "throws MessagingException" from the signature
    public void sendHtmlEmail(String to, String subject, String htmlBody) { 
        
        try {
            MimeMessage mimeMessage = javaMailSender.createMimeMessage();
            
            // Fix 1: Set multipart to 'true' for HTML emails
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "utf-8"); 
            
            // Fix 2: This code must be inside a try...catch that
            // handles UnsupportedEncodingException
            helper.setFrom(fromEmail, "Grievance Reporting System");
            
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(htmlBody, true); // true = this is HTML
          
            javaMailSender.send(mimeMessage);
            LOGGER.info("HTML email sent successfully to {}", to);

        } catch (MessagingException | UnsupportedEncodingException e) {
            // Fix 3: Catch both exceptions and log the error
            // This is crucial for @Async methods
            LOGGER.error("Failed to send email to " + to, e);
        }
    }
}