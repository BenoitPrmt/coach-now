import {cn} from "~/lib/utils";
import {motion} from "motion/react";
import {useMemo, useState} from "react";
import {MarsIcon, VenusIcon, XIcon} from "lucide-react";
import {Button} from "~/components/ui/button";
import type {Gender, Level} from "~/types";
import {formatGender} from "~/lib/formatting";
import CoachBadge from "~/components/CoachCard/CoachBadge";

interface UserInfoProps {
    profilePictureUrl: string;
    name: string;
    age: number;
    gender: Gender
    isModal?: boolean;
}

const UserInfo = (
    {
        profilePictureUrl,
        name,
        age,
        gender,
        isModal = false
    }: UserInfoProps) => {

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
                <XIcon className="inline w-4 h-4 mr-1"/>
                    {formatGender(gender)}
            </span>;
        }
    }, [gender])

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

interface DescriptionProps {
    levels: Level[];
    sports: string[];
    isModal?: boolean;
}

const Description = ({levels, sports, isModal = false}: DescriptionProps) => {
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

interface CoachCardProps {
    coach: {
        profilePictureUrl: string;
        name: string;
        age: number;
        gender: Gender;
        sports: string[];
        levels: Level[];
    }
    className?: string;
}

const CoachCard = ({
                       coach: {
                           profilePictureUrl,
                           name,
                           age,
                           gender,
                           sports,
                           levels
                       },
                       className
                   }: CoachCardProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleCardClick = () => {
        setIsOpen(true);
    };

    const handleCloseModal = () => {
        setIsOpen(false);
    };

    return (
        <>
            {/* Card normale */}
            <motion.div
                className={cn(
                    "flex-col w-full sm:max-w-sm p-2 bg-neutral-100 dark:bg-neutral-800 rounded-xl flex gap-2 cursor-pointer hover:scale-[1.02] active:scale-[1.0] transition-transform duration-200 ease-out",
                    className
                )}
                onClick={handleCardClick}
                whileHover={{scale: 1.02}}
                whileTap={{scale: 1.0}}
            >
                <motion.div>
                    <UserInfo profilePictureUrl={profilePictureUrl} name={name} age={age} gender={gender}/>
                </motion.div>

                <motion.div
                    className="bg-neutral-50 dark:bg-neutral-700 border border-neutral-400/20 border-dashed rounded-md shadow-2xs flex flex-col gap-2 p-4 h-full"
                >
                    <Description levels={levels} sports={sports}/>
                </motion.div>
            </motion.div>

            {/* Modal */}
            {isOpen && (
                <motion.div
                    className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center p-4"
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    exit={{opacity: 0}}
                    onClick={handleCloseModal}
                >
                    {/* Modal Content */}
                    <motion.div
                        className="bg-neutral-100 dark:bg-neutral-800 rounded-2xl p-6 w-full max-w-md relative "
                        onClick={(e) => e.stopPropagation()}
                        initial={{scale: 0.9}}
                        animate={{scale: 1}}
                        exit={{scale: 0.9}}
                        transition={{type: "spring", damping: 25, stiffness: 300}}
                    >
                        {/* Bouton de fermeture */}
                        <button
                            onClick={handleCloseModal}
                            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center hover:bg-neutral-300 dark:hover:bg-neutral-600 transition-colors z-10 cursor-pointer"
                        >
                            <XIcon
                                className="w-4 h-4 text-neutral-600 dark:text-neutral-300"
                                strokeWidth={2}
                            />
                        </button>

                        {/* Image agrandie en haut */}
                        <motion.div
                            className="mb-6 flex justify-center"
                            initial={{scale: 0.8, opacity: 0}}
                            animate={{scale: 1, opacity: 1}}
                            transition={{delay: 0.1}}
                            exit={{scale: 0.8, opacity: 0}}
                        >
                            <img
                                src={profilePictureUrl}
                                alt={name}
                                className="w-24 h-24 rounded-2xl object-cover shadow-lg"
                            />
                        </motion.div>

                        {/* Informations utilisateur */}
                        <motion.div
                            className="text-center mb-6"
                        >
                            <UserInfo
                                profilePictureUrl={profilePictureUrl}
                                name={name}
                                age={age}
                                gender={gender}
                                isModal={true}
                            />
                        </motion.div>

                        {/* Description agrandie */}
                        <motion.div
                            className="bg-neutral-50 dark:bg-neutral-700 border border-neutral-400/20 border-dashed rounded-md shadow-2xs flex flex-col gap-2 p-6"
                        >
                            <motion.div>
                                <Description levels={levels} sports={sports} isModal={true}/>
                            </motion.div>
                        </motion.div>

                        {/* Actions supplémentaires */}
                        <motion.div
                            className="mt-6 flex gap-3"
                            initial={{opacity: 0, y: 20}}
                            animate={{opacity: 1, y: 0}}
                            transition={{delay: 0.2}}
                            exit={{opacity: 0, y: 20}}
                        >
                            <Button
                                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium h-11 rounded-lg transition-colors cursor-pointer">
                                Réserver
                            </Button>
                            <Button
                                className="flex-1 bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-600 text-neutral-700 dark:text-neutral-200 font-medium h-11 rounded-lg transition-colors cursor-pointer">
                                Voir profil
                            </Button>
                        </motion.div>
                    </motion.div>
                </motion.div>
            )}
        </>
    );
};

export default CoachCard;