package com.springboot.grs.service;

import com.springboot.grs.entity.CommentEntity;
import java.util.List;

public interface CommentService {
    
    CommentEntity createComment(Long formId, String text, String authorRole);

    List<CommentEntity> getCommentsByFormId(Long formId);
}