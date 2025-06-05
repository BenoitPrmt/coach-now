export const calculateAgeFromBirthdate = (birthdate: string): number => {
    console.log("Calculating age from birthdate:", birthdate);
    const birthDateObj = new Date(birthdate);
    const today = new Date();
    let age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDiff = today.getMonth() - birthDateObj.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDateObj.getDate())) {
        age--;
    }

    console.log("Calculated age:", age);

    return age;
}