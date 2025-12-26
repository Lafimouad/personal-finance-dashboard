package com.finance.repository;

import com.finance.model.BillReminder;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface BillReminderRepository extends JpaRepository<BillReminder, Long> {
    List<BillReminder> findByUserUsername(String username);
    Optional<BillReminder> findByIdAndUserUsername(Long id, String username);
}
