package com.finance.controller;

import com.finance.model.Expense;
import com.finance.repository.ExpenseRepository;
import com.finance.repository.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/expenses")
@CrossOrigin(origins = "http://localhost:3000")
public class ExpenseController {
    private final ExpenseRepository repository;
    private final UserRepository userRepository;

    public ExpenseController(ExpenseRepository repository, UserRepository userRepository) {
        this.repository = repository;
        this.userRepository = userRepository;
    }

    @GetMapping
    public List<Expense> getAll(Authentication authentication) {
        String username = authentication.getName();
        return repository.findByUserUsername(username);
    }

    @PostMapping
    public Expense create(@RequestBody Expense expense, Authentication authentication) {
        String username = authentication.getName();
        expense.setUser(userRepository.findByUsername(username));
        return repository.save(expense);
    }

    @PutMapping("/{id}")
    public Expense update(@PathVariable Long id, @RequestBody Expense updatedExpense, Authentication authentication) {
        String username = authentication.getName();
        Expense expense = repository.findByIdAndUserUsername(id, username)
                .orElseThrow(() -> new RuntimeException("Expense not found or not authorized"));
        expense.setCategory(updatedExpense.getCategory());
        expense.setAmount(updatedExpense.getAmount());
        expense.setDescription(updatedExpense.getDescription());
        expense.setRecurring(updatedExpense.isRecurring());
        expense.setDate(updatedExpense.getDate());
        return repository.save(expense);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id, Authentication authentication) {
        String username = authentication.getName();
        Expense expense = repository.findByIdAndUserUsername(id, username)
                .orElseThrow(() -> new RuntimeException("Expense not found or not authorized"));
        repository.delete(expense);
    }
}