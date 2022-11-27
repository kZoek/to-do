package com.example.todo.web;

import com.example.todo.model.Todo;
import com.example.todo.repo.TodoRepo;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api")
public class TodoController {
    private final TodoRepo todoRepo;

    public TodoController(TodoRepo todoRepo){
        this.todoRepo = todoRepo;
    }

    @GetMapping("/all")
    public List<Todo> getAll() {
        return todoRepo.findAll();
    }
    @PostMapping("/create")
    public Todo create(@RequestBody Todo todo){
        return todoRepo.insert(todo);
    }
}
