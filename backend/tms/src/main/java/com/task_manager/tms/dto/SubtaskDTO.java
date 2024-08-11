package com.task_manager.tms.dto;

import lombok.Data;

@Data
public class SubtaskDTO {
    private Long id;
    private String title;
    private boolean completed;
}