// utils.js

// Returns today's date as 'YYYY-MM-DD'
export const getTodayDate = () => {
  const now = new Date();

  const timezoneOffsetInMs = now.getTimezoneOffset() * 60000;
  const localTime = new Date(now.getTime() - timezoneOffsetInMs);

  return localTime.toISOString().split('T')[0]; // 'YYYY-MM-DD'
};
  
// Returns an array of 7 dates (YYYY-MM-DD) starting from a given date
export const getWeekDates = (startDate) => {
  const dates = [];
  const start = new Date(startDate);

  for (let i = 0; i < 7; i++) {
    const date = new Date(start);
    date.setDate(start.getDate() + i);
    const formatted = date.toISOString().split('T')[0];
    dates.push(formatted);
  }
  return dates;
};

// Checks if today is still within the current week (7 days from start)
export const isCurrentWeek = (weekStartDateStr) => {
    if (!weekStartDateStr) return true;
  
    const start = new Date(weekStartDateStr);
    const today = new Date(getTodayDate());
  
    const diffInDays = Math.floor((today - start) / (1000 * 60 * 60 * 24));
    return diffInDays < 7;
  };  
  