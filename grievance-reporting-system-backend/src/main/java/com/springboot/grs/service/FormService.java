package com.springboot.grs.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.springboot.grs.entity.FormEntity;

public interface FormService {


    FormEntity saveFormEntity(FormEntity formEntity, MultipartFile file); 

    List<FormEntity> getAllFormEntitys(); 
    
    FormEntity updateStatus(Long id, String newStatus); 
    List<FormEntity> getGrievancesByUserId(Long userId);
}