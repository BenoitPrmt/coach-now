import React from 'react';
import CoachCard from "~/components/CoachCard";

const CoachesPage = () => {
    const coaches = [
        {
            id: "coach-1",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
            name: "Alice Smith",
            position: "Personal Trainer",
            message: "Ready to help you achieve your fitness goals!",
        },
        {
            id: "coach-2",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
            name: "Bob Johnson",
            position: "Yoga Instructor",
            message: "Find your balance and strength with yoga.",
        },
        {
            id: "coach-3",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
            name: "Charlie Brown",
            position: "Nutrition Coach",
            message: "Guiding you towards a healthier lifestyle through nutrition.",
        },
        {
            id: "coach-4",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
            name: "Charlie Brown Jr.",
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