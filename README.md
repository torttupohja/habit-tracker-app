# 📱 Habit Tracker App

A lightweight, customizable mobile app to help you build and maintain habits through visual tracking and weekly progress.

---

## ✨ Features

- Add/edit/delete daily habits
- Track completion using colorful rows and weekly grid
- Persistent storage with `AsyncStorage`
- Styled with custom fonts and backgrounds
- Fully tested with Jest + React Native Testing Library
- Works offline!

---

## 🧱 Project Structure

```
habit-tracker-app/
├── components/              # Reusable UI components
│   ├── BackgroundWrapper.js
│   └── WeeklyProgress.js
├── constants/               # Colors, constants
│   └── colors.js
├── screens/                 # App screens
│   └── HabitsScreen.js
├── styles/                  # StyleSheets
│   ├── HabitsScreenStyles.js
│   └── WeeklyProgressStyles.js
├── test/                    # Testing setup and utils
│   ├── setup.js
│   └── utils/
│       └── testUtils.js
├── __tests__/               # Test files
│   └── HabitsScreen.test.js
├── utils/                   # Helper functions
│   └── utils.js
├── App.js                   # App entry point
└── README.md
```

---

## 📷 Screenshots

Create a `screenshots/` folder in the root of your project and add screenshots like:

```
screenshots/
├── main_screen.png
└── weekly_progress.png
```
---

## 🧪 Testing

- Uses `@testing-library/react-native` and `jest-expo`
- Centralized mocks in `test/setup.js`
- Custom utilities in `test/utils/testUtils.js`
- Run tests with:

```bash
npm test
```

---

## 🚀 Getting Started

```bash
git clone https://github.com/your-username/habit-tracker-app.git
cd habit-tracker-app
npm install
npx expo start
```

---

## 🛠 Built With

- React Native + Expo
- AsyncStorage
- Shadows Into Light (Google Font)
- Jest, RTL for testing

---

## 🧠 Ideas for Future

- Streak logic
- Notifications
- Dark mode
- Export data

---

### 🙌 Credits
Created by Ksenya Epifanova
Design + UX inspired by minimal and accessible productivity apps.

## ©️ License

MIT