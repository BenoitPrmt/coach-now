import React from 'react';
import CoachCard from "~/components/CoachCard";
import {motion, type Variants} from "motion/react";

const gridTransition: Variants = {
    hidden: {
        opacity: 0,
        y: 20,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.3,
            staggerChildren: 0.1,
        },
    },
}

const gridElementTransition: Variants = {
    hidden: {
        opacity: 0,
        scale: 0.95,
    },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.3,
        },
    },
}

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
        <div className="flex justify-center min-h-screen">
            <div>
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6"
                    initial="hidden"
                    animate="visible"
                    variants={gridTransition}
                >
                    {coaches.map((coach) => (
                        <motion.div
                            key={coach.id}
                            variants={gridElementTransition}
                            className="flex"
                        >
                            <CoachCard coach={coach}/>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default CoachesPage;