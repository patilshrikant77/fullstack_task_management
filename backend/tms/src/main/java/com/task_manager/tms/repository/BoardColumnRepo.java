package com.task_manager.tms.repository;

import com.task_manager.tms.entity.BoardColumn;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BoardColumnRepo extends JpaRepository<BoardColumn, Long> {
    // Add custom query methods if needed
}
