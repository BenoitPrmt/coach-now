import {FaStarHalf, FaStar} from "react-icons/fa";
import {cn} from "~/lib/utils";


const Rating = ({value, className}: { value: number, className?: string }) => {
    const fullStars = Math.floor(value);
    const halfStar = value % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;

    return (
        <div className={cn("flex items-center", className)}>
            {Array(fullStars).fill(<FaStar className="text-yellow-500"/>)}
            {halfStar ? <FaStarHalf className="text-yellow-500"/> : null}
            {Array(emptyStars).fill(<FaStar className="text-gray-300"/>)}
        </div>
    );
}

export default Rating;