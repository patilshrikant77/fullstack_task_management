package com.task_manager.tms.repository;

import com.task_manager.tms.entity.Subtask;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SubtaskRepo extends JpaRepository<Subtask, Long> {
    // You can add custom query methods here if needed
}
