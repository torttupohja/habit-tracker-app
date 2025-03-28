// utils.js

// Returns today's date as 'YYYY-MM-DD'
export const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };
  
// Returns an array of 7 dates (YYYY-MM-DD) starting from a given date
export const getWeekDates = (startDateStr) => {
const dates = [];
const start = new Date(startDateStr);
for (let i = 0; i < 7; i++) {
    const day = new Date(start);
    day.setDate(start.getDate() + i);
    dates.push(day.toISOString().split('T')[0]);
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
  