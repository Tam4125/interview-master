import {initializeApp, getApps, cert} from "firebase-admin/app";
import {getAuth} from "firebase-admin/auth";
import {getFirestore} from "firebase-admin/firestore";
import {FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY, FIREBASE_PROJECT_ID, FIREBASE_STORAGE_BUCKET} from "../config/env.js";
import {getStorage} from "firebase-admin/storage";

const initFirebaseAdmin = () => {
    const apps = getApps();

    if (!apps.length) {
        initializeApp({
            credential: cert({
                projectId: FIREBASE_PROJECT_ID,
                clientEmail: FIREBASE_CLIENT_EMAIL,
                privateKey: FIREBASE_PRIVATE_KEY?.replace(/\\n/g, ''),
            }),
            storageBucket: FIREBASE_STORAGE_BUCKET,
        });
    }

    return {
        auth: getAuth(),
        db: getFirestore(),
        storage: getStorage().bucket(),
    }
}

export const {auth, db, storage} = initFirebaseAdmin();