import {getPublicEnv} from "../../env.common";

export const API_URL = getPublicEnv(import.meta.env).VITE_API_URL;