package org.example;

import org.example.model.Employee;
import org.example.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Week2SpringDataJpaApplication implements CommandLineRunner {

    @Autowired
    private EmployeeRepository employeeRepository;

    public static void main(String[] args) {
        SpringApplication.run(Week2SpringDataJpaApplication.class, args);
    }

    @Override
    public void run(String... args) {
        employeeRepository.save(new Employee(1, "Amit", "IT"));
        employeeRepository.save(new Employee(2, "Neha", "HR"));

        employeeRepository.findAll().forEach(employee ->
                System.out.println(employee.getId() + " "
                        + employee.getName() + " "
                        + employee.getDepartment()));
    }
}