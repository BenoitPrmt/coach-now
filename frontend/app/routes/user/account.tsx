import React, {useEffect, useState} from 'react';
import {useUser} from "~/hooks/useUser";
import Loader from "~/components/Loader";
import type {User} from "~/types";
import {getPublicEnv} from "../../../env.common";

const Account = () => {
    const {user, userToken, isLoading} = useUser();
    const [userProfile, setUserProfile] = useState<User | null>(null);
    const [userProfileLoading, setUserProfileLoading] = useState(true);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                console.log("Fetching user profile for user:", user);
                setUserProfileLoading(true);
                const res = await fetch(`${getPublicEnv(import.meta.env).VITE_API_URL}/user/${user?.id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${userToken}`,
                    }
                });
                if (!res.ok) {
                    throw new Error('Failed to fetch user profile');
                }
                const data = await res.json();
                setUserProfile(data);
            } catch (error) {
                console.error('Error fetching user profile:', error);
            } finally {
                setUserProfileLoading(false);
            }
        }
        fetchUserProfile()
    }, [userToken]);

    if (isLoading) return <Loader/>
    if (userProfileLoading) return <Loader/>
    if (!userProfileLoading && !userProfile) {
        return (
            <div>
                <h1 className="text-2xl font-bold mb-4">Mon compte</h1>
                <p className="text-red-500">Votre profil n'est pas disponible.</p>
            </div>
        );
    }
    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Mon compte</h1>
            <p className="text-gray-700">
                Bienvenue, {userProfile?.firstName} {userProfile?.lastName}!
            </p>
        </div>
    );
};

export default Account;
