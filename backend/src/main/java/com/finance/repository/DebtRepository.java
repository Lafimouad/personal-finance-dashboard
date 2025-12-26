package com.finance.repository;

import com.finance.model.Debt;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface DebtRepository extends JpaRepository<Debt, Long> {
    List<Debt> findByUserUsername(String username);
    Optional<Debt> findByIdAndUserUsername(Long id, String username);
}
