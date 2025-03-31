package com.habit.cli;

import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.File;
import java.time.LocalDate;
import java.time.temporal.WeekFields;
import java.util.*;

public class App {
    public static void main(String[] args) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            File file = new File("habits.json");

            Habit[] habits = mapper.readValue(file, Habit[].class);
            WeekFields weekFields = WeekFields.of(Locale.getDefault());

            for (Habit habit : habits) {
                System.out.println("Habit: " + habit.getName());

                Map<String, Integer> weeklyCounts = new TreeMap<>();

                for (LocalDate date : habit.getCompletionDates()) {
                    int weekNumber = date.get(weekFields.weekOfWeekBasedYear());
                    int year = date.getYear();
                    String key = "Week " + weekNumber + ", " + year;

                    weeklyCounts.put(key, weeklyCounts.getOrDefault(key, 0) + 1);
                }

                // Print weekly counts
                for (Map.Entry<String, Integer> entry : weeklyCounts.entrySet()) {
                    System.out.println("  " + entry.getKey() + ": " + entry.getValue() + " completions");
                }

                // Determine best week
                String bestWeek = Collections.max(weeklyCounts.entrySet(), Map.Entry.comparingByValue()).getKey();
                int bestCount = weeklyCounts.get(bestWeek);

                // Calculate average
                double average = weeklyCounts.values().stream().mapToInt(Integer::intValue).average().orElse(0.0);

                System.out.println("  ➤ Best Week: " + bestWeek + " (" + bestCount + " completions)");
                System.out.printf("  ➤ Weekly Average: %.2f completions%n%n", average);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
