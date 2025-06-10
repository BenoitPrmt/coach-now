import {motion} from "motion/react";
import {CircleUserIcon, XIcon} from "lucide-react";
import {Button} from "~/components/ui/button";
import {Link} from "react-router";
import {cn} from "~/lib/utils";
import type {Coach, Gender} from "~/types";
import {formatGender} from "~/lib/formatting";
import {MarsIcon, VenusIcon, XIcon as XIcon2} from "lucide-react";
import {useMemo} from "react";
import {Description} from "~/components/Coach/CoachCard";
import CoachImage from "../CoachImage";
import {Booking} from "~/components/Booking/booking";
import {calculateAgeFromBirthdate} from "~/lib/calculations";

interface CoachModalProps {
    isOpen: boolean;
    onClose: () => void;
    coach: Coach;
    showBookingButton?: boolean;
    showProfileButton?: boolean;
    className?: string;
}

const UserInfo = ({
                      profilePictureUrl,
                      name,
                      age,
                      gender,
                      hourlyRate,
                      isModal = false
                  }: {
    profilePictureUrl: string;
    name: string;
    age: number;
    gender: Gender;
    hourlyRate?: number;
    isModal?: boolean;
}) => {
    const renderGenderSpan = useMemo(() => {
        switch (gender) {
            case "FEMALE":
                return <span className="text-pink-500 flex items-center">
          <VenusIcon className="inline w-4 h-4 mr-1"/>
                    {formatGender(gender)}
        </span>;
            case "MALE":
                return <span className="text-blue-500 flex items-center">
          <MarsIcon className="inline w-4 h-4 mr-1"/>
                    {formatGender(gender)}
        </span>;
            default:
                return <span className="text-neutral-500 flex items-center">
          <XIcon2 className="inline w-4 h-4 mr-1"/>
                    {formatGender(gender)}
        </span>;
        }
    }, [gender]);

    return (
        <div className={cn("flex items-center gap-3", isModal && "mb-4 justify-center")}>
            <CoachImage
                src={profilePictureUrl}
                alt={name}
                animateOnHover={isModal}
                className={cn(
                    "rounded-lg object-cover shadow-2xs ml-2 mt-2",
                    isModal ? "hidden" : "w-14 h-14"
                )}
            />
            <div className="flex flex-col">
                <motion.h6
                    className={cn(
                        "font-semibold text-neutral-900 dark:text-neutral-200 text-lg"
                    )}
                >
                    {name}
                </motion.h6>
                <motion.p
                    className={cn(
                        "inline-flex text-neutral-500 dark:text-neutral-400 items-center gap-1 text-sm",
                        isModal && "mx-auto"
                    )}
                >
                    {age} ans | {renderGenderSpan} | {hourlyRate ? `${hourlyRate} €/h` : "Tarif non défini"}
                </motion.p>
            </div>
        </div>
    );
};

const CoachModal = ({
                        isOpen,
                        onClose,
                        coach,
                        showBookingButton = true,
                        showProfileButton = true,
                        className
                    }: CoachModalProps) => {
    if (!isOpen) return null;

    return (
        <motion.div
            className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center p-4"
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            onClick={(e) => {
                if (e.target === e.currentTarget) onClose();
            }}
        >
            <motion.div
                className={cn(
                    "bg-neutral-100 dark:bg-neutral-800 rounded-2xl p-6 w-full max-w-md relative",
                    className
                )}
                onClick={(e) => e.stopPropagation()}
                initial={{scale: 0.9}}
                animate={{scale: 1}}
                exit={{scale: 0.9}}
                transition={{type: "spring", damping: 25, stiffness: 300}}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 w-8 h-8 rounded-full bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center hover:bg-neutral-300 dark:hover:bg-neutral-600 transition-colors z-10 cursor-pointer"
                >
                    <XIcon
                        className="w-4 h-4 text-neutral-600 dark:text-neutral-300"
                        strokeWidth={2}
                    />
                </button>

                <motion.div
                    className="mb-6 flex justify-center"
                    initial={{scale: 0.8, opacity: 0}}
                    animate={{scale: 1, opacity: 1}}
                    transition={{delay: 0.1}}
                    exit={{scale: 0.8, opacity: 0}}
                >
                    <CoachImage
                        animateOnHover
                        src={coach.profilePictureUrl}
                        alt={coach.user.firstName + ' ' + coach.user.lastName}
                    />
                </motion.div>

                <motion.div className="text-center mb-6">
                    <UserInfo
                        profilePictureUrl={coach.profilePictureUrl}
                        name={coach.user.firstName + ' ' + coach.user.lastName}
                        age={calculateAgeFromBirthdate(coach.birthdate)}
                        gender={coach.gender}
                        hourlyRate={coach.hourlyRate}
                        isModal={true}
                    />
                </motion.div>

                {
                    (coach.levels.length > 0 || coach.sports.length > 0) && (
                        <motion.div
                            className="bg-neutral-50 dark:bg-neutral-700 border border-neutral-400/20 border-dashed rounded-md shadow-2xs flex flex-col gap-2 p-6">
                            <motion.div>
                                <Description levels={coach.levels} sports={coach.sports} isModal={true}/>
                            </motion.div>
                        </motion.div>
                    )
                }

                {(showBookingButton || showProfileButton) && (
                    <motion.div
                        className="mt-6 flex gap-3"
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{delay: 0.2}}
                        exit={{opacity: 0, y: 20}}
                    >
                        {showBookingButton && (
                            <Booking coach={coach}
                                     buttonClassName="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium h-11 rounded-lg transition-colors cursor-pointer"/>
                        )}
                        {showProfileButton && (
                            <Button
                                className="flex-1 bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-600 text-neutral-700 dark:text-neutral-200 font-medium h-11 rounded-lg transition-colors cursor-pointer"
                                asChild
                            >
                                <Link to={`/coach/${coach.id}`}>
                                    <CircleUserIcon/>
                                    Voir le profil
                                </Link>
                            </Button>
                        )}
                    </motion.div>
                )}
            </motion.div>
        </motion.div>
    );
};

export default CoachModal;
