package com.angjava.employeemanager.services;

import java.util.concurrent.ExecutionException;

public interface ISequenceGeneratorService {
    long generateSequence(final String sequenceName) throws InterruptedException, ExecutionException;
}
