/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext } from "react";

type ThemeContextProviders = {
  theme: string;
  toggleTheme: () => void;
};
export const ThemeContext = createContext<ThemeContextProviders>({
  theme: "light",
  toggleTheme: () => {},
});

export function useThemeContext() {
  const context = useContext(ThemeContext);

  return context;
}
