package com.example.todo.web;

import com.example.todo.model.Todo;
import com.example.todo.repo.TodoRepo;

import org.springframework.web.bind.annotation.*;

import java.util.List;
// import java.util.NoSuchElementException;

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
    @PostMapping("/checkTodo")
    public Todo checkTodo(@RequestBody Todo todo, boolean isChecked, Long id){
        String item = todoRepo.findOne(id);
        return this.todoRepo.save(isChecked);
    }


}
