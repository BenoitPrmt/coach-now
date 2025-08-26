import type { Level as LevelType } from "~/types";

type Level = {
    name: string;
    key: LevelType;
}

const levels: Level[] = [
    {
        name: "Débutant",
        key: "BEGINNER"
    },
    {
        name: "Intermédiaire",
        key: "MEDIUM",
    },
    {
        name: "Haut niveau",
        key: "HIGHLEVEL",
    }
]

export {levels};
export type { Level };
