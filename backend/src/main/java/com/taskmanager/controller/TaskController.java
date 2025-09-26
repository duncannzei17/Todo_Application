package com.taskmanager.controller;

import com.taskmanager.dto.MessageResponse;
import com.taskmanager.dto.TaskRequest;
import com.taskmanager.entity.Task;
import com.taskmanager.entity.User;
import com.taskmanager.repository.TaskRepository;
import com.taskmanager.repository.UserRepository;
import com.taskmanager.security.UserPrincipal;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/tasks")
public class TaskController {
    private static final Logger logger = LoggerFactory.getLogger(TaskController.class);

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private UserRepository userRepository;

    private User getCurrentUser() {
        UserPrincipal userPrincipal = (UserPrincipal) SecurityContextHolder.getContext()
                .getAuthentication().getPrincipal();
        return userRepository.findByUsername(userPrincipal.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    @GetMapping
    public ResponseEntity<List<Task>> getAllTasks() {
        User currentUser = getCurrentUser();
        List<Task> tasks = taskRepository.findByUser(currentUser);
        logger.info("Retrieved {} tasks for user: {}", tasks.size(), currentUser.getUsername());
        return ResponseEntity.ok(tasks);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Task> getTaskById(@PathVariable Long id) {
        User currentUser = getCurrentUser();
        Optional<Task> task = taskRepository.findByIdAndUser(id, currentUser);
        
        if (task.isPresent()) {
            logger.info("Retrieved task {} for user: {}", id, currentUser.getUsername());
            return ResponseEntity.ok(task.get());
        } else {
            logger.warn("Task {} not found for user: {}", id, currentUser.getUsername());
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<Task> createTask(@Valid @RequestBody TaskRequest taskRequest) {
        User currentUser = getCurrentUser();
        
        Task task = new Task(
                taskRequest.getTitle(),
                taskRequest.getDescription(),
                taskRequest.getStatus() != null ? taskRequest.getStatus() : Task.TaskStatus.PENDING,
                currentUser
        );
        
        Task savedTask = taskRepository.save(task);
        logger.info("Created task {} for user: {}", savedTask.getId(), currentUser.getUsername());
        
        return ResponseEntity.ok(savedTask);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Task> updateTask(@PathVariable Long id, @Valid @RequestBody TaskRequest taskRequest) {
        User currentUser = getCurrentUser();
        Optional<Task> taskOptional = taskRepository.findByIdAndUser(id, currentUser);
        
        if (taskOptional.isPresent()) {
            Task task = taskOptional.get();
            task.setTitle(taskRequest.getTitle());
            task.setDescription(taskRequest.getDescription());
            if (taskRequest.getStatus() != null) {
                task.setStatus(taskRequest.getStatus());
            }
            
            Task updatedTask = taskRepository.save(task);
            logger.info("Updated task {} for user: {}", id, currentUser.getUsername());
            
            return ResponseEntity.ok(updatedTask);
        } else {
            logger.warn("Task {} not found for user: {}", id, currentUser.getUsername());
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<MessageResponse> deleteTask(@PathVariable Long id) {
        User currentUser = getCurrentUser();
        Optional<Task> taskOptional = taskRepository.findByIdAndUser(id, currentUser);
        
        if (taskOptional.isPresent()) {
            taskRepository.delete(taskOptional.get());
            logger.info("Deleted task {} for user: {}", id, currentUser.getUsername());
            
            return ResponseEntity.ok(new MessageResponse("Task deleted successfully!"));
        } else {
            logger.warn("Task {} not found for user: {}", id, currentUser.getUsername());
            return ResponseEntity.notFound().build();
        }
    }
}