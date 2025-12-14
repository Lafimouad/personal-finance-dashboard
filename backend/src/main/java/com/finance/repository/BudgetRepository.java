package com.finance.repository;

import com.finance.model.Budget;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface BudgetRepository extends JpaRepository<Budget, Long> {
    List<Budget> findByCategoryAndMonth(String category, String month);
    List<Budget> findByMonth(String month);
    List<Budget> findByCategory(String category);
}
