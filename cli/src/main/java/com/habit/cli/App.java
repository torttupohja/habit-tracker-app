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

            String filterHabit = args.length > 0 ? args[0].toLowerCase() : null;

            List<HabitStats> habitStatsList = new ArrayList<>();

            for (Habit habit : habits) {
                if (filterHabit != null && !habit.getName().toLowerCase().equals(filterHabit)) {
                    continue;
                }

                Map<String, Integer> weeklyCounts = new TreeMap<>();
                for (LocalDate date : habit.getCompletionDates()) {
                    int weekNumber = date.get(weekFields.weekOfWeekBasedYear());
                    int year = date.getYear();
                    String key = "Week " + weekNumber + ", " + year;
                    weeklyCounts.put(key, weeklyCounts.getOrDefault(key, 0) + 1);
                }

                double average = weeklyCounts.values().stream().mapToInt(Integer::intValue).average().orElse(0.0);
                habitStatsList.add(new HabitStats(habit.getName(), weeklyCounts, average));
            }

            // Sort by average weekly completions (desc)
            habitStatsList.sort(Comparator.comparingDouble(HabitStats::getAverage).reversed());

            for (HabitStats stats : habitStatsList) {
                System.out.println("Habit: " + stats.getName());
                for (Map.Entry<String, Integer> entry : stats.getWeeklyCounts().entrySet()) {
                    System.out.println("  " + entry.getKey() + ": " + entry.getValue() + " completions");
                }

                if (!stats.getWeeklyCounts().isEmpty()) {
                    String bestWeek = Collections.max(stats.getWeeklyCounts().entrySet(), Map.Entry.comparingByValue()).getKey();
                    int bestCount = stats.getWeeklyCounts().get(bestWeek);
                    double average = stats.getAverage();
                    int totalCompletions = stats.getWeeklyCounts().values().stream().mapToInt(Integer::intValue).sum();

                    System.out.println("  ➤ Total Completions: " + totalCompletions);
                    System.out.println("  ➤ Best Week: " + bestWeek + " (" + bestCount + " completions)");
                    System.out.printf("  ➤ Weekly Average: %.2f completions%n%n", average);
                }
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    // Helper class to hold stats
    static class HabitStats {
        private final String name;
        private final Map<String, Integer> weeklyCounts;
        private final double average;

        public HabitStats(String name, Map<String, Integer> weeklyCounts, double average) {
            this.name = name;
            this.weeklyCounts = weeklyCounts;
            this.average = average;
        }

        public String getName() {
            return name;
        }

        public Map<String, Integer> getWeeklyCounts() {
            return weeklyCounts;
        }

        public double getAverage() {
            return average;
        }
    }
}
