import {z} from 'zod';

// Add any public environment variables here.
const publicEnvSchema = z.object({
    VITE_API_URL: z.string().url({message: "VITE_API_URL must be a valid URL"}).default('http://localhost:3000/api'),
})

function makeTypedEnv<T>(schema: { parse: (data: unknown) => T }) {
    return (args: Record<string, unknown>): T => schema.parse(args);
}

const getPublicEnv = makeTypedEnv(publicEnvSchema);

export {publicEnvSchema, makeTypedEnv, getPublicEnv}