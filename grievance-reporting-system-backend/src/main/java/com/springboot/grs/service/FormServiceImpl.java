package com.springboot.grs.service;

import java.util.List;
import jakarta.persistence.EntityNotFoundException; 
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import com.springboot.grs.entity.FormEntity;
import com.springboot.grs.repo.FormRepo;

@Service
public class FormServiceImpl implements FormService {

    private final FormRepo formRepo;
    private final FileStorageService fileStorageService;
    private final CommentService commentService; // Already injected

    @Autowired
    public FormServiceImpl(FormRepo formRepo, FileStorageService fileStorageService, CommentService commentService) {
        this.formRepo = formRepo;
        this.fileStorageService = fileStorageService;
        this.commentService = commentService;
    }

    @Override
    public FormEntity saveFormEntity(FormEntity formEntity, MultipartFile file) { 
        
        if (file != null && !file.isEmpty()) {
            String uniqueFilename = fileStorageService.store(file);
            formEntity.setFileName(uniqueFilename);
        }
        
        // Save form FIRST to get an ID
        FormEntity savedForm = formRepo.save(formEntity);
        
        // Auto-create the first comment
        commentService.createComment(
            savedForm.getId(), 
            "We have received your request and are looking into it.", 
            "Admin"
        );
        
        return savedForm;
    }
    
    @Override
    public List<FormEntity> getGrievancesByUserId(Long userId) {
        return formRepo.findByUserId(userId);
    }
    
    @Override
    public List<FormEntity> getAllFormEntitys() { 
        return formRepo.findAll();
    }
    
    @Override
    public FormEntity updateStatus(Long id, String newStatus) {
        
        FormEntity existingForm = formRepo.findById(id)
            .orElseThrow(() -> new EntityNotFoundException("Form not found with id: " + id));
            
        // --- THIS IS THE NEW LOGIC ---
        
        // 1. Get the old status before changing it
        String oldStatus = existingForm.getStatus();

        // 2. Check if the status is actually changing
        if (newStatus != null && !newStatus.equals(oldStatus)) {
            
            // 3. Set the new status on the form
            existingForm.setStatus(newStatus);
            
            // 4. Create the automated comment text
            String commentText = "Status changed from '" + oldStatus + "' to '" + newStatus + "'.";
            
            // 5. Save the new comment
            commentService.createComment(id, commentText, "Admin");
        }
        
        // 6. Save the form (with new status and new comment)
        return formRepo.save(existingForm);
    }
}