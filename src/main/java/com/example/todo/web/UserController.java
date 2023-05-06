package com.example.todo.web;

import com.example.todo.model.User;
import com.example.todo.repo.UserRepo;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
// import java.util.NoSuchElementException;
import java.util.Optional;

@RestController
@RequestMapping("api")
public class UserController {
    private final UserRepo UserRepo;

    public UserController(UserRepo UserRepo){
        this.UserRepo = UserRepo;
    }
    @PostMapping("/createUser")
    public createUser(@RequestBody User user){
        return UserRepo.insert(user);

    }
}
