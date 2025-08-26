import {create} from "zustand";


export type ThemeStore = {
    theme: string;
    toggleTheme: () => void;
};

const themeStore = create<ThemeStore>(
    (set) => ({
        theme: "light", // Default theme
        toggleTheme: () =>
            set((state) => ({
                theme: state.theme === "light" ? "dark" : "light",
            })),
    })
);

export default themeStore;