package com.finance.controller;

import com.finance.model.Budget;
import com.finance.service.BudgetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/budgets")
@CrossOrigin(origins = "*")
public class BudgetController {
    @Autowired
    private BudgetService budgetService;

    @PostMapping
    public Budget createBudget(@RequestBody Budget budget) {
        return budgetService.saveBudget(budget);
    }

    @GetMapping
    public List<Budget> getAllBudgets() {
        return budgetService.getAllBudgets();
    }

    @GetMapping("/{id}")
    public Optional<Budget> getBudget(@PathVariable Long id) {
        return budgetService.getBudget(id);
    }

    @GetMapping("/month/{month}")
    public List<Budget> getBudgetsForMonth(@PathVariable String month) {
        return budgetService.getBudgetsForMonth(month);
    }

    @GetMapping("/category/{category}")
    public List<Budget> getBudgetsForCategory(@PathVariable String category) {
        return budgetService.getBudgetsForCategory(category);
    }

    @DeleteMapping("/{id}")
    public void deleteBudget(@PathVariable Long id) {
        budgetService.deleteBudget(id);
    }
}
