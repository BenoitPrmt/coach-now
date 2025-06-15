import {
    isRouteErrorResponse,
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
} from "react-router";

import type {Route} from "./+types/root";
import {Layout as BaseLayout} from "~/components/Layout";
import Header from "app/components/Layout/Header";
import "./app.css";
import type {ReactNode} from "react";
import Footer from "~/components/Layout/Footer";
import {Toaster} from "sonner";
import Error404 from "~/pages/Error404";

export const links: Route.LinksFunction = () => [
    {rel: "preconnect", href: "https://fonts.googleapis.com"},
    {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
    },
    {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap",
    },
];

export function Layout({children}: { children: ReactNode }) {
    return (
        <html lang="fr">
        <head>
            <meta charSet="utf-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            <title>CoachNow</title>
            <Meta/>
            <Links/>
        </head>
        <body className="min-h-screen flex flex-col">
        <Header/>
        <main className="flex-1">
            <BaseLayout>
                {children}
                <ScrollRestoration/>
                <Scripts/>
                <Toaster richColors position="top-right" />
            </BaseLayout>
        </main>
        <Footer/>
        </body>
        </html>
    );
}

export default function App() {
    return (
        <Outlet/>
    );
}

export function ErrorBoundary({error}: Route.ErrorBoundaryProps) {
    if (isRouteErrorResponse(error)) {
        if (error.status === 404) {
            return <Error404 />;
        }
    }

    let message = "Oops!";
    let details = "An unexpected error occurred.";
    let stack: string | undefined;

    if (import.meta.env.DEV && error instanceof Error) {
        details = error.message;
        stack = error.stack;
    }

    return (
        <main className="pt-16 p-4 container mx-auto">
            <h1>{message}</h1>
            <p>{details}</p>
            {stack && (
                <pre className="w-full p-4 overflow-x-auto">
                    <code>{stack}</code>
                </pre>
            )}
        </main>
    );
}

