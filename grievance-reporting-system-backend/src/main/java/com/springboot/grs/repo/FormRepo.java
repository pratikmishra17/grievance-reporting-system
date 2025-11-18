package com.springboot.grs.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.springboot.grs.entity.FormEntity;

@Repository
public interface FormRepo extends JpaRepository<FormEntity, Long> {
	List<FormEntity> findByUserId(Long userId);
    
}