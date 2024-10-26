"use client";

import { useTheme } from "@/context/ThemeContext";
import { ThemeToggleProps } from "@/types";
import { Moon, Sun } from "lucide-react";
import { FC } from "react";

const ThemeToggle: FC<ThemeToggleProps> = ({ className = "" }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`p-2 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 ${className}`}
      aria-label="Toggle theme"
      type="button"
    >
      {theme === "dark" ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
    </button>
  );
};

export default ThemeToggle;
