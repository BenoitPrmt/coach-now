import type {Rating} from "~/types";

export const calculateAgeFromBirthdate = (birthdate: string): number => {
    const birthDateObj = new Date(birthdate);
    const today = new Date();
    let age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDiff = today.getMonth() - birthDateObj.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDateObj.getDate())) {
        age--;
    }

    return age;
}

export const calculateAverageRating = (ratings: Rating[]): number => {
    const totalRatings = ratings.reduce((acc, rating) => acc + rating.rating, 0);
    return totalRatings / ratings.length || 0;
}