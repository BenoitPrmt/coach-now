import {z} from 'zod';
import {makeTypedEnv, publicEnvSchema} from './env.common';

// Add server-side environment variables here.
const envSchema = publicEnvSchema.extend({
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
})

const getEnv = makeTypedEnv(envSchema);

export {getEnv};