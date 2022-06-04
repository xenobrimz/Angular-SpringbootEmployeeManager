package com.angjava.employeemanager.services.implimentation;

import com.angjava.employeemanager.models.Employee;
import com.angjava.employeemanager.repositories.EmployeeRepository;
import com.angjava.employeemanager.services.EmployeeService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RequiredArgsConstructor
@Service
@Transactional
@Slf4j
public class EmployeeServiceImpl implements EmployeeService{

    @Autowired
    private final EmployeeRepository employeeRepo;

    @Override
    public Mono<Employee> hire(Employee employee) {
        // TODO Auto-generated method stub
        log.info("Hiring new Employee: {}", employee.getFullName());
        return employeeRepo.save(employee);
    }

    @Override
    public Flux<Employee> list() {
        // TODO Auto-generated method stub
        log.info("Calling all Employees");
        return employeeRepo.findAll();
    }

    @Override
    public Mono<Employee> get(Long _id) {
        // TODO Auto-generated method stub
        return employeeRepo.findById(_id).switchIfEmpty(monoResponseStatusNotFoundException());
    }

    private <T> Mono<T> monoResponseStatusNotFoundException() {
        return Mono.error(new ResponseStatusException(HttpStatus.NOT_FOUND, "No employee found"));
    }

    @Override
    public Mono<Employee> update(Employee employee) {
        // TODO Auto-generated method stub
        log.info("Updating Employee: {}", employee.getFullName());
        return employeeRepo.save(employee);
    }

    @Override
    public Mono<Void> fire(final Long _id) {
        // TODO Auto-generated method stub
        log.info("Firing Employee {}", _id);
        return employeeRepo.deleteById(_id);
    }
    
    
}
