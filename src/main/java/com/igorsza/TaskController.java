package com.igorsza;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:8081")
@RestController
@RequestMapping("/task")
public class TaskController {

    @Autowired
    private TaskRepository taskRepository;

    @GetMapping
    public List<Task> listTasks(){
        return taskRepository.findAll();
    }

    public TaskController(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    @GetMapping("/")
    public String showTaskList(Model model) {
        model.addAttribute("tasks", taskRepository.findAll());
        return "index";
    }

    @GetMapping("/task/edit/{id}")
    public String editTask(@PathVariable int id, Model model) {
        Task task = taskRepository.findById(id).orElse(null);
        if (task != null) {
            model.addAttribute("task", task);
            return "edit-task"; // Retorna a página edit-task.html
        }
        return "redirect:/";
    }

    @GetMapping("/{id}")
    public Task obtainTask(@PathVariable int id){
        return taskRepository.findById(id).orElse(null);
    }

    @PostMapping
    public Task includeTask(@RequestBody Task task){
        return taskRepository.save(task);
    }

    @PutMapping("/{id}")
    public Task updateTask(@PathVariable int id, @RequestBody Task updatedTask) {
        return taskRepository.findById(id)
                .map(task -> {
                    task.setName(updatedTask.getName());
                    task.setDescription(updatedTask.getDescription());
                    return taskRepository.save(task);
                })
                .orElse(null);
    }

    @DeleteMapping("/{id}")
    public void deleteTask(@PathVariable int id){
        taskRepository.deleteById(id);
    }
}
