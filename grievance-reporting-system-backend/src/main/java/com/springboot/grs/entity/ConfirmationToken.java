package com.springboot.grs.entity;

// Use java.util.Date, not java.sql.Date
import java.util.Date; 
import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;     // <-- 1. Add this annotation
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;  // <-- 2. Add this import
import jakarta.persistence.ManyToOne;    // <-- 3. Add this import
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

@Entity // <-- 4. Your class must be an @Entity
public class ConfirmationToken {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="token_id")
    private Long tokenId;

    @Column(name="confirmation_token")
    private String confirmationToken;

    @Temporal(TemporalType.TIMESTAMP)
    private Date createdDate; // <-- Use java.util.Date for TIMESTAMP

    // 5. THIS IS THE FIELD YOU ARE MISSING
    // It links this token to a user
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", nullable = false)
    private GrsEntity userEntity; // <-- Change 'GrsEntity' if your user class name is different

    // 6. Add a no-argument constructor (required by JPA)
    public ConfirmationToken() {
        this.createdDate = new Date();
        this.confirmationToken = UUID.randomUUID().toString();
    }
    
    // 7. Add the constructor that your service needs
    public ConfirmationToken(GrsEntity userEntity) {
        this.userEntity = userEntity;
        this.createdDate = new Date();
        this.confirmationToken = UUID.randomUUID().toString();
    }
    
    // --- Your existing getters/setters ---
    
    public Long getTokenId() {
        return tokenId;
    }

    public void setTokenId(Long tokenId) {
        this.tokenId = tokenId;
    }

    public String getConfirmationToken() {
        return confirmationToken;
    }

    public void setConfirmationToken(String confirmationToken) {
        this.confirmationToken = confirmationToken;
    }

    public Date getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(Date createdDate) {
        this.createdDate = createdDate;
    }

    // 8. Add the getter and setter for the new field
    // This will fix your "getUserEntity()" error
    public GrsEntity getUserEntity() {
        return userEntity;
    }

    public void setUserEntity(GrsEntity userEntity) {
        this.userEntity = userEntity;
    }
}