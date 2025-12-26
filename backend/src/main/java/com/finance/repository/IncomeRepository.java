package com.finance.repository;

import com.finance.model.Income;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface IncomeRepository extends JpaRepository<Income, Long> {
    List<Income> findByUserUsername(String username);
    Optional<Income> findByIdAndUserUsername(Long id, String username);
}
