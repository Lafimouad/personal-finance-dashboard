package com.finance.controller;

import com.finance.model.Debt;
import com.finance.repository.DebtRepository;
import com.finance.repository.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/debts")
@CrossOrigin(origins = "http://localhost:3000")
public class DebtController {
    private final DebtRepository repository;
    private final UserRepository userRepository;

    public DebtController(DebtRepository repository, UserRepository userRepository) {
        this.repository = repository;
        this.userRepository = userRepository;
    }

    @GetMapping
    public List<Debt> getAll(Authentication authentication) {
        String username = authentication.getName();
        return repository.findByUserUsername(username);
    }

    @PostMapping
    public Debt create(@RequestBody Debt debt, Authentication authentication) {
        String username = authentication.getName();
        debt.setUser(userRepository.findByUsername(username));
        return repository.save(debt);
    }

    @PutMapping("/{id}")
    public Debt update(@PathVariable Long id, @RequestBody Debt updatedDebt, Authentication authentication) {
        String username = authentication.getName();
        Debt debt = repository.findByIdAndUserUsername(id, username)
                .orElseThrow(() -> new RuntimeException("Debt not found or not authorized"));
        debt.setName(updatedDebt.getName());
        debt.setType(updatedDebt.getType());
        debt.setTotalAmount(updatedDebt.getTotalAmount());
        debt.setRemainingAmount(updatedDebt.getRemainingAmount());
        debt.setInterestRate(updatedDebt.getInterestRate());
        debt.setMinimumPayment(updatedDebt.getMinimumPayment());
        debt.setStartDate(updatedDebt.getStartDate());
        debt.setTargetPayoffDate(updatedDebt.getTargetPayoffDate());
        return repository.save(debt);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id, Authentication authentication) {
        String username = authentication.getName();
        Debt debt = repository.findByIdAndUserUsername(id, username)
                .orElseThrow(() -> new RuntimeException("Debt not found or not authorized"));
        repository.delete(debt);
    }

    @PatchMapping("/{id}/payment")
    public Debt makePayment(@PathVariable Long id, @RequestParam double amount, Authentication authentication) {
        String username = authentication.getName();
        Debt debt = repository.findByIdAndUserUsername(id, username)
                .orElseThrow(() -> new RuntimeException("Debt not found or not authorized"));
        debt.setRemainingAmount(Math.max(0, debt.getRemainingAmount() - amount));
        return repository.save(debt);
    }
}
