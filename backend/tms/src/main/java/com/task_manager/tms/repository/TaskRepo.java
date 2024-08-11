package com.task_manager.tms.repository;

import com.task_manager.tms.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TaskRepo extends JpaRepository<Task, Long> {
    // You can add custom query methods here if needed
}