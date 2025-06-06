import {motion} from "motion/react";
import {XIcon} from "lucide-react";
import {Button} from "~/components/ui/button";
import {Link} from "react-router";
import {cn} from "~/lib/utils";
import type {Gender, Level} from "~/types";
import {formatGender} from "~/lib/formatting";
import {MarsIcon, VenusIcon, XIcon as XIcon2} from "lucide-react";
import {useMemo} from "react";
import CoachBadge from "~/components/CoachCard/CoachBadge";

interface CoachModalProps {
    isOpen: boolean;
    onClose: () => void;
    coach: {
        id: string;
        profilePictureUrl: string;
        name: string;
        age: number;
        gender: Gender;
        sports: string[];
        levels: Level[];
    };
    showBookingButton?: boolean;
    showProfileButton?: boolean;
    className?: string;
}

const UserInfo = ({
                      profilePictureUrl,
                      name,
                      age,
                      gender,
                      isModal = false
                  }: {
    profilePictureUrl: string;
    name: string;
    age: number;
    gender: Gender;
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
            <motion.img
                src={profilePictureUrl}
                alt={name}
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
                    {age} ans | {renderGenderSpan}
                </motion.p>
            </div>
        </div>
    );
};

const Description = ({levels, sports, isModal = false}: { levels: Level[]; sports: string[]; isModal?: boolean }) => {
    return (
        <motion.p
            className={cn(
                "text-neutral-700 dark:text-neutral-300 leading-5 flex flex-wrap justify-center",
                isModal ? "text-base" : "text-sm"
            )}
            layout
        >
            {levels.length > 0 && (
                levels.map((level, index) => (
                    <CoachBadge value={level} className="mr-1 my-0.5" key={index}/>
                ))
            )}
            {sports.length > 0 && (
                sports.map((sport, index) => (
                    <CoachBadge value={sport} className="mr-1 my-0.5" key={index}/>
                ))
            )}
        </motion.p>
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
            onClick={onClose}
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
                    <img
                        src={coach.profilePictureUrl}
                        alt={coach.name}
                        className="w-24 h-24 rounded-2xl object-cover shadow-lg"
                    />
                </motion.div>

                <motion.div className="text-center mb-6">
                    <UserInfo
                        profilePictureUrl={coach.profilePictureUrl}
                        name={coach.name}
                        age={coach.age}
                        gender={coach.gender}
                        isModal={true}
                    />
                </motion.div>

                <motion.div
                    className="bg-neutral-50 dark:bg-neutral-700 border border-neutral-400/20 border-dashed rounded-md shadow-2xs flex flex-col gap-2 p-6">
                    <motion.div>
                        <Description levels={coach.levels} sports={coach.sports} isModal={true}/>
                    </motion.div>
                </motion.div>

                {(showBookingButton || showProfileButton) && (
                    <motion.div
                        className="mt-6 flex gap-3"
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{delay: 0.2}}
                        exit={{opacity: 0, y: 20}}
                    >
                        {showBookingButton && (
                            <Button
                                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium h-11 rounded-lg transition-colors cursor-pointer"
                            >
                                Réserver
                            </Button>
                        )}
                        {showProfileButton && (
                            <Button
                                className="flex-1 bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-600 text-neutral-700 dark:text-neutral-200 font-medium h-11 rounded-lg transition-colors cursor-pointer"
                                asChild
                            >
                                <Link to={`/coach/${coach.id}`}>
                                    Voir profil
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
