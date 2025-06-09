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

export const links: Route.LinksFunction = () => [
    {rel: "preconnect", href: "https://fonts.googleapis.com"},
    {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
    },
    {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
    },
];

export function Layout({children}: { children: ReactNode }) {
    return (
        <html lang="fr" className="scroll-smooth">
        <head>
            <meta charSet="utf-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            <Meta/>
            <Links/>
        </head>
        <body className="min-h-screen flex flex-col bg-slate-900 text-white antialiased">
        <Header/>
        <main className="flex-1">
            {children}
            <ScrollRestoration/>
            <Scripts/>
        </main>
        <Footer/>
        </body>
        </html>
    );
}

export default function App() {
    return <Outlet/>;
}

export function ErrorBoundary({error}: Route.ErrorBoundaryProps) {
    let message = "Oops!";
    let details = "Une erreur inattendue s'est produite.";
    let stack: string | undefined;

    if (isRouteErrorResponse(error)) {
        message = error.status === 404 ? "404" : "Erreur";
        details =
            error.status === 404
                ? "La page demandée est introuvable."
                : error.statusText || details;
    } else if (import.meta.env.DEV && error && error instanceof Error) {
        details = error.message;
        stack = error.stack;
    }

    return (
        <main className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-4">
            <div className="max-w-2xl mx-auto text-center">
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8">
                    <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent">
                        {message}
                    </h1>
                    <p className="text-xl text-slate-400 mb-6">{details}</p>
                    {stack && (
                        <pre className="w-full p-4 overflow-x-auto bg-slate-900/50 rounded-lg text-left text-sm text-slate-300">
                            <code>{stack}</code>
                        </pre>
                    )}
                </div>
            </div>
        </main>
    );
}