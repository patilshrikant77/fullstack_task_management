package com.task_manager.tms.dto;

import lombok.Data;

import java.util.List;

@Data
public class AddBoardDTO {
    private Long id;
    private String name;
    private boolean active;
    private List<BoardColumnDTO> columns;
}
