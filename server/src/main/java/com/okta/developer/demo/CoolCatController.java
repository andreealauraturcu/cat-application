package com.okta.developer.demo;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.Collection;
import java.util.stream.Collectors;

@RestController
class CoolCatController {
    private CatRepository repository;

    public CoolCatController(CatRepository repository) {
        this.repository = repository;
    }

    @GetMapping("/cool-cats")
    @CrossOrigin(origins = "http://localhost:4200")
    public Collection<Cat> coolCats() {
        return repository.findAll().stream()
                .filter(this::isCool)
                .collect(Collectors.toList());
    }

    private boolean isCool(Cat cat) {
        return !cat.getName().equals("British Shorthair") &&
                !cat.getName().equals("Main Coon") &&
                !cat.getName().equals("Ragdoll") &&
                !cat.getName().equals("Korat") &&
                !cat.getName().equals("Birmanesse");
    }
}