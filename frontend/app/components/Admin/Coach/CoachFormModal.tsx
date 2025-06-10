import { Button } from "~/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "~/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "~/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "~/components/ui/select";
import { Input } from "~/components/ui/input";
import { Checkbox } from "~/components/ui/checkbox";
import { EditIcon, PlusCircleIcon } from "lucide-react";
import {Controller, useForm} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import type { Coach, User, Level, Gender } from "~/types";
import { useState, useEffect } from "react";
import { useUser } from "~/hooks/useUser";
import {createCoach, updateCoach} from "~/actions/coach.action";
import {levels} from "~/constants/levels";
import {sports} from "~/constants/sports";
import type {Sport} from "~/constants/sports";
import {getAllUsers} from "~/actions/user.action";
import {MultiSelect} from "~/components/Forms/FormFields/form-fields/Sports";
import {LevelField} from "~/components/Forms/FormFields/form-fields/Levels";

const SPORTS = sports.map((sport: Sport) => ({
    key: sport.key,
    name: sport.name,
}));

const LEVELS: { key: Level; name: string }[] = levels;

const GENDERS: { key: Gender; name: string }[] = [
    { key: "MALE", name: "Homme" },
    { key: "FEMALE", name: "Femme" },
];

const coachFormSchema = z.object({
    userId: z.string().min(1, "Veuillez sélectionner un utilisateur"),
    birthdate: z.string().min(1, "La date de naissance est requise"),
    profilePictureUrl: z.string().optional(),
    hourlyRate: z
        .number({ required_error: "Le tarif horaire est requis" })
        .min(0, "Le tarif horaire doit être positif")
        .max(1000, "Le tarif horaire ne peut pas dépasser 1000€"),
    sports: z
        .array(z.string())
        .min(1, "Veuillez sélectionner au moins un sport"),
    levels: z
        .array(z.enum(["BEGINNER", "MEDIUM", "HIGHLEVEL"]))
        .min(1, "Veuillez sélectionner au moins un niveau"),
    gender: z.enum(["MALE", "FEMALE"], {
        required_error: "Veuillez sélectionner un genre",
    }),
});

export type CoachFormData = z.infer<typeof coachFormSchema>;

type Props = {
    mode: "create" | "edit";
    coach?: Coach;
}

export function CoachFormModal({ mode, coach }: Props) {
    const [open, setOpen] = useState(false);
    const [users, setUsers] = useState<User[]>([]);
    const [loadingUsers, setLoadingUsers] = useState(false);

    const { userToken } = useUser();

    if (mode !== "create" && !coach) {
        throw new Error("Coach is required for edit mode");
    }

    const form = useForm<CoachFormData>({
        resolver: zodResolver(coachFormSchema),
        defaultValues: {
            userId: coach?.user?.id || "",
            birthdate: coach?.birthdate || "",
            profilePictureUrl: coach?.profilePictureUrl || "",
            hourlyRate: coach?.hourlyRate || 0,
            sports: coach?.sports || [],
            levels: coach?.levels || [],
            gender: coach?.gender || undefined,
        },
    });

    const fetchUsers = async () => {
        setLoadingUsers(true);
        try {
            getAllUsers(userToken).then((data) => {
                if (data) {
                    setUsers(data.filter((user) => user.role === "COACH"));
                } else {
                    console.warn("Aucun utilisateur trouvé");
                }
            })
        } catch (error) {
            console.error("Erreur lors du chargement des utilisateurs:", error);
        } finally {
            setLoadingUsers(false);
        }
    };

    useEffect(() => {
        if (open && mode === "create") {
            fetchUsers();
        }
    }, [open, mode]);

    const handleSubmit = async (data: CoachFormData) => {
        console.log("Form data submitted:", data);
        try {
            if (mode === "edit" && coach) {
                await updateCoach(userToken, coach.id, data);
                console.log("Coach updated successfully");
            } else if (mode === "create") {
                await createCoach(userToken, data);
                console.log("Coach created successfully");
            }

            setOpen(false);
            form.reset();
            window.location.reload();
        } catch (error) {
            console.error("Erreur lors de la soumission:", error);
        }
    };

    const handleOpenChange = (newOpen: boolean) => {
        setOpen(newOpen);
        if (!newOpen) {
            form.reset();
        }
    };

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                {mode === "create" ? (
                    <Button>
                        <PlusCircleIcon className="w-4 h-4 mr-2" />
                        Créer un coach
                    </Button>
                ) : (
                    <Button variant="secondary" size="icon">
                        <EditIcon className="w-4 h-4" />
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>
                        {mode === "create"
                            ? "Créer un coach"
                            : `Modifier ${coach?.user?.firstName} ${coach?.user?.lastName}`
                        }
                    </DialogTitle>
                    <DialogDescription>
                        {mode === "create"
                            ? "Remplissez les informations pour créer un nouveau coach."
                            : "Modifiez les informations du coach."
                        }
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                        {mode === "create" && (
                            <FormField
                                control={form.control}
                                name="userId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Utilisateur</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            value={field.value}
                                            disabled={loadingUsers}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue
                                                        placeholder={
                                                            loadingUsers
                                                                ? "Chargement..."
                                                                : "Sélectionner un utilisateur"
                                                        }
                                                    />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {users.map((user) => (
                                                    <SelectItem key={user.id} value={user.id}>
                                                        {user.firstName} {user.lastName} - {user.email}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        )}

                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="birthdate"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Date de naissance</FormLabel>
                                        <FormControl>
                                            <Input type="date" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="gender"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Genre</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            value={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Sélectionner un genre" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {GENDERS.map((gender) => (
                                                    <SelectItem key={gender.key} value={gender.key}>
                                                        {gender.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="hourlyRate"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Taux horaire (€)</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                min="0"
                                                max="1000"
                                                step="0.01"
                                                placeholder="25.00"
                                                {...field}
                                                onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="profilePictureUrl"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>URL Photo de profil (optionnel)</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="url"
                                                placeholder="https://example.com/photo.jpg"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <Controller
                            control={form.control}
                            name="sports"
                            render={({ field }) => (
                                <MultiSelect
                                    options={sports.map(sport => ({
                                        label: sport.name,
                                        value: sport.key
                                    }))}
                                    value={field.value}
                                    onValueChange={field.onChange}
                                    maxCount={2}
                                    defaultValue={field.value}
                                    placeholder="Sélectionnez vos sports"
                                />
                            )}
                        />

                        <Controller
                            control={form.control}
                            name="levels"
                            render={({ field }) => (
                                <MultiSelect
                                    options={levels.map(level => ({
                                        label: level.name,
                                        value: level.key
                                    }))}
                                    value={field.value}
                                    onValueChange={field.onChange}
                                    maxCount={2}
                                    defaultValue={field.value}
                                    placeholder="Sélectionnez vos niveaux"
                                />
                            )}
                        />

                        <DialogFooter>
                            <DialogClose asChild>
                                <Button type="button" variant="outline">
                                    Annuler
                                </Button>
                            </DialogClose>
                            <Button
                                type="submit"
                                disabled={form.formState.isSubmitting}
                                onClick={() => {
                                    console.log("Button clicked");
                                    console.log("Form values:", form.getValues());
                                    console.log("Form errors:", form.formState.errors);
                                }}
                            >
                                {form.formState.isSubmitting
                                    ? "Enregistrement..."
                                    : mode === "create"
                                        ? "Créer"
                                        : "Modifier"
                                }
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}