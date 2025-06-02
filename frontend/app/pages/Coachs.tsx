import React from 'react';
import CoachCard from "~/components/CoachCard";

const CoachesPage = () => {
    const coaches = [
        {
            id: "coach-1", // ID unique ajouté
            avatar: "https://example.com/avatar1.jpg",
            name: "Alice Smith",
            position: "Personal Trainer",
            message: "Ready to help you achieve your fitness goals!",
        },
        {
            id: "coach-2", // ID unique ajouté
            avatar: "https://example.com/avatar2.jpg",
            name: "Bob Johnson",
            position: "Yoga Instructor",
            message: "Find your balance and strength with yoga.",
        },
        {
            id: "coach-3", // ID unique ajouté
            avatar: "https://example.com/avatar3.jpg",
            name: "Charlie Brown",
            position: "Nutrition Coach",
            message: "Guiding you towards a healthier lifestyle through nutrition.",
        },
        {
            id: "coach-4", // ID unique ajouté
            avatar: "https://example.com/avatar4.jpg", // Avatar différent aussi
            name: "Charlie Brown Jr.", // Nom différencié
            position: "Nutrition Coach",
            message: "Guiding you towards a healthier lifestyle through nutrition.",
        },
    ];

    return (
        <div className="flex sm:pt-20 items-center justify-center">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
                {coaches.map((coach) => (
                    <CoachCard coach={coach} key={coach.id}/>
                ))}
            </div>
        </div>
    );
};

export default CoachesPage;