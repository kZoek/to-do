package com.example.todo.web;

import com.example.todo.model.Todo;
import com.example.todo.repo.TodoRepo;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
// import java.util.NoSuchElementException;
import java.util.Optional;

@RestController
@RequestMapping("api")
public class TodoController {
    private final TodoRepo todoRepo;

    public TodoController(TodoRepo todoRepo){
        this.todoRepo = todoRepo;
    }
// get all Todos
    @GetMapping("/all")
    public List<Todo> getAll() {
        return todoRepo.findAll();
    }
    // create a new Todo in DB
    @PostMapping("/create")
    public Todo create(@RequestBody Todo todo){
        return todoRepo.insert(todo);
    }
    // if todo is checked, check it in DB
    @PutMapping("/checkTodo")
    public Todo updateListItemStatus(@RequestBody Todo requestBody){
        Optional<Todo> listItem = todoRepo.findById(requestBody.getId());
        
        if (listItem.isPresent()) {
            Todo item = listItem.get();
            item.setChecked(requestBody.isChecked());
            todoRepo.save(item);
            return item;
        } else {
            return null;
        }      
    }
    @DeleteMapping("/deleteTodo/{id}")
    public ResponseEntity<String> deleteTodo(@PathVariable String id){
        try{
            todoRepo.deleteById(id);
            return ResponseEntity.status(HttpStatus.OK).body(id.concat(" is deleted"));
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body(e.getMessage());
        }

    }
   

}
