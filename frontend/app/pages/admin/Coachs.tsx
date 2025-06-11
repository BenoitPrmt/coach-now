import {CoachFormModal} from "~/components/Admin/Coach/CoachFormModal";
import {CoachsTable} from "~/components/Admin/Coach/Table/CoachsTable";

const CoachsPage = () => {
    return (
        <div>
            <div className="flex flex-row justify-between items-center px-4 py-2">
                <h1 className="text-2xl font-bold">Gestion des coachs</h1>
                <CoachFormModal mode="create" />
            </div>
            <div className="flex pt-5 items-center justify-center">
                <CoachsTable />
            </div>
        </div>
    );
};

export default CoachsPage;