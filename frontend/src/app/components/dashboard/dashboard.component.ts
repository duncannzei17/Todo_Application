import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { TaskService } from '../../services/task.service';
import { Task, TaskStatus, TaskRequest } from '../../models/task.model';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  tasks: Task[] = [];
  currentUser: User | null = null;
  isLoading = false;
  errorMessage = '';
  successMessage = '';
  showTaskModal = false;
  isEditMode = false;
  currentTaskId: number | null = null;
  
  taskForm: TaskRequest = {
    title: '',
    description: '',
    status: TaskStatus.PENDING
  };

  TaskStatus = TaskStatus;

  constructor(
    private authService: AuthService,
    private taskService: TaskService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
      if (!user) {
        this.router.navigate(['/login']);
      }
    });
    
    this.loadTasks();
  }

  loadTasks(): void {
    this.isLoading = true;
    this.errorMessage = '';
    
    this.taskService.getTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load tasks. Please try again.';
        this.isLoading = false;
        console.error('Error loading tasks:', error);
      }
    });
  }

  openTaskModal(task?: Task): void {
    this.showTaskModal = true;
    this.isEditMode = !!task;
    
    if (task) {
      this.currentTaskId = task.id || null;
      this.taskForm = {
        title: task.title,
        description: task.description || '',
        status: task.status
      };
    } else {
      this.resetTaskForm();
    }
  }

  closeTaskModal(): void {
    this.showTaskModal = false;
    this.isEditMode = false;
    this.currentTaskId = null;
    this.resetTaskForm();
  }

  resetTaskForm(): void {
    this.taskForm = {
      title: '',
      description: '',
      status: TaskStatus.PENDING
    };
  }

  saveTask(): void {
    if (!this.taskForm.title.trim()) {
      this.errorMessage = 'Task title is required.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    const operation = this.isEditMode && this.currentTaskId
      ? this.taskService.updateTask(this.currentTaskId, this.taskForm)
      : this.taskService.createTask(this.taskForm);

    operation.subscribe({
      next: () => {
        this.successMessage = this.isEditMode ? 'Task updated successfully!' : 'Task created successfully!';
        this.closeTaskModal();
        this.loadTasks();
        this.isLoading = false;
        setTimeout(() => this.successMessage = '', 3000);
      },
      error: (error) => {
        this.errorMessage = 'Failed to save task. Please try again.';
        this.isLoading = false;
        console.error('Error saving task:', error);
      }
    });
  }

  toggleTaskStatus(task: Task): void {
    if (!task.id) return;
    
    const updatedTask: TaskRequest = {
      ...task,
      status: task.status === TaskStatus.PENDING ? TaskStatus.COMPLETED : TaskStatus.PENDING
    };

    this.taskService.updateTask(task.id, updatedTask).subscribe({
      next: () => {
        this.successMessage = 'Task status updated!';
        this.loadTasks();
        setTimeout(() => this.successMessage = '', 3000);
      },
      error: (error) => {
        this.errorMessage = 'Failed to update task status.';
        setTimeout(() => this.errorMessage = '', 3000);
        console.error('Error updating task status:', error);
      }
    });
  }

  deleteTask(task: Task): void {
    if (!task.id || !confirm('Are you sure you want to delete this task?')) return;

    this.taskService.deleteTask(task.id).subscribe({
      next: () => {
        this.successMessage = 'Task deleted successfully!';
        this.loadTasks();
        setTimeout(() => this.successMessage = '', 3000);
      },
      error: (error) => {
        this.errorMessage = 'Failed to delete task.';
        setTimeout(() => this.errorMessage = '', 3000);
        console.error('Error deleting task:', error);
      }
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  toggleDropdown(event: Event): void {
    event.preventDefault();
    const button = event.target as HTMLElement;
    const dropdown = button.parentElement?.querySelector('.dropdown-menu') as HTMLElement;
    
    if (dropdown) {
      dropdown.classList.toggle('show');
    }
  }

  get pendingTasks(): Task[] {
    return this.tasks.filter(task => task.status === TaskStatus.PENDING);
  }

  get completedTasks(): Task[] {
    return this.tasks.filter(task => task.status === TaskStatus.COMPLETED);
  }
}