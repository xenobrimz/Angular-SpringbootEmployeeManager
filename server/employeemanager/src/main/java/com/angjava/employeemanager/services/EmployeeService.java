package com.angjava.employeemanager.services;

import com.angjava.employeemanager.models.Employee;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
 
public interface EmployeeService {

    Mono<Employee> hire(Employee employee);
    Flux<Employee> list();
    Mono<Employee> get(Long _id);
    Mono<Employee> update(Employee employee);
    Mono<Void> fire(Long _id);
}
