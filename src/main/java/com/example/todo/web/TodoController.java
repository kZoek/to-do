package com.example.todo.web;

import com.example.todo.model.Todo;
import com.example.todo.repo.TodoRepo;

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
    @PutMapping("/checkTodo/{id}")
    public ResponseEntity<Object> updateListItemStatus(@PathVariable String id, boolean isChecked){
        Optional<Todo> listItem = todoRepo.findById(id);
        
        if (listItem.isPresent()) {
                    Todo item = listItem.get();
                    item.setChecked(isChecked);
                    todoRepo.save(item);
                    return ResponseEntity.ok(item);
                } else {
                    return ResponseEntity.notFound().build();
                }
                
    }
    @DeleteMapping("todo/{id}") 
    public Todo deleteTodo(@PathVariable String id){
        return todoRepo.deleteById(id);
    
    }
   

}
