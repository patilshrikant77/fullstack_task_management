package com.task_manager.tms.controller;

import com.task_manager.tms.dto.AddBoardDTO;
import com.task_manager.tms.dto.BoardDTO;
import com.task_manager.tms.dto.UpdateBoardDTO;
import com.task_manager.tms.exception.InvalidInputException;
import com.task_manager.tms.response.SuccessResponse;
import com.task_manager.tms.service.BoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/boards")
public class BoardController {

    @Autowired
    private BoardService boardService;


    @GetMapping
    public ResponseEntity<SuccessResponse<List<BoardDTO>>> getAllBoards() {
        List<BoardDTO> boards = boardService.getAllBoards();
        return ResponseEntity.ok(new SuccessResponse<>("Boards retrieved successfully", boards));
    }

    @GetMapping("/active")
    public ResponseEntity<SuccessResponse<List<BoardDTO>>> getActiveBoards() {
        List<BoardDTO> boards = boardService.getActiveBoards();
        return ResponseEntity.ok(new SuccessResponse<>("Active boards retrieved  successfully", boards));
    }

    @PostMapping("/add")
    public ResponseEntity<SuccessResponse> addBoard(@RequestBody AddBoardDTO addBoardDTO) {
        if (addBoardDTO.getName() == null || addBoardDTO.getName().isEmpty()) {
            throw new InvalidInputException("Board name must not be empty");
        }

        BoardDTO boardDTO = boardService.addBoard(addBoardDTO);
        return ResponseEntity.ok(new SuccessResponse("Board added successfully", boardDTO));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<SuccessResponse> updateBoard(
            @PathVariable("id") Long id,
            @RequestBody UpdateBoardDTO updateBoardDTO) {

        if (updateBoardDTO.getName() == null || updateBoardDTO.getName().isEmpty()) {
            throw new InvalidInputException("Board name must not be empty");
        }

        BoardDTO boardDTO = boardService.updateBoard(id, updateBoardDTO);
        return ResponseEntity.ok(new SuccessResponse("Board updated successfully", boardDTO));
    }

    @PostMapping("/delete/{id}")
    public ResponseEntity<SuccessResponse> deleteBoard(@PathVariable Long id) {
        boardService.deleteBoard(id);
        return ResponseEntity.ok(new SuccessResponse("Board deleted successfully"));
    }
}
