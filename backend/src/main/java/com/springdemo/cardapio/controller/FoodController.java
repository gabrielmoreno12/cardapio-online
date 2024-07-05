package com.springdemo.cardapio.controller;

import com.springdemo.cardapio.food.Food;
import com.springdemo.cardapio.food.FoodRepository;
import com.springdemo.cardapio.food.FoodRequestDTO;
import com.springdemo.cardapio.food.FoodResponseDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("food")
public class FoodController {

    @Autowired
    private FoodRepository repository;

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping
    public void saveFood(@RequestBody FoodRequestDTO foodRequestDTO) {
        Food food = new Food(foodRequestDTO);
        repository.save(food);
        return;
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping
    public List<FoodResponseDTO> getAll() {
        List<FoodResponseDTO> foodList = repository.findAll().stream().map(FoodResponseDTO::new).toList();
        return foodList;
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @DeleteMapping(path = "{id}")
    public void deleteFood(
            @PathVariable("id") long id) {
        System.out.println("Received ID: " + id);
        repository.deleteById(id);
    }

}
