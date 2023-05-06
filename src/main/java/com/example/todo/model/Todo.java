package com.example.todo.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Document
public class Todo {
    @Id
    private String id;
    private String name;
    private boolean checked;

    // public String getId(){
    //     return id;
    // }
    // public String getName(){
    //     return name;
    // }
    // public boolean isChecked(){
    //     return checked;
    // }
    
}
