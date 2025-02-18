package com.igorsza;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String name;
    private String description;

    //aqui deixei esse comentário para falar sobre o construtor vazio que é obrigatório!!! para o JPA funcionar corretamente.
    public Task(){
    }
    //Já aqui é o contrutor com parâmetros que é opcional para ter uma boa prática para facilitar a criação de objetos na aplicação.
    public Task(String name, String description) {
        this.name = name;
        this.description = description;
    }


    public int getId(){
        return id;
    }
    public void setId(int id){
        this.id =id;
    }
    public String getName(){
        return name;
    }
    public void setName(String name){
        this.name = name;
    }
    public String getDescription(){
        return description;
    }
    public void setDescription(String description){
        this.description = description;
    }
}
