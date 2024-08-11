package com.task_manager.tms.repository;

import com.task_manager.tms.entity.Board;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BoardRepo extends JpaRepository<Board, Long> {
    List<Board> findByIsActive(boolean isActive);
}
