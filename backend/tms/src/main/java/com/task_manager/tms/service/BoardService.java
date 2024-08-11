package com.task_manager.tms.service;

import com.task_manager.tms.dto.*;
import com.task_manager.tms.entity.Board;
import com.task_manager.tms.entity.BoardColumn;
import com.task_manager.tms.entity.Task;
import com.task_manager.tms.exception.ResourceNotFoundException;
import com.task_manager.tms.repository.BoardRepo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class BoardService {

    private static final Logger logger = LoggerFactory.getLogger(BoardService.class);

    @Autowired
    private BoardRepo boardRepository;

    public List<BoardDTO> getAllBoards() {
        return boardRepository.findAll().stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    public List<BoardDTO> getActiveBoards() {
        return boardRepository.findByIsActive(true).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public BoardDTO addBoard(AddBoardDTO addBoardDTO) {
        Board board = new Board();
        board.setName(addBoardDTO.getName());
        board.setActive(addBoardDTO.isActive());

        // Set columns if provided
        if (addBoardDTO.getColumns() != null) {
            List<BoardColumn> columns = convertToEntities(addBoardDTO.getColumns(), board);
            board.setColumns(columns);
        }

        board = boardRepository.save(board);
        return convertToDTO(board);
    }

    public BoardDTO updateBoard(Long id, UpdateBoardDTO updateBoardDTO) {

        Board board = boardRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Board not found with id " + id));

        // Update board fields
        board.setName(updateBoardDTO.getName());
        board.setActive(updateBoardDTO.isActive());

        // Update columns if provided
        if (updateBoardDTO.getColumns() != null) {
            updateBoardColumns(board, updateBoardDTO.getColumns());
        }

        board = boardRepository.save(board);
        return convertToDTO(board);
    }

    private void updateBoardColumns(Board board, List<BoardColumnDTO> columnDTOs) {
        if (columnDTOs == null) {
            return; // No columns to update or add
        }

        // Create a map of existing columns by ID
        Map<Long, BoardColumn> existingColumns = board.getColumns().stream()
                .collect(Collectors.toMap(BoardColumn::getId, column -> column));

        // Create lists for updated columns
        List<BoardColumn> updatedColumns = new ArrayList<>();
        List<BoardColumn> newColumns = new ArrayList<>();

        for (BoardColumnDTO columnDTO : columnDTOs) {
            if (columnDTO.getId() != null) {
                // Update existing column
                BoardColumn column = existingColumns.get(columnDTO.getId());
                if (column != null) {
                    column.setName(columnDTO.getName());
                    updatedColumns.add(column);
                } else {
                    throw new ResourceNotFoundException("Column not found with id " + columnDTO.getId());
                }
            } else {
                // Create new column
                BoardColumn newColumn = new BoardColumn();
                newColumn.setName(columnDTO.getName());
                newColumn.setBoard(board);
                newColumns.add(newColumn);
            }
        }

        // Remove old columns that are not in the updated list
        List<BoardColumn> columnsToRemove = board.getColumns().stream()
                .filter(column -> !updatedColumns.contains(column) && !newColumns.contains(column))
                .collect(Collectors.toList());

        board.getColumns().removeAll(columnsToRemove);
        // Replace existing columns with updated and new columns
        board.getColumns().clear();
        board.getColumns().addAll(newColumns);

        // Ensure the final list of columns contains the updated columns
        board.getColumns().addAll(updatedColumns);
    }

    @Transactional
    public void deleteBoard(Long id) {
        Board board = boardRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Board not found with id " + id));
        boardRepository.delete(board);
    }

    private List<BoardColumn> convertToEntities(List<BoardColumnDTO> columnDTOs, Board board) {
        if (columnDTOs == null) {
            return new ArrayList<>();
        }
        return columnDTOs.stream()
                .map(dto -> convertToEntity(dto, board))
                .collect(Collectors.toList());
    }

    private BoardColumn convertToEntity(BoardColumnDTO columnDTO, Board board) {
        BoardColumn column = new BoardColumn();
        column.setName(columnDTO.getName());
        column.setBoard(board); // Set the board reference
        return column;
    }

    public BoardDTO convertToDTO(Board board) {
        BoardDTO dto = new BoardDTO();
        dto.setName(board.getName());
        dto.setActive(board.isActive());
        dto.setId(board.getId());

        List<BoardColumnDTO> columnDTOs = board.getColumns().stream()
                .map(column -> {
                    BoardColumnDTO columnDTO = new BoardColumnDTO();
                    columnDTO.setId(column.getId());
                    columnDTO.setName(column.getName());

                    // Initialize the task list to avoid null
                    List<TaskDTO> taskDTOs = column.getTasks() != null && !column.getTasks().isEmpty()
                            ? column.getTasks().stream()
                            .map(this::convertToDTO) // Assuming convertToDTO(Task) converts a Task entity to TaskDTO
                            .collect(Collectors.toList())
                            : new ArrayList<>(); // Empty array if tasks are null or empty

                    columnDTO.setTasks(taskDTOs);
                    return columnDTO;
                })
                .collect(Collectors.toList());

        dto.setColumns(columnDTOs);
        return dto;
    }

    private BoardColumnDTO convertToDTO(BoardColumn column) {
        BoardColumnDTO columnDTO = new BoardColumnDTO();
        columnDTO.setId(column.getId()); // Ensure ID is set in the DTO
        columnDTO.setName(column.getName());
        return columnDTO;
    }

    private TaskDTO convertToDTO(Task task) {
        TaskDTO dto = new TaskDTO();
        dto.setId(task.getId());
        dto.setTitle(task.getTitle());
        dto.setDescription(task.getDescription());
        dto.setStatus(task.getStatus());
        dto.setColumnId(task.getColumn().getId()); // Set the columnId
        dto.setBoardId(task.getBoard().getId());   // Set the boardId

        // Convert subtasks to SubtaskDTO and set them in the TaskDTO
        if (task.getSubtasks() != null && !task.getSubtasks().isEmpty()) {
            List<SubtaskDTO> subtaskDTOs = task.getSubtasks().stream()
                    .map(subtask -> {
                        SubtaskDTO subtaskDTO = new SubtaskDTO();
                        subtaskDTO.setId(subtask.getId());
                        subtaskDTO.setTitle(subtask.getTitle());
                        subtaskDTO.setCompleted(subtask.isCompleted());
                        return subtaskDTO;
                    })
                    .collect(Collectors.toList());
            dto.setSubtasks(subtaskDTOs);
        }

        return dto;
    }

}
