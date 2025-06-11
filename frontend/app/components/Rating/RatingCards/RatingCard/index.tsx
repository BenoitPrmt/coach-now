import type {Rating} from "~/types";
import {motion} from "motion/react";
import {Link} from "react-router";
import {FaClock} from "react-icons/fa";
import {timeAgo} from "~/lib/time";
import RatingStar from "~/components/Rating/RatingCards/RatingCard/RatingStar";

type Props = {
    rating: Rating
    coachPage?: boolean;
}

const RatingCard = ({rating, coachPage}: Props) => {
    return (
        <div
            className="bg-white dark:bg-neutral-700 p-4 rounded-lg shadow-sm max-h-1/2 overflow-y-auto"
        >
            {
                (rating.comment && rating.comment.length > 0) && (
                    <motion.div
                        className="bg-gray-50 dark:bg-neutral-600 rounded-lg p-2"
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        transition={{delay: 0.2}}
                    >
                        <p className="text-sm text-gray-700 dark:text-gray-300 italic">
                            "{rating.comment}"
                        </p>
                    </motion.div>
                )
            }
            <div
                className="flex flex-col text-sm text-neutral-500 dark:text-neutral-400 mt-2">
                {
                    rating.user && (
                        <Link
                            to={`/user/${rating.user.id}`}
                            className="text-blue-500 hover:underline"
                        >
                            {rating.user.firstName} {rating.user.lastName}
                        </Link>
                    )
                }
                <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-2">
                        {
                            rating.coach && !coachPage && (
                                <Link
                                    to={`/coach/${rating.coach.id}`}
                                    className="text-blue-500 hover:underline"
                                >
                                    Coach {rating.coach.user.firstName} {rating.coach.user.lastName}
                                </Link>
                            )
                        }
                        <span className="flex items-center gap-2">
                                        <FaClock/>
                            {timeAgo(rating.date)}
                                        </span>
                    </div>
                    <RatingStar
                        value={rating.rating}
                        className="text-lg"
                    />
                </div>
            </div>
        </div>
    );
};

export default RatingCard;
