package com.finance.model;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnore;
import java.time.LocalDate;

@Entity
public class Debt {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String name;
    private String type; // CREDIT_CARD, LOAN, MORTGAGE, etc.
    private double totalAmount;
    private double remainingAmount;
    private double interestRate;
    private double minimumPayment;
    private LocalDate startDate;
    private LocalDate targetPayoffDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User user;

    // Getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
    
    public double getTotalAmount() { return totalAmount; }
    public void setTotalAmount(double totalAmount) { this.totalAmount = totalAmount; }
    
    public double getRemainingAmount() { return remainingAmount; }
    public void setRemainingAmount(double remainingAmount) { this.remainingAmount = remainingAmount; }
    
    public double getInterestRate() { return interestRate; }
    public void setInterestRate(double interestRate) { this.interestRate = interestRate; }
    
    public double getMinimumPayment() { return minimumPayment; }
    public void setMinimumPayment(double minimumPayment) { this.minimumPayment = minimumPayment; }
    
    public LocalDate getStartDate() { return startDate; }
    public void setStartDate(LocalDate startDate) { this.startDate = startDate; }
    
    public LocalDate getTargetPayoffDate() { return targetPayoffDate; }
    public void setTargetPayoffDate(LocalDate targetPayoffDate) { this.targetPayoffDate = targetPayoffDate; }
    
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
}
