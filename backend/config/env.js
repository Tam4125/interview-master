import {config} from 'dotenv';

config({path: `.env.${process.env.NODE_ENV || 'development'}.local`});

export const {
    PORT,
    SERVER_URL,
    NODE_ENV,
    DB_URI,
    JWT_SECRET, JWT_EXPIRES_IN,
    SESSION_DURATION = 60 * 60 * 24 * 7,
    GOOGLE_GEMINI_API_KEY,
    EXPRESS_PUBLIC_VAPI_WEB_TOKEN,
    FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY, FIREBASE_STORAGE_BUCKET,

} = process.env;