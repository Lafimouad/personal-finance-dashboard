package com.finance.repository;

import com.finance.model.Expense;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ExpenseRepository extends JpaRepository<Expense, Long> {
	List<Expense> findByUserUsername(String username);
	java.util.Optional<Expense> findByIdAndUserUsername(Long id, String username);
	List<Expense> findByRecurringTrue();
}
