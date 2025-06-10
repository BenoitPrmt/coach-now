import { sports } from "~/constants/sports";

const FILTER_OPTIONS = [
  { value: 'gender', label: 'Genre' },
  { value: 'sports', label: 'Sport' },
  { value: 'levels', label: 'Niveau' },
  { value: 'hourlyrate_min', label: 'Tarif horaire minimum' },
  { value: 'hourlyrate_max', label: 'Tarif horaire maximum' },
];

const SORT_OPTIONS = [
  { value: 'lastname', label: 'Nom (A-Z)' },
  { value: 'firstname', label: 'Prénom (A-Z)' },
  { value: 'hourlyrate', label: 'Tarif horaire (croissant)' },
  { value: 'hourlyrate_desc', label: 'Tarif horaire (décroissant)' },
  { value: 'gender', label: 'Genre' },
  { value: 'email', label: 'Email (A-Z)' },
];

const SPORTS_OPTIONS = sports.map(sport => ({
  value: sport.key,
  label: sport.name,
}));

const LEVELS_OPTIONS = [
  { value: 'BEGINNER', label: 'Débutant' },
  { value: 'MEDIUM', label: 'Intermédiaire' },
  { value: 'HIGHLEVEL', label: 'Expert' },
];

const GENDER_OPTIONS = [
  { value: 'MALE', label: 'Homme' },
  { value: 'FEMALE', label: 'Femme' },
];


export {
  FILTER_OPTIONS,
  SORT_OPTIONS,
  SPORTS_OPTIONS,
  LEVELS_OPTIONS,
  GENDER_OPTIONS
}
