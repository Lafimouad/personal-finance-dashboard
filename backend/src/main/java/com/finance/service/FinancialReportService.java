package com.finance.service;

import com.finance.model.Expense;
import com.finance.model.Income;
import com.finance.repository.ExpenseRepository;
import com.finance.repository.IncomeRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.YearMonth;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class FinancialReportService {
    private final ExpenseRepository expenseRepository;
    private final IncomeRepository incomeRepository;

    public FinancialReportService(ExpenseRepository expenseRepository, IncomeRepository incomeRepository) {
        this.expenseRepository = expenseRepository;
        this.incomeRepository = incomeRepository;
    }

    public Map<String, Object> generateMonthlyReport(String username, int year, int month) {
        YearMonth yearMonth = YearMonth.of(year, month);
        LocalDate startDate = yearMonth.atDay(1);
        LocalDate endDate = yearMonth.atEndOfMonth();

        List<Expense> expenses = expenseRepository.findByUserUsername(username);
        List<Income> incomes = incomeRepository.findByUserUsername(username);

        // Filter by date - for expenses we assume they have a date field (need to add it)
        // For now, we'll work with all data
        double totalExpenses = expenses.stream()
                .mapToDouble(Expense::getAmount)
                .sum();

        double totalIncome = incomes.stream()
                .filter(i -> i.getDate() != null && 
                        !i.getDate().isBefore(startDate) && 
                        !i.getDate().isAfter(endDate))
                .mapToDouble(Income::getAmount)
                .sum();

        Map<String, Double> expensesByCategory = expenses.stream()
                .collect(Collectors.groupingBy(
                        Expense::getCategory,
                        Collectors.summingDouble(Expense::getAmount)
                ));

        Map<String, Object> report = new HashMap<>();
        report.put("month", month);
        report.put("year", year);
        report.put("totalIncome", totalIncome);
        report.put("totalExpenses", totalExpenses);
        report.put("netSavings", totalIncome - totalExpenses);
        report.put("expensesByCategory", expensesByCategory);
        report.put("savingsRate", totalIncome > 0 ? ((totalIncome - totalExpenses) / totalIncome * 100) : 0);

        return report;
    }

    public Map<String, Object> generateYearlyReport(String username, int year) {
        List<Expense> expenses = expenseRepository.findByUserUsername(username);
        List<Income> incomes = incomeRepository.findByUserUsername(username);

        double totalExpenses = expenses.stream()
                .mapToDouble(Expense::getAmount)
                .sum();

        double totalIncome = incomes.stream()
                .filter(i -> i.getDate() != null && i.getDate().getYear() == year)
                .mapToDouble(Income::getAmount)
                .sum();

        Map<String, Double> expensesByCategory = expenses.stream()
                .collect(Collectors.groupingBy(
                        Expense::getCategory,
                        Collectors.summingDouble(Expense::getAmount)
                ));

        // Monthly breakdown
        Map<Integer, Double> monthlyExpenses = new HashMap<>();
        Map<Integer, Double> monthlyIncome = new HashMap<>();
        
        for (int month = 1; month <= 12; month++) {
            final int currentMonth = month;
            double monthExpenses = expenses.stream()
                    .mapToDouble(Expense::getAmount)
                    .sum() / 12; // Simplified - should filter by actual month
            
            double monthIncome = incomes.stream()
                    .filter(i -> i.getDate() != null && 
                            i.getDate().getYear() == year && 
                            i.getDate().getMonthValue() == currentMonth)
                    .mapToDouble(Income::getAmount)
                    .sum();
            
            monthlyExpenses.put(month, monthExpenses);
            monthlyIncome.put(month, monthIncome);
        }

        Map<String, Object> report = new HashMap<>();
        report.put("year", year);
        report.put("totalIncome", totalIncome);
        report.put("totalExpenses", totalExpenses);
        report.put("netSavings", totalIncome - totalExpenses);
        report.put("expensesByCategory", expensesByCategory);
        report.put("monthlyExpenses", monthlyExpenses);
        report.put("monthlyIncome", monthlyIncome);
        report.put("savingsRate", totalIncome > 0 ? ((totalIncome - totalExpenses) / totalIncome * 100) : 0);

        return report;
    }

    public Map<String, Object> getFinancialSummary(String username) {
        List<Expense> expenses = expenseRepository.findByUserUsername(username);
        List<Income> incomes = incomeRepository.findByUserUsername(username);

        double totalExpenses = expenses.stream().mapToDouble(Expense::getAmount).sum();
        double totalIncome = incomes.stream().mapToDouble(Income::getAmount).sum();
        
        Map<String, Object> summary = new HashMap<>();
        summary.put("totalIncome", totalIncome);
        summary.put("totalExpenses", totalExpenses);
        summary.put("netSavings", totalIncome - totalExpenses);
        summary.put("expenseCount", expenses.size());
        summary.put("incomeCount", incomes.size());
        
        return summary;
    }
}
