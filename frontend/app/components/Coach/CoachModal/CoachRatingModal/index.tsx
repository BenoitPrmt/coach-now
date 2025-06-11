import type z from "zod";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "~/components/ui/dialog";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "~/components/ui/form";

import {coachReviewSchema} from "~/validation/zod";
import {toast} from "sonner";
import {useCallback, useEffect, useState, useMemo} from "react";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {Star} from "lucide-react";
import {Textarea} from "~/components/ui/textarea";
import {Button} from "~/components/ui/button";
import type {Booking, Rating} from "~/types";
import {getPublicEnv} from "../../../../../env.common";
import {useUser} from "~/hooks/useUser";

const CoachRatingModal = (
    {
        isModalOpen,
        closeRatingModal,
        selectedBooking,
        onRatingSubmitted
    }: {
        isModalOpen: boolean,
        closeRatingModal: () => void,
        selectedBooking: Booking | null;
        onRatingSubmitted?: (newRating: Rating) => void;


    }
) => {
    const {user, userToken} = useUser();
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [hoverRating, setHoverRating] = useState<number | null>(null);

    const coach = selectedBooking?.coach;

    const form = useForm<z.infer<typeof coachReviewSchema>>({
        resolver: zodResolver(coachReviewSchema),
        defaultValues: {
            rating: "",
            comment: "",
        }
    });

    useEffect(() => {
        if (isModalOpen && coach?.id && form.getValues("rating") !== "") {
            form.reset({
                rating: "",
                comment: "",
            });
        }
    }, [isModalOpen, coach?.id]);


    const onSubmit = useCallback(async (values: z.infer<typeof coachReviewSchema>) => {
        if (!values || !coach?.id || !user?.id) {
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await fetch(`${getPublicEnv(import.meta.env).VITE_API_URL}/rating`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userToken}`,
                },
                body: JSON.stringify({
                    coachId: coach.id,
                    userId: user?.id,
                    rating: parseFloat(values.rating),
                    comment: values.comment,
                })
            });

            if (!response.ok) {
                throw new Error('Failed to submit review');
            }

            const newRating = await response.json();

            toast.success("Succès", {
                description: "Votre avis a été enregistré avec succès",
            });

            if (onRatingSubmitted) {
                onRatingSubmitted(newRating);
            }

            setTimeout(() => {
                closeRatingModal();
                setIsSubmitting(false);
            }, 800);

        } catch (error) {
            console.error("Erreur lors de l'ajout de la review:", error);
            toast.error("Erreur", {
                description: "Une erreur est survenue lors de l'enregistrement de votre avis",
            });
            setIsSubmitting(false);
        }
    }, [coach?.id, closeRatingModal, user?.id, userToken]);

    const getRatingText = useMemo(() => {
        const ratingMap: Record<string, string> = {
            "1": "Décevant",
            "2": "Moyen",
            "3": "Bon",
            "4": "Très bon",
            "5": "Excellent"
        };

        return (rating: string | null) => {
            if (!rating) return "";
            return ratingMap[rating] || "";
        };
    }, []);

    const handleDialogChange = useCallback((open: boolean) => {
        if (!open) {
            closeRatingModal();
        }
    }, [closeRatingModal]);

    const handleRatingChange = useCallback((value: string) => {
        form.setValue("rating", value, {
            shouldValidate: true,
            shouldDirty: true
        });
    }, [form]);

    const handleMouseEnter = useCallback((value: number) => {
        setHoverRating(value);
    }, []);

    const handleMouseLeave = useCallback(() => {
        setHoverRating(null);
    }, []);

    const shouldShowModal = useMemo(() => {
        return isModalOpen && coach && selectedBooking;
    }, [isModalOpen, coach, selectedBooking]);

    if (!shouldShowModal) {
        return null;
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={handleDialogChange}>
            <DialogContent className="flex flex-col gap-0 p-0 [&>button:last-child]:top-3.5 max-w-md">
                <DialogHeader className="contents space-y-0 text-left">
                    <DialogTitle className="border-b px-6 py-4 text-base flex justify-between items-center">
                        <div>
                            Vous êtes sur le point de noter :
                            <br/>
                            <span className="text-sm font-medium text-gray-700">
                                {coach?.user.firstName} {coach?.user.lastName}
                            </span>
                        </div>
                    </DialogTitle>
                </DialogHeader>
                <div className="px-6 py-4">
                    <Form {...form}>
                        <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
                            <div className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="rating"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel className="text-foreground text-lg leading-none font-semibold">
                                                Qu&apos;avez-vous pensé de cette séance ?
                                            </FormLabel>
                                            <FormControl>
                                                <div className="flex flex-col items-center gap-2">
                                                    <div className="flex items-center justify-center space-x-1">
                                                        {[1, 2, 3, 4, 5].map((value) => {
                                                            const isActive =
                                                                (
                                                                    hoverRating !== null
                                                                    &&
                                                                    value <= hoverRating
                                                                )
                                                                ||
                                                                (
                                                                    hoverRating === null
                                                                    &&
                                                                    field.value
                                                                    &&
                                                                    value <= parseInt(field.value)
                                                                );
                                                            return (
                                                                <button
                                                                    type="button"
                                                                    key={value}
                                                                    onClick={() => handleRatingChange(value.toString())}
                                                                    onMouseEnter={() => handleMouseEnter(value)}
                                                                    onMouseLeave={handleMouseLeave}
                                                                    className="p-1 transition-all duration-150 cursor-pointer"
                                                                >
                                                                    <Star
                                                                        className={`h-8 w-8 ${
                                                                            isActive
                                                                                ? "fill-yellow-400 text-yellow-500"
                                                                                : "fill-gray-200 text-gray-300"
                                                                        } transition-colors`}
                                                                    />
                                                                </button>
                                                            );
                                                        })}
                                                    </div>
                                                    {(field.value || hoverRating) ? (
                                                        <div className="text-primary font-medium mt-1">
                                                            {getRatingText(hoverRating ? hoverRating.toString() : field.value)}
                                                        </div>
                                                    ) : (
                                                        <div className="text-gray-500 mt-1">Sélectionnez une note</div>
                                                    )}
                                                </div>
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="comment"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel htmlFor="comment">
                                                Pourquoi avez-vous donné cette note ?
                                            </FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    id="feedback"
                                                    placeholder="Partagez votre expérience avec ce coach..."
                                                    aria-label="Avis sur le coach"
                                                    className="min-h-24 resize-none"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <Button
                                type="submit"
                                className="w-full"
                                disabled={isSubmitting || !form.formState.isValid}
                            >
                                {isSubmitting ? "Enregistrement..." : "Enregistrer mon avis"}
                            </Button>
                        </form>
                    </Form>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default CoachRatingModal;