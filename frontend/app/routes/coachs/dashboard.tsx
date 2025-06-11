import {useEffect, useState} from "react";
import {useUser} from "~/hooks/useUser";
import type {Coach} from "~/types";
import {API_URL} from "~/constants/api";

export default function Dashboard() {
    const {user, userToken} = useUser();
    const [userData, setUserData] = useState<Coach | null>(null);

    useEffect(() => {
        if (user && user.coachId && userToken) {
            const fetchUserData = async () => {
                try {
                    const response = await fetch(`${API_URL}/coach/${user.coachId}`, {
                        headers: {
                            "Content-Type": "application/json",
                            "Accept": "application/json",
                            "Authorization": `Bearer ${userToken}`,
                        }
                    });
                    if (!response.ok) {
                        throw new Error("Failed to fetch user data");
                    }

                    const data = await response.json();
                    setUserData(data);
                } catch (error) {
                    console.error("Error fetching user data:", error);
                }
            }

            fetchUserData();
        }
    }, []);

    return (
        <div>
            <h1>Dashboard du coach</h1>
            {userData ? (
                <div>
                    <h2>Bienvenue, {userData.user.firstName} {userData.user.lastName}</h2>
                    <p>Email: {userData.user.email}</p>
                    <p>Spécialités: {userData.sports.join(", ")}</p>
                    <p>Expérience: {userData.levels} ans</p>
                </div>
            ) : (
                <p>Chargement des données du coach...</p>
            )}
        </div>
    );
}
