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
import { EditIcon, PlusCircleIcon } from "lucide-react";
import {useForm} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import type {Booking, Coach, User} from "~/types";
import { useState, useEffect } from "react";
import { useUser } from "~/hooks/useUser";
import {createBooking, updateBooking} from "~/actions/booking.action";
import {getAllUsers} from "~/actions/user.action";
import {getAllCoachs} from "~/actions/coach.action";

const bookingFormSchema = z.object({
    userId: z.string().min(1, "Veuillez sélectionner un utilisateur"),
    coachId: z.string().min(1, "Veuillez sélectionner un utilisateur"),
    startDate: z.string().min(1, "Veuillez sélectionner une date de début"),
    endDate: z.string().min(1, "Veuillez sélectionner une date de fin"),
    totalPrice: z.number().min(0, "Le prix total doit être supérieur ou égal à 0"),
    isActive: z.boolean(),
});

export type BookingFormData = z.infer<typeof bookingFormSchema>;

type Props = {
    mode: "create" | "edit";
    booking?: Booking;
}

export function BookingFormModal({ mode, booking }: Props) {
    const [open, setOpen] = useState(false);
    const [users, setUsers] = useState<User[]>([]);
    const [coachs, setCoachs] = useState<Coach[]>([]);
    const [loadingUsers, setLoadingUsers] = useState(false);

    const { userToken } = useUser();

    if (mode !== "create" && !booking) {
        throw new Error("Booking is required for edit mode");
    }

    const form = useForm<BookingFormData>({
        resolver: zodResolver(bookingFormSchema),
        defaultValues: {
            userId: booking?.user?.id || "",
            coachId: booking?.coach?.id || "",
            startDate: booking?.startDate || "",
            endDate: booking?.endDate || "",
            totalPrice: booking?.totalPrice || 0,
            isActive: booking?.isActive || true,
        },
    });

    const fetchUsers = async () => {
        setLoadingUsers(true);
        try {
            getAllUsers(userToken).then((data) => {
                if (data) {
                    setUsers(data.filter((user) => user.role === "USER"));
                } else {
                    console.warn("Aucun utilisateur trouvé");
                }
            })
            getAllCoachs(userToken).then((data) => {
                if (data) {
                    setCoachs(data);
                } else {
                    console.warn("Aucun coach trouvé");
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

    const handleSubmit = async (data: BookingFormData) => {
        console.log("Form data submitted:", data);
        try {
            if (mode === "edit" && booking) {
                await updateBooking(userToken, booking.id, data);
            } else if (mode === "create") {
                await createBooking(userToken, data);
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
                        Créer un booking
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
                            ? "Créer un booking"
                            : `Modifier ${booking?.user?.firstName} ${booking?.user?.lastName}`
                        }
                    </DialogTitle>
                    <DialogDescription>
                        {mode === "create"
                            ? "Remplissez les informations pour créer un nouveau booking."
                            : "Modifiez les informations du booking."
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

                        {mode === "create" && (
                            <FormField
                                control={form.control}
                                name="coachId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Coach</FormLabel>
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
                                                                : "Sélectionner un coach"
                                                        }
                                                    />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {coachs.map((coach) => (
                                                    <SelectItem key={coach.id} value={coach.id}>
                                                        {coach.user.firstName} {coach.user.lastName} - {coach.user.email}
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
                                name="totalPrice"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Prix total (€)</FormLabel>
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
                        </div>

                        {/* startDate and endDate (date picker, data to string) */}
                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="startDate"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Date de début</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="datetime-local"
                                                {...field}
                                                onChange={(e) => field.onChange(e.target.value)}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="endDate"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Date de fin</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="datetime-local"
                                                {...field}
                                                onChange={(e) => field.onChange(e.target.value)}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {mode === "edit" && (
                            <FormField
                                control={form.control}
                                name="isActive"
                                render={({ field }) => (
                                    <FormItem className="flex items-center space-x-2">
                                        <FormControl>
                                            <input
                                                type="checkbox"
                                                checked={field.value}
                                                onChange={(e) => field.onChange(e.target.checked)}
                                                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                            />
                                        </FormControl>
                                        <FormLabel>Actif</FormLabel>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        )}

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