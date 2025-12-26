package com.finance.controller;

import com.finance.model.SavingsGoal;
import com.finance.repository.SavingsGoalRepository;
import com.finance.repository.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/savings-goals")
@CrossOrigin(origins = "http://localhost:3000")
public class SavingsGoalController {
    private final SavingsGoalRepository repository;
    private final UserRepository userRepository;

    public SavingsGoalController(SavingsGoalRepository repository, UserRepository userRepository) {
        this.repository = repository;
        this.userRepository = userRepository;
    }

    @GetMapping
    public List<SavingsGoal> getAll(Authentication authentication) {
        String username = authentication.getName();
        return repository.findByUserUsername(username);
    }

    @PostMapping
    public SavingsGoal create(@RequestBody SavingsGoal goal, Authentication authentication) {
        String username = authentication.getName();
        goal.setUser(userRepository.findByUsername(username));
        return repository.save(goal);
    }

    @PutMapping("/{id}")
    public SavingsGoal update(@PathVariable Long id, @RequestBody SavingsGoal updatedGoal, Authentication authentication) {
        String username = authentication.getName();
        SavingsGoal goal = repository.findByIdAndUserUsername(id, username)
                .orElseThrow(() -> new RuntimeException("Savings goal not found or not authorized"));
        goal.setName(updatedGoal.getName());
        goal.setTargetAmount(updatedGoal.getTargetAmount());
        goal.setCurrentAmount(updatedGoal.getCurrentAmount());
        goal.setTargetDate(updatedGoal.getTargetDate());
        goal.setDescription(updatedGoal.getDescription());
        goal.setCompleted(updatedGoal.isCompleted());
        return repository.save(goal);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id, Authentication authentication) {
        String username = authentication.getName();
        SavingsGoal goal = repository.findByIdAndUserUsername(id, username)
                .orElseThrow(() -> new RuntimeException("Savings goal not found or not authorized"));
        repository.delete(goal);
    }

    @PatchMapping("/{id}/contribute")
    public SavingsGoal contribute(@PathVariable Long id, @RequestParam double amount, Authentication authentication) {
        String username = authentication.getName();
        SavingsGoal goal = repository.findByIdAndUserUsername(id, username)
                .orElseThrow(() -> new RuntimeException("Savings goal not found or not authorized"));
        goal.setCurrentAmount(goal.getCurrentAmount() + amount);
        if (goal.getCurrentAmount() >= goal.getTargetAmount()) {
            goal.setCompleted(true);
        }
        return repository.save(goal);
    }
}
