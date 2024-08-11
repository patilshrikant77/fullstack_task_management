package com.task_manager.tms.response;

import lombok.Data;

@Data
public class ErrorResponse {
    private boolean success;
    private String message;

    public ErrorResponse(String message) {
        this.success = false;
        this.message = message;
    }
}
