package com.finance.controller;

import com.finance.service.FinancialReportService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/reports")
@CrossOrigin(origins = "http://localhost:3000")
public class FinancialReportController {
    private final FinancialReportService reportService;

    public FinancialReportController(FinancialReportService reportService) {
        this.reportService = reportService;
    }

    @GetMapping("/monthly")
    public Map<String, Object> getMonthlyReport(
            @RequestParam int year,
            @RequestParam int month,
            Authentication authentication) {
        String username = authentication.getName();
        return reportService.generateMonthlyReport(username, year, month);
    }

    @GetMapping("/yearly")
    public Map<String, Object> getYearlyReport(
            @RequestParam int year,
            Authentication authentication) {
        String username = authentication.getName();
        return reportService.generateYearlyReport(username, year);
    }

    @GetMapping("/summary")
    public Map<String, Object> getFinancialSummary(Authentication authentication) {
        String username = authentication.getName();
        return reportService.getFinancialSummary(username);
    }
}
