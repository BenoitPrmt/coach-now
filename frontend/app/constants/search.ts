import {sports} from "~/constants/sports";

const FILTER_OPTIONS = [
    {value: 'gender', label: 'Genre'},
    {value: 'sports', label: 'Sport'},
    {value: 'levels', label: 'Niveau'},
    {value: 'hourlyrate', label: 'Tarif horaire'},
];

const SORT_OPTIONS = [
    {value: 'id', label: 'ID'},
    {value: 'firstname', label: 'Prénom'},
    {value: 'lastname', label: 'Nom'},
    {value: 'email', label: 'Email'},
    {value: 'gender', label: 'Genre'},
    {value: 'hourlyrate', label: 'Tarif horaire'},
];

const SPORTS_OPTIONS = sports.map(sport => ({
    value: sport.key,
    label: sport.name,
}));

const LEVELS_OPTIONS = [
    {value: 'BEGINNER', label: 'Débutant'},
    {value: 'MEDIUM', label: 'Intermédiaire'},
    {value: 'HIGHLEVEL', label: 'Expert'},
];

const GENDER_OPTIONS = [
    {value: 'MALE', label: 'Homme'},
    {value: 'FEMALE', label: 'Femme'},
];


export {
    FILTER_OPTIONS,
    SORT_OPTIONS,
    SPORTS_OPTIONS,
    LEVELS_OPTIONS,
    GENDER_OPTIONS
}