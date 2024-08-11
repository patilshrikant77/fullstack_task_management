package com.task_manager.tms.dto;

import lombok.Data;

import java.util.List;

@Data
public class UpdateBoardDTO {
    private String name;
    private boolean active;
    private List<BoardColumnDTO> columns;
}
