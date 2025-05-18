import { createContext, useContext } from "react";

export const ThemeContext = createContext({
  themeMode: "light", //  current theme mode is initially light
  darkTheme: () => {}, // a placeholder function to switch to dark theme
  lightTheme: () => {}, // a placeholder function to switch to light theme
});

export const ThemeProvider = ThemeContext.Provider; //This line exports the Provider part of the context. We’ll use ThemeProvider to wrap our app (or part of it) and provide actual values like the current theme and the functions to toggle it.

export default function useTheme() {
  return useContext(ThemeContext); // It allows any component to access the values from ThemeContext by simply calling useTheme().
}
