package com.finance.controller;

import com.finance.model.Income;
import com.finance.repository.IncomeRepository;
import com.finance.repository.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/income")
@CrossOrigin(origins = "http://localhost:3000")
public class IncomeController {
    private final IncomeRepository repository;
    private final UserRepository userRepository;

    public IncomeController(IncomeRepository repository, UserRepository userRepository) {
        this.repository = repository;
        this.userRepository = userRepository;
    }

    @GetMapping
    public List<Income> getAll(Authentication authentication) {
        String username = authentication.getName();
        return repository.findByUserUsername(username);
    }

    @PostMapping
    public Income create(@RequestBody Income income, Authentication authentication) {
        String username = authentication.getName();
        income.setUser(userRepository.findByUsername(username));
        return repository.save(income);
    }

    @PutMapping("/{id}")
    public Income update(@PathVariable Long id, @RequestBody Income updatedIncome, Authentication authentication) {
        String username = authentication.getName();
        Income income = repository.findByIdAndUserUsername(id, username)
                .orElseThrow(() -> new RuntimeException("Income not found or not authorized"));
        income.setSource(updatedIncome.getSource());
        income.setAmount(updatedIncome.getAmount());
        income.setDescription(updatedIncome.getDescription());
        income.setDate(updatedIncome.getDate());
        income.setRecurring(updatedIncome.isRecurring());
        income.setFrequency(updatedIncome.getFrequency());
        return repository.save(income);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id, Authentication authentication) {
        String username = authentication.getName();
        Income income = repository.findByIdAndUserUsername(id, username)
                .orElseThrow(() -> new RuntimeException("Income not found or not authorized"));
        repository.delete(income);
    }
}
