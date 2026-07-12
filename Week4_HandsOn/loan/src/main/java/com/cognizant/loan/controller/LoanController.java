package com.cognizant.loan.controller;

import com.cognizant.loan.Loan;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LoanController {

    @GetMapping("/loans/{number}")
    public Loan getLoan(@PathVariable String number) {
        return new Loan(
                number,
                "car",
                400000.0,
                3258.0,
                18
        );
    }
}