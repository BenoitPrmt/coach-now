import {Link} from "react-router";

const Error404 = () => {
    return (
        <div className="flex flex-col items-center justify-center md:mt-32">
            <h1 className="text-6xl font-bold text-red-600">404</h1>
            <p className="mt-4 text-xl text-gray-700">Cette page n'existe pas</p>
            <Link to="/" className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                Retour à l'accueil
            </Link>
        </div>
    );
};

export default Error404;
