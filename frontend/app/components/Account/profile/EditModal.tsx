import type {Coach, User, UserRole} from "~/types";
import {useUser} from "~/hooks/useUser";
import React, {useState} from "react";
import {Controller, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {coachProfileSchema, profileSchema} from "~/validation/zod";
import {isOfTypeCoach} from "~/validation/typesValidations";
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from "~/components/ui/dialog";
import {Edit, Save, X} from "lucide-react";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "~/components/ui/form";
import {Input} from "~/components/ui/input";
import {Button} from "~/components/ui/button";
import {z} from "zod";
import {API_URL} from "~/constants/api";
import {BirthdayDateField} from "~/components/Forms/FormFields/form-fields/BirthdayDate";
import { HourlyRateField } from "~/components/Forms/FormFields/form-fields/HourlyRate";
import {MultiSelect} from "~/components/Forms/FormFields/form-fields/Sports";
import {LevelField} from "~/components/Forms/FormFields/form-fields/Levels";
import {ProfilePictureField} from "~/components/Forms/FormFields/form-fields/ProfilPicture";
import {SPORTS_OPTIONS} from "~/constants/search";
import {GenderField} from "~/components/Forms/FormFields/form-fields/GenderField";
import {format} from "date-fns";

type ProfileFormValues = z.infer<typeof profileSchema>;

const ProfileEditModal = ({isOpen, onClose, user, userRole, onProfileUpdate}: {
    isOpen: boolean;
    onClose: () => void;
    user: User | Coach;
    userRole?: UserRole;
    onProfileUpdate: (updatedUser: User | Coach) => void;
}) => {
    const {user: currentUser, userToken} = useUser();

    const coachId: string|null = currentUser && 'coachId' in currentUser ? currentUser.coachId : null;

    const [isSubmitting, setIsSubmitting] = useState(false);

    const isCoach = Boolean(coachId);

    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(isCoach ? coachProfileSchema : profileSchema),
        defaultValues: {
            firstName: isOfTypeCoach(user) ? user.user.firstName : user.firstName,
            lastName: isOfTypeCoach(user) ? user.user.lastName : user.lastName,
            email: isOfTypeCoach(user) ? user.user.email : user.email,
            ...(isCoach && {
                level: isOfTypeCoach(user) ? user.levels : '',
                sports: isOfTypeCoach(user) ? user.sports : '',
                hourlyRate: isOfTypeCoach(user) ? user.hourlyRate : '',
                profilePicture: isOfTypeCoach(user) ? user.profilePictureUrl : '',
                birthDate: isOfTypeCoach(user) ? user.birthdate : '',
            }),
        },
    });

    const onSubmit = async (values: ProfileFormValues) => {
        if (!userToken) return;

        setIsSubmitting(true);

        const formattedBirthDate = values.birthDate
          ? format(values.birthDate, "yyyy-MM-dd")
          : null;

        const { birthDate, ...rest } = values;

        const dataToSend = {
            ...rest,
            ...(coachId && { coachId }),
            ...(formattedBirthDate && { birthDate: formattedBirthDate }),
        };

        console.log("Donnée envoyé", dataToSend)

        try {
            const endpoint = `${API_URL}/${userRole?.toLowerCase()}/${isCoach ? coachId : user.id}`;

            const response = await fetch(endpoint, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userToken}`,
                },
                body: JSON.stringify(dataToSend),
            });

            if (!response.ok) {
                throw new Error('Erreur lors de la mise à jour du profil');
            }

            const updatedUser = await response.json();
            console.log(`Profil mis à jour avec succès:`, updatedUser);
            onProfileUpdate({
                ...updatedUser,
                user: isOfTypeCoach(updatedUser) ? updatedUser.user : {
                    firstName: updatedUser.firstName,
                    lastName: updatedUser.lastName,
                    email: updatedUser.email
                }
            });
            onClose();
            form.reset({
                firstName: isOfTypeCoach(updatedUser) ? updatedUser.user.firstName : updatedUser.firstName,
                lastName: isOfTypeCoach(updatedUser) ? updatedUser.user.lastName : updatedUser.lastName,
                email: isOfTypeCoach(updatedUser) ? updatedUser.user.email : updatedUser.email,
            });
        } catch (error) {
            console.error('Erreur:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="flex items-center space-x-2">
                        <Edit className="w-5 h-5 text-primary"/>
                        <span>Modifier le profil</span>
                    </DialogTitle>
                    <DialogDescription>
                        Modifiez vos informations personnelles. Cliquez sur sauvegarder pour confirmer les changements.
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="firstName"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Prénom</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Votre prénom" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="lastName"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Nom</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Votre nom" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="email"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input type="email" placeholder="votre@email.com" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        {isCoach && (
                          <>
                              <GenderField control={form.control} />

                              <BirthdayDateField control={form.control} />

                              <ProfilePictureField control={form.control} />

                              <HourlyRateField control={form.control} />

                              <Controller
                                control={form.control}
                                name="sports"
                                render={({ field }) => (
                                  <MultiSelect
                                    options={SPORTS_OPTIONS}
                                    value={field.value}
                                    onValueChange={field.onChange}
                                    maxCount={2}
                                    placeholder="Sélectionnez vos sports"
                                  />
                                )}
                              />

                              <LevelField control={form.control} />

                          </>
                        )}

                        <div className="flex justify-end space-x-2 pt-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={onClose}
                                disabled={isSubmitting}
                            >
                                <X className="w-4 h-4 mr-2"/>
                                Annuler
                            </Button>
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="bg-primary hover:bg-primary/90"
                            >
                                <Save className="w-4 h-4 mr-2"/>
                                {isSubmitting ? 'Sauvegarde...' : 'Sauvegarder'}
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default ProfileEditModal;