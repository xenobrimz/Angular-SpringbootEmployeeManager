package com.angjava.employeemanager.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Document(collection = "employee")
@NoArgsConstructor
@AllArgsConstructor
public class Employee {

    @Transient
    public static final String SEQUENCE_NUMBER = "employee_sequence";

    @Id
    private Long _id;

    private String firstName;
    private String lastName;
    private Long age;
    private String role;

    public String getFullName(){
        return this.firstName + " " + this.lastName;
    }

}
