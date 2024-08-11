package com.task_manager.tms.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.List;

@Data
public class TaskDTO {
    private Long id;

    @NotNull(message = "Column ID is required")
    private Long columnId;

    @NotNull(message = "Board ID is required")
    private Long boardId;

    @NotBlank(message = "Task title is required")
    private String title;

    private String description;

    @NotBlank(message = "Task status is required")
    private String status;

    private List<SubtaskDTO> subtasks;
}
