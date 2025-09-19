"use client";

import {useEffect, useState} from "react";
import {fetchCurrentUser, fetchUserInterviews} from "@/lib/api";

export const useCurrentUser = () => {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadUser = async () => {
            try {
                const data = await fetchCurrentUser();
                setUser(data.user);
            } catch (err) {
                setUser(null);
            } finally {
                setLoading(false);
            }
        }

        loadUser();
    }, []);

    return { user, loading };
}

export const useUserInterviews = () => {
    const [interviews, setInterviews] = useState<Interview[]>([]);

    useEffect(() => {
        const loadInterviews = async () => {
            try {
                const data = await fetchUserInterviews();
                setInterviews(data.interviews);
            } catch (err) {
                setInterviews([]);
            }
        }

        loadInterviews();
    }, [])

    return interviews;
}