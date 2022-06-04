package com.angjava.employeemanager.models;


import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.stereotype.Component;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
 
@Data
@Document(collection = "database_sequence")
@NoArgsConstructor
@AllArgsConstructor
@Component
public class DatabaseSequence {

    @Id
    private String _id;

   @Field("sequence_number")
   private Long sequence;
}

