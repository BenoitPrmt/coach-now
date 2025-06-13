import {useLocalStorage} from "~/hooks/useLocalStorage";
import {useEffect} from "react";

type ThemeType = "light" | "dark" | "system";

export const useTheme = () => {
    const [theme, setTheme] = useLocalStorage<ThemeType>("theme-coach-now", "light");

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    };

    useEffect(() => {
        const htmlElement = document.documentElement;
        if (theme === "dark") {
            htmlElement.classList.add("dark");
            htmlElement.classList.remove("light");
        } else if (theme === "light") {
            htmlElement.classList.add("light");
            htmlElement.classList.remove("dark");
        } else {
            const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
            htmlElement.classList.toggle("dark", isDarkMode);
            htmlElement.classList.toggle("light", !isDarkMode);
        }
    }, [theme]);

    return {
        theme,
        setTheme,
        toggleTheme,
    };
}