import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "~/components/ui/alert-dialog"
import { Button } from "~/components/ui/button"
import {TrashIcon} from "lucide-react";
import * as React from "react";
import {useUser} from "~/hooks/useUser";
import {deleteCoach} from "~/actions/coach.action";
import {toast} from "sonner";

type Props = {
    coachId: string;
}

export function CoachDeleteModal({ coachId }: Props) {
    const { userToken } = useUser();

    const handleDeleteCoach = async () => {
        deleteCoach(userToken, coachId).then(() => {
            toast.success("Compte supprimé avec succès");
            window.location.reload();
        }).catch(() => {
            toast.error("Une erreur est survenue lors de la suppression du compte");
        })
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="destructive" size="icon">
                    <TrashIcon className="h-4 w-4" />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Êtes-vous sûr de vouloir supprimer ce compte ?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        Cette action est irréversible et supprimera définitivement toutes les données associées à ce compte.
                        Veuillez confirmer que vous souhaitez continuer.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Annuler</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDeleteCoach} color="destructive">
                        Confirmer la suppression
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
