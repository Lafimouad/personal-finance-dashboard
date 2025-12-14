package com.finance.service;

import com.finance.model.Budget;
import com.finance.repository.BudgetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BudgetService {
    @Autowired
    private BudgetRepository budgetRepository;

    public Budget saveBudget(Budget budget) {
        return budgetRepository.save(budget);
    }

    public List<Budget> getBudgetsForMonth(String month) {
        return budgetRepository.findByMonth(month);
    }

    public List<Budget> getBudgetsForCategory(String category) {
        return budgetRepository.findByCategory(category);
    }

    public Optional<Budget> getBudget(Long id) {
        return budgetRepository.findById(id);
    }

    public void deleteBudget(Long id) {
        budgetRepository.deleteById(id);
    }

    public List<Budget> getAllBudgets() {
        return budgetRepository.findAll();
    }
}
