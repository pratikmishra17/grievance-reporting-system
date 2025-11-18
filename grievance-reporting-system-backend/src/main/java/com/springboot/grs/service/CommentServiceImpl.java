package com.springboot.grs.service;

import com.springboot.grs.entity.CommentEntity;
import com.springboot.grs.entity.FormEntity;
import com.springboot.grs.repo.CommentRepo;
import com.springboot.grs.repo.FormRepo;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentServiceImpl implements CommentService {

    @Autowired
    private CommentRepo commentRepo;

    @Autowired
    private FormRepo formRepo;

    @Override
    public CommentEntity createComment(Long formId, String text, String authorRole) {
        FormEntity form = formRepo.findById(formId)
                .orElseThrow(() -> new EntityNotFoundException("Form not found with id: " + formId));
        
        CommentEntity comment = new CommentEntity(text, authorRole, form);
        
        return commentRepo.save(comment);
    }

    @Override
    public List<CommentEntity> getCommentsByFormId(Long formId) {
        return commentRepo.findByFormIdOrderByTimestampAsc(formId);
    }
}