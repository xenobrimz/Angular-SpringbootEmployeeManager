package com.angjava.employeemanager.repositories;

import com.angjava.employeemanager.models.Employee;

import org.springframework.data.mongodb.repository.DeleteQuery;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Repository
public interface EmployeeRepository extends ReactiveMongoRepository<Employee, Long>{
    Flux<Employee> findByLastName(Mono<String> lastName);

    Flux<Employee> findByRole(Mono<String> role);



    @Query("{ 'firstname': ?0, 'lastname': ?1}")
    Mono<Employee> findByFirstNameAndLastName(String firstName, String lastName);
   
}

