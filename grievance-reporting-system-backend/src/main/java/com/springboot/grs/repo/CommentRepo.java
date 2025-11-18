package com.springboot.grs.repo;

import com.springboot.grs.entity.CommentEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepo extends JpaRepository<CommentEntity, Long> {
    
    List<CommentEntity> findByFormIdOrderByTimestampAsc(Long formId);
}