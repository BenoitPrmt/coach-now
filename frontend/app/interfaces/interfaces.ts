export interface Props {
  control: any;
}

export interface DataRegisterInterface {
  firstName: string;
  lastName: string;
  isCoach: boolean;
  email: string;
  password: string;
}

export interface DataRegisterCoachInterface {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isCoach: boolean;
  gender: string;
  hourlyRate?: number;
  sports?: string[];
  profilePictureUrl?: string;
  birthDate?: Date;
  level?: string;
}