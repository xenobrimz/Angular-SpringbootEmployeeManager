package com.angjava.employeemanager.controllers;

import java.util.concurrent.ExecutionException;

import com.angjava.employeemanager.models.Employee;
import com.angjava.employeemanager.services.EmployeeService;
import com.angjava.employeemanager.services.implimentation.DatabaseSequenceGenerator;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import reactor.core.Disposable;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/employees")
public class EmployeeController {
    
    @Autowired
    private EmployeeService employeeService;
    @Autowired
    private DatabaseSequenceGenerator sequenceGenerator;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Mono<Employee> create(@RequestBody Employee employee){
        try {
            employee.set_id(sequenceGenerator.generateSequence("employee_sequence"));
        } catch (InterruptedException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } catch (ExecutionException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        return employeeService.hire(employee);
    }
    

    @GetMapping
    public Flux<ResponseEntity<Employee>> getAllEmployees(){
        
            Flux<Employee> employees = employeeService.list();

            return employees.map( u -> ResponseEntity.ok(u))
                .defaultIfEmpty(ResponseEntity.notFound().build());
        
    }

    @GetMapping("/{_id}")
    public Mono<ResponseEntity<Employee>> getEmployee(@PathVariable Long _id){
        
            Mono<Employee> employee = employeeService.get(_id);

            return employee.map( u -> ResponseEntity.ok(u))
                .defaultIfEmpty(ResponseEntity.notFound().build());
        
    }


    @PutMapping("/{_id}")
    public Mono<Employee> updateEmployee(@PathVariable String _id, @RequestBody Employee employee) {
        //TODO: process PUT request
        return employeeService.update(employee);
    }

    @DeleteMapping("/{_id}")
    @ResponseStatus(HttpStatus.OK)
    public void delete(@PathVariable("_id") Long _id) {
        employeeService.fire(_id).subscribe();
    }




}
