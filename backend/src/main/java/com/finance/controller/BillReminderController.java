package com.finance.controller;

import com.finance.model.BillReminder;
import com.finance.repository.BillReminderRepository;
import com.finance.repository.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bill-reminders")
@CrossOrigin(origins = "http://localhost:3000")
public class BillReminderController {
    private final BillReminderRepository repository;
    private final UserRepository userRepository;

    public BillReminderController(BillReminderRepository repository, UserRepository userRepository) {
        this.repository = repository;
        this.userRepository = userRepository;
    }

    @GetMapping
    public List<BillReminder> getAll(Authentication authentication) {
        String username = authentication.getName();
        return repository.findByUserUsername(username);
    }

    @PostMapping
    public BillReminder create(@RequestBody BillReminder reminder, Authentication authentication) {
        String username = authentication.getName();
        reminder.setUser(userRepository.findByUsername(username));
        return repository.save(reminder);
    }

    @PutMapping("/{id}")
    public BillReminder update(@PathVariable Long id, @RequestBody BillReminder updatedReminder, Authentication authentication) {
        String username = authentication.getName();
        BillReminder reminder = repository.findByIdAndUserUsername(id, username)
                .orElseThrow(() -> new RuntimeException("Bill reminder not found or not authorized"));
        reminder.setBillName(updatedReminder.getBillName());
        reminder.setAmount(updatedReminder.getAmount());
        reminder.setDueDate(updatedReminder.getDueDate());
        reminder.setRecurring(updatedReminder.isRecurring());
        reminder.setFrequency(updatedReminder.getFrequency());
        reminder.setPaid(updatedReminder.isPaid());
        reminder.setCategory(updatedReminder.getCategory());
        return repository.save(reminder);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id, Authentication authentication) {
        String username = authentication.getName();
        BillReminder reminder = repository.findByIdAndUserUsername(id, username)
                .orElseThrow(() -> new RuntimeException("Bill reminder not found or not authorized"));
        repository.delete(reminder);
    }

    @PatchMapping("/{id}/mark-paid")
    public BillReminder markPaid(@PathVariable Long id, @RequestParam boolean paid, Authentication authentication) {
        String username = authentication.getName();
        BillReminder reminder = repository.findByIdAndUserUsername(id, username)
                .orElseThrow(() -> new RuntimeException("Bill reminder not found or not authorized"));
        reminder.setPaid(paid);
        return repository.save(reminder);
    }
}
