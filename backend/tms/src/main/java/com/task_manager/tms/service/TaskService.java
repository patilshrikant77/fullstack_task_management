package com.task_manager.tms.service;

import com.task_manager.tms.dto.SubtaskDTO;
import com.task_manager.tms.dto.TaskDTO;
import com.task_manager.tms.entity.Board;
import com.task_manager.tms.entity.BoardColumn;
import com.task_manager.tms.entity.Subtask;
import com.task_manager.tms.entity.Task;
import com.task_manager.tms.exception.ResourceNotFoundException;
import com.task_manager.tms.repository.BoardColumnRepo;
import com.task_manager.tms.repository.BoardRepo;
import com.task_manager.tms.repository.SubtaskRepo;
import com.task_manager.tms.repository.TaskRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TaskService {

    @Autowired
    private TaskRepo taskRepository;

    @Autowired
    private BoardRepo boardRepository;

    @Autowired
    private BoardColumnRepo boardColumnRepository;

    @Autowired
    private SubtaskRepo subtaskRepository;

    @Transactional
    public TaskDTO addTask(TaskDTO taskDTO) {
        // Fetch the board column and board
        BoardColumn column = boardColumnRepository.findById(taskDTO.getColumnId())
                .orElseThrow(() -> new ResourceNotFoundException("Column not found with id " + taskDTO.getColumnId()));

        Board board = boardRepository.findById(taskDTO.getBoardId())
                .orElseThrow(() -> new ResourceNotFoundException("Board not found with id " + taskDTO.getBoardId()));

        // Create the task
        Task task = Task.builder()
                .title(taskDTO.getTitle())
                .description(taskDTO.getDescription())
                .status(taskDTO.getStatus())
                .column(column)
                .board(board)
                .build();

        // Add subtasks if present
        if (taskDTO.getSubtasks() != null && !taskDTO.getSubtasks().isEmpty()) {
            List<Subtask> subtasks = taskDTO.getSubtasks().stream()
                    .map(subtaskDTO -> {
                        Subtask subtask = new Subtask();
                        subtask.setId(subtaskDTO.getId());
                        subtask.setTitle(subtaskDTO.getTitle());
                        subtask.setTask(task); // Set the parent task
                        return subtask;
                    })
                    .collect(Collectors.toList());
            task.setSubtasks(subtasks);
        }

        // Save the task
        Task savedTask = taskRepository.save(task);

        // Save subtasks after saving the task to ensure they get the task ID
        if (task.getSubtasks() != null && !task.getSubtasks().isEmpty()) {
            subtaskRepository.saveAll(task.getSubtasks());
        }

        return convertToDTO(savedTask);
    }

    @Transactional
    public TaskDTO updateTask(Long id, TaskDTO taskDTO) {
        // Fetch the existing task
        Task existingTask = taskRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Task not found with id " + id));

        // Fetch the board column
        BoardColumn column = boardColumnRepository.findById(taskDTO.getColumnId())
                .orElseThrow(() -> new ResourceNotFoundException("Column not found with id " + taskDTO.getColumnId()));

        // Update the task
        existingTask.setTitle(taskDTO.getTitle());
        existingTask.setDescription(taskDTO.getDescription());
        existingTask.setStatus(taskDTO.getStatus());
        existingTask.setColumn(column);

        // Remove existing subtasks if any
        if (existingTask.getSubtasks() != null) {
            subtaskRepository.deleteAll(existingTask.getSubtasks());
        }

        // Add subtasks if present
        if (taskDTO.getSubtasks() != null && !taskDTO.getSubtasks().isEmpty()) {
            List<Subtask> subtasks = taskDTO.getSubtasks().stream()
                    .map(subtaskDTO -> {
                        Subtask subtask = new Subtask();
                        subtask.setTitle(subtaskDTO.getTitle());
                        subtask.setId(subtaskDTO.getId());
                        subtask.setTask(existingTask); // Set the parent task
                        return subtask;
                    })
                    .collect(Collectors.toList());
            existingTask.setSubtasks(subtasks);
        }

        // Save the updated task
        Task updatedTask = taskRepository.save(existingTask);

        // Save subtasks after saving the task to ensure they get the task ID
        if (existingTask.getSubtasks() != null && !existingTask.getSubtasks().isEmpty()) {
            subtaskRepository.saveAll(existingTask.getSubtasks());
        }

        return convertToDTO(updatedTask);
    }

    @Transactional
    public void deleteTask(Long id) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Task not found with id " + id));

        // Delete associated subtasks
        if (task.getSubtasks() != null && !task.getSubtasks().isEmpty()) {
            subtaskRepository.deleteAll(task.getSubtasks());
        }

        // Delete the task
        taskRepository.delete(task);
    }

    private TaskDTO convertToDTO(Task task) {
        TaskDTO dto = new TaskDTO();
        dto.setColumnId(task.getColumn().getId());
        dto.setBoardId(task.getBoard().getId());
        dto.setTitle(task.getTitle());
        dto.setId(task.getId());
        dto.setDescription(task.getDescription());
        dto.setStatus(task.getStatus());
        if (task.getSubtasks() != null && !task.getSubtasks().isEmpty()) {
            dto.setSubtasks(task.getSubtasks().stream()
                    .map(subtask -> {
                        SubtaskDTO subtaskDTO = new SubtaskDTO();
                        subtaskDTO.setTitle(subtask.getTitle());
                        subtaskDTO.setId(subtask.getId());
                        return subtaskDTO;
                    })
                    .collect(Collectors.toList()));
        }
        return dto;
    }

}
