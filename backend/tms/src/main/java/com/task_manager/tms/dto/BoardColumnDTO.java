package com.task_manager.tms.dto;
import lombok.Data;

import java.util.List;

@Data
public class BoardColumnDTO {
    private Long id; // Ensure ID is included
    private String name;
    private List<TaskDTO> tasks;
}