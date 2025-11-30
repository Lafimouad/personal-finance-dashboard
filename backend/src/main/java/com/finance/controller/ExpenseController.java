package com.finance.controller;

import com.finance.model.Expense;
import com.finance.repository.ExpenseRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/expenses")
@CrossOrigin(origins = "http://localhost:3000")
public class ExpenseController {
    private final ExpenseRepository repository;

    public ExpenseController(ExpenseRepository repository) { this.repository = repository; }

    @GetMapping
    public List<Expense> getAll() { return repository.findAll(); }

    @PostMapping
    public Expense create(@RequestBody Expense expense) { return repository.save(expense); }
}