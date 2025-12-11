package com.finance.service;

import com.finance.model.Expense;
import com.finance.repository.ExpenseRepository;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class RecurringExpenseService {
    private final ExpenseRepository expenseRepository;

    public RecurringExpenseService(ExpenseRepository expenseRepository) {
        this.expenseRepository = expenseRepository;
    }

    // Run at 1:00 AM on the 1st of every month
    @Scheduled(cron = "0 0 1 1 * *")
    @Transactional
    public void duplicateRecurringExpenses() {
        List<Expense> recurringExpenses = expenseRepository.findByRecurringTrue();
        for (Expense original : recurringExpenses) {
            Expense copy = new Expense();
            copy.setCategory(original.getCategory());
            copy.setAmount(original.getAmount());
            copy.setDescription(original.getDescription());
            copy.setRecurring(true);
            copy.setUser(original.getUser());
            // Set date to now (or add a date field if needed)
            // If you have a date field, set it to the first of the month
            // copy.setDate(new Date());
            expenseRepository.save(copy);
        }
    }
}
