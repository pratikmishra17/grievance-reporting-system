package com.springboot.grs.repo;

import com.springboot.grs.entity.GrsEntity;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GrsRepo extends JpaRepository<GrsEntity, Long> {
	GrsEntity findByUserEmailIgnoreCase(String emailId);

    Boolean existsByUserEmail(String email);
    Optional<GrsEntity> findByUserEmail(String email);
}