import { getTodayDate, getWeekDates, isCurrentWeek } from './utils';

describe('utils.js', () => {
  test('getTodayDate returns today in YYYY-MM-DD format', () => {
    const today = new Date().toISOString().split('T')[0];
    expect(getTodayDate()).toBe(today);
  });

  test('getWeekDates returns 7 consecutive dates from start', () => {
    const startDate = '2024-04-01';
    const result = getWeekDates(startDate);

    expect(result).toHaveLength(7);
    expect(result[0]).toBe('2024-04-01');
    expect(result[1]).toBe('2024-04-02');
    expect(result[6]).toBe('2024-04-07');
  });

  test('isCurrentWeek returns true if today is within 7 days of start', () => {
    const today = new Date();
    const sixDaysAgo = new Date(today);
    sixDaysAgo.setDate(today.getDate() - 6);
    const dateStr = sixDaysAgo.toISOString().split('T')[0];

    expect(isCurrentWeek(dateStr)).toBe(true);
  });

  test('isCurrentWeek returns false if more than 7 days passed', () => {
    const today = new Date();
    const eightDaysAgo = new Date(today);
    eightDaysAgo.setDate(today.getDate() - 8);
    const dateStr = eightDaysAgo.toISOString().split('T')[0];

    expect(isCurrentWeek(dateStr)).toBe(false);
  });
});
