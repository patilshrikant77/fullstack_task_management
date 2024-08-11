package com.task_manager.tms.response;

import lombok.Data;

@Data
public class SuccessResponse<T> {
    private boolean success;
    private String message;
    private T data;

    public SuccessResponse(String message, T data) {
        this.success = true;
        this.message = message;
        this.data = data;
    }

    public SuccessResponse(String message) {
        this.success = true;
        this.message = message;
    }
}
