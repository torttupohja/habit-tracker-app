package com.habit.cli;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

public class Habit {
    private String name;
    private List<String> datesCompleted;

    public String getName() {
        return name;
    }

    public List<String> getDatesCompleted() {
        return datesCompleted;
    }

    // Convert string dates to LocalDate
    public List<LocalDate> getCompletionDates() {
        return datesCompleted.stream()
            .map(LocalDate::parse)
            .collect(Collectors.toList());
    }
}
