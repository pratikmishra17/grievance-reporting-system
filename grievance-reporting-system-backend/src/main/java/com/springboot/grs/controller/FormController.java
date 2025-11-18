package com.springboot.grs.controller;

import com.springboot.grs.entity.CommentEntity;
import com.springboot.grs.entity.FormEntity;
import com.springboot.grs.service.CommentService;
import com.springboot.grs.service.FormService; 
import com.springboot.grs.service.FileStorageService; 

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.core.io.Resource;

import java.io.IOException;
import java.nio.file.Files;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/forms") 
@CrossOrigin(origins = "http://localhost:3000")
public class FormController {

    @Autowired
    private FormService formService; 

    @Autowired
    private FileStorageService fileStorageService;

    // --- 1. Inject CommentService ---
    @Autowired
    private CommentService commentService;

    @PostMapping("/submit")
    public ResponseEntity<?> submitGrievance(
            @RequestPart("grievance") FormEntity grievance, 
            @RequestPart(value = "file", required = false) MultipartFile file) {
                
        FormEntity savedGrievance = formService.saveFormEntity(grievance, file);
        return ResponseEntity.ok(savedGrievance);
    }

    @GetMapping("/all")
    public ResponseEntity<List<FormEntity>> getAllGrievances() {
        List<FormEntity> grievances = formService.getAllFormEntitys();
        return ResponseEntity.ok(grievances);
    }
    
    @PostMapping("/{id}/status")
    public ResponseEntity<FormEntity> updateFormEntityStatus(
            @PathVariable Long id,
            @RequestBody Map<String, String> payload) {
        
        String newStatus = payload.get("status");
        if (newStatus == null || newStatus.trim().isEmpty()) {
            return ResponseEntity.badRequest().build(); 
        }
        
        FormEntity updatedFormEntity = formService.updateStatus(id, newStatus);
        return ResponseEntity.ok(updatedFormEntity);
    }
    
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<FormEntity>> getGrievancesByUser(@PathVariable Long userId) {
        List<FormEntity> grievances = formService.getGrievancesByUserId(userId);
        return ResponseEntity.ok(grievances);
    }
    
    @GetMapping("/files/{filename:.+}")
    public ResponseEntity<Resource> serveFile(@PathVariable String filename) {
        Resource file = fileStorageService.loadAsResource(filename);
        String contentType = "application/octet-stream";
        try {
            contentType = Files.probeContentType(file.getFile().toPath());
        } catch (IOException e) {
           
        }
        
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_TYPE, contentType)
                .body(file);
    }

    // --- 2. ADD NEW ENDPOINTS FOR COMMENTS ---

    @GetMapping("/{formId}/comments")
    public ResponseEntity<List<CommentEntity>> getComments(@PathVariable Long formId) {
        List<CommentEntity> comments = commentService.getCommentsByFormId(formId);
        return ResponseEntity.ok(comments);
    }

    @PostMapping("/{formId}/comments")
    public ResponseEntity<CommentEntity> addComment(
            @PathVariable Long formId, 
            @RequestBody Map<String, String> payload) {
        
        String text = payload.get("text");
        String authorRole = payload.get("authorRole"); // "User" or "Admin"

        if (text == null || text.trim().isEmpty() || authorRole == null || authorRole.trim().isEmpty()) {
            return ResponseEntity.badRequest().build();
        }

        CommentEntity newComment = commentService.createComment(formId, text, authorRole);
        return ResponseEntity.ok(newComment);
    }
}