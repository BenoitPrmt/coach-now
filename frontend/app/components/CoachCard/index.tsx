import {cn} from "~/lib/utils";
import {motion} from "motion/react";
import {useMemo, useState} from "react";
import {MarsIcon, VenusIcon, XIcon} from "lucide-react";
import type {Gender, Level} from "~/types";
import {formatGender} from "~/lib/formatting";
import CoachBadge from "~/components/CoachCard/CoachBadge";
import CoachModal from "~/components/CoachModal";

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

export const Description = ({levels, sports, isModal = false}: DescriptionProps) => {
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
        id: string;
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
                       coach,
                       className
                   }: CoachCardProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleCardClick = () => {
        setIsOpen(true);
    };

    return (
        <>
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
                    <UserInfo profilePictureUrl={coach.profilePictureUrl} name={coach.name} age={coach.age}
                              gender={coach.gender}/>
                </motion.div>

                <motion.div
                    className="bg-neutral-50 dark:bg-neutral-700 border border-neutral-400/20 border-dashed rounded-md shadow-2xs flex flex-col gap-2 p-4 h-full"
                >
                    <Description levels={coach.levels} sports={coach.sports}/>
                </motion.div>
            </motion.div>

            <CoachModal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                coach={coach}
            />
        </>
    );
};

export default CoachCard;
