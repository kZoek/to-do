package com.example.todo.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@NoArgsConstructor
@Document
public class Todo {
    @Id
    private String id;
    private String name;
    private boolean checked;

    public Todo(String id, String name, boolean checked){
        this.id = id;
        this.name = name;
        this.checked = checked;
    }

    public String getId(){
        return id;
    }
    public String getName(){
        return name;
    }
    public boolean isChecked(){
        return checked;
    }
    
}
