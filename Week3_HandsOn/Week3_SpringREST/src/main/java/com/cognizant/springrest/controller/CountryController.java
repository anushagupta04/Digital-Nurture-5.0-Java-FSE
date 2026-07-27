package com.cognizant.springrest.controller;

import com.cognizant.springrest.Country;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class CountryController {

    private static List<Country> countries = new ArrayList<>();

    static {
        countries.add(new Country("IN", "India"));
        countries.add(new Country("US", "United States"));
        countries.add(new Country("UK", "United Kingdom"));
        countries.add(new Country("JP", "Japan"));
    }

    @GetMapping("/country")
    public Country getCountryIndia() {
        return new Country("IN", "India");
    }

    @GetMapping("/countries/{code}")
    public Country getCountryByCode(@PathVariable String code) {
        for (Country country : countries) {
            if (country.getCode().equalsIgnoreCase(code)) {
                return country;
            }
        }
        return null;
    }
}