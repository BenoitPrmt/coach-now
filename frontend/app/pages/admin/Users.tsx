import {UsersTable} from "~/components/Admin/User/UsersTable";
import {UserFormModal} from "~/components/Admin/User/UserFormModal";

const UsersPage = () => {
    return (
        <div>
            <div className="flex flex-row justify-between items-center px-4 py-2">
                <h1 className="text-2xl font-bold">Gestion des utilisateurs</h1>
                <UserFormModal mode="create" />
            </div>
            <div className="flex pt-5 items-center justify-center">
                <UsersTable />
            </div>
        </div>
    );
};

export default UsersPage;