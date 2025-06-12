import type {Coach, User, UserRole} from "~/types";
import {isOfTypeCoach} from "~/validation/typesValidations";
import {motion} from "motion/react";
import {Edit, Mail, User as UserIcon} from "lucide-react";
import {Button} from "~/components/ui/button";
import React from "react";
import UserRoleBadge from "~/components/Account/user/UserRoleBadge";

const UserInfo = ({user, userRole = "USER", onEditClick}: {
    user: User | Coach,
    userRole?: UserRole,
    onEditClick: () => void
}) => {
    let totalBookings = 0;
    let totalRatings = 0;
    if (!isOfTypeCoach(user)) {
        totalBookings = user.bookings?.length || 0;
        totalRatings = user.ratings?.length || 0;
    }
    return (
        <motion.div
            className="flex flex-col items-center space-y-6"
            initial={{opacity: 0, scale: 0.9}}
            animate={{opacity: 1, scale: 1}}
            transition={{duration: 0.6, ease: "easeOut"}}
        >
            <motion.div
                className="relative"
                whileHover={{scale: 1.05}}
                transition={{type: "spring", stiffness: 300}}
            >
                {
                    isOfTypeCoach(user) && userRole === "COACH" ? (
                        <img
                            src={user.profilePictureUrl}
                            alt={`${user.user.firstName} ${user.user.lastName}`}
                            className="w-24 h-24 bg-primary rounded-full object-cover shadow-lg dark:shadow-gray-700"
                        />
                    ) : (
                        <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center shadow-lg dark:shadow-gray-700">
                            <UserIcon className="w-10 h-10 text-white"/>
                        </div>
                    )
                }
                <div
                    className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
            </motion.div>

            <div className="text-center space-y-2">
                <motion.h2
                    className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent"
                    initial={{y: 20, opacity: 0}}
                    animate={{y: 0, opacity: 1}}
                    transition={{delay: 0.2}}
                >
                    {isOfTypeCoach(user)
                        ? `${user.user.firstName} ${user.user.lastName}`
                        : `${user.firstName} ${user.lastName}`}
                </motion.h2>
                <motion.div
                    className="flex items-center justify-center space-x-2 text-gray-600 dark:text-gray-300"
                    initial={{y: 20, opacity: 0}}
                    animate={{y: 0, opacity: 1}}
                    transition={{delay: 0.3}}
                >
                    <Mail className="w-4 h-4"/>
                    <p className="text-sm">
                        {isOfTypeCoach(user) ? user.user.email : user.email}
                    </p>
                </motion.div>
                <UserRoleBadge userRole={userRole}/>
            </div>

            <motion.div
                initial={{y: 30, opacity: 0}}
                animate={{y: 0, opacity: 1}}
                transition={{delay: 0.45}}
            >
                <Button
                    onClick={onEditClick}
                    variant="outline"
                    size="sm"
                    className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-primary/20 dark:border-primary/30 hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-all duration-300 shadow-sm dark:shadow-gray-700 text-gray-900 dark:text-gray-100"
                >
                    <Edit className="w-4 h-4 mr-2"/>
                    Modifier le profil
                </Button>
            </motion.div>

            {
                userRole === 'USER' && (
                    <motion.div
                        className="grid grid-cols-2 gap-4 w-full"
                        initial={{y: 30, opacity: 0}}
                        animate={{y: 0, opacity: 1}}
                        transition={{delay: 0.5}}
                    >
                        <div className="text-center">
                            <div className="text-2xl font-bold text-ring dark:text-ring">{totalBookings}</div>
                            <div className="text-xs text-ring dark:text-ring">Réservations</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{totalRatings}</div>
                            <div className="text-xs text-yellow-600 dark:text-yellow-400">Avis</div>
                        </div>
                    </motion.div>
                )
            }
        </motion.div>
    );
}

export default UserInfo;