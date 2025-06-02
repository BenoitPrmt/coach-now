import {cn} from "~/lib/utils";
import {motion, AnimatePresence} from "motion/react";
import {useState} from "react";
import {XIcon} from "lucide-react";
import {Button} from "~/components/ui/button";

interface UserInfoProps {
    avatar: string;
    name: string;
    position: string;
    isModal?: boolean;
}

const UserInfo = ({avatar, name, position, isModal = false}: UserInfoProps) => {
    return (
        <div className={cn("flex items-center gap-3", isModal && "mb-4")}>
            <motion.img
                src={avatar}
                alt={name}
                className={cn(
                    "rounded-lg object-cover shadow-2xs",
                    isModal ? "w-16 h-16" : "w-10 h-10"
                )}
                layout
            />
            <div className="flex flex-col">
                <motion.h6
                    className={cn(
                        "font-semibold text-neutral-900 dark:text-neutral-200",
                        isModal ? "text-lg" : "text-sm"
                    )}
                    layout
                >
                    {name}
                </motion.h6>
                <motion.p
                    className={cn(
                        "text-neutral-500 dark:text-neutral-400",
                        isModal ? "text-sm" : "text-xs"
                    )}
                    layout
                >
                    {position}
                </motion.p>
            </div>
        </div>
    );
};

interface DescriptionProps {
    message: string;
    isModal?: boolean;
}

const Description = ({message, isModal = false}: DescriptionProps) => {
    return (
        <motion.p
            className={cn(
                "text-neutral-700 dark:text-neutral-300 leading-5",
                isModal ? "text-base" : "text-sm"
            )}
            layout
        >
            {message}
        </motion.p>
    );
};

interface CoachCardProps {
    coach: {
        id: string;
        avatar: string;
        name: string;
        position: string;
        message: string;
    }
    className?: string;
}

const CoachCard = ({
                       coach: {id, avatar, name, position, message},
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
                layoutId={`coach-card-${id}`}
                whileHover={{scale: 1.02}}
                whileTap={{scale: 1.0}}
            >
                <motion.div layoutId={`user-info-${id}`}>
                    <UserInfo avatar={avatar} name={name} position={position}/>
                </motion.div>

                <motion.div
                    className="bg-neutral-50 dark:bg-neutral-700 border border-neutral-400/20 border-dashed rounded-md shadow-2xs flex flex-col gap-2 p-4"
                    layoutId={`description-container-${id}`}
                >
                    <motion.div layoutId={`description-${id}`}>
                        <Description message={message}/>
                    </motion.div>
                </motion.div>
            </motion.div>

            {/* Modal */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center p-4"
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            exit={{opacity: 0}}
                            onClick={handleCloseModal}
                        >
                            {/* Modal Content */}
                            <motion.div
                                className="bg-neutral-100 dark:bg-neutral-800 rounded-2xl p-6 w-full max-w-md mx-auto relative"
                                layoutId={`coach-card-${id}`} // Même layoutId que la card
                                onClick={(e) => e.stopPropagation()}
                                initial={{scale: 0.9}}
                                animate={{scale: 1}}
                                exit={{scale: 0.9}}
                                transition={{type: "spring", damping: 25, stiffness: 300}}
                            >
                                {/* Bouton de fermeture */}
                                <button
                                    onClick={handleCloseModal}
                                    className="absolute top-4 right-4 w-8 h-8 rounded-full bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center hover:bg-neutral-300 dark:hover:bg-neutral-600 transition-colors z-10"
                                >
                                    <XIcon
                                        className="w-4 h-4 text-neutral-600 dark:text-neutral-300"
                                        strokeWidth={2}
                                    />
                                </button>

                                <motion.div
                                    className="mb-6 flex justify-center"
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ delay: 0.1 }}
                                >
                                    <img
                                        src={avatar}
                                        alt={name}
                                        className="w-24 h-24 rounded-2xl object-cover shadow-lg"
                                    />
                                </motion.div>

                                {/* Informations utilisateur */}
                                <motion.div
                                    layoutId={`user-info-${name}`}
                                    className="text-center mb-6"
                                >
                                    <motion.h6
                                        className="text-xl font-bold text-neutral-900 dark:text-neutral-200 mb-1"
                                        layout
                                    >
                                        {name}
                                    </motion.h6>
                                    <motion.p
                                        className="text-neutral-500 dark:text-neutral-400"
                                        layout
                                    >
                                        {position}
                                    </motion.p>
                                </motion.div>

                                {/* Description agrandie */}
                                <motion.div
                                    className="bg-neutral-50 dark:bg-neutral-700 border border-neutral-400/20 border-dashed rounded-md shadow-2xs flex flex-col gap-2 p-6"
                                    layoutId={`description-container-${id}`} // Même container
                                >
                                    <motion.div layoutId={`description-${id}`}> {/* Même layoutId */}
                                        <Description message={message} isModal={true}/>
                                    </motion.div>
                                </motion.div>

                                {/* Actions supplémentaires */}
                                <motion.div
                                    className="mt-6 flex gap-3"
                                    initial={{opacity: 0, y: 20}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: 0.2}}
                                >
                                    <Button
                                        className="flex-1 font-medium rounded-lg transition-colors h-11">
                                        Contacter
                                    </Button>
                                    <Button
                                        variant="secondary"
                                        className="flex-1 font-medium rounded-lg transition-colors h-11">
                                        Voir profil
                                    </Button>
                                </motion.div>
                            </motion.div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default CoachCard;