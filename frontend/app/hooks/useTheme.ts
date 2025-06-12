import {useLocalStorage} from "~/hooks/useLocalStorage";
import {useEffect} from "react";

export const useTheme = () => {
    const [theme, setTheme] = useLocalStorage("theme-coach-now", "light");

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    };

    useEffect(() => {
        const htmlElement = document.documentElement;
        if (theme === "dark") {
            htmlElement.classList.add("dark");
            htmlElement.classList.remove("light");
        } else {
            htmlElement.classList.add("light");
            htmlElement.classList.remove("dark");
        }
    }, [theme]);

    return {
        theme,
        setTheme,
        toggleTheme,
    };
}