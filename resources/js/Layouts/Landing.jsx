import React from "react";
import { Link, Head } from "@inertiajs/inertia-react";
import ApplicationLogo from "@/Components/ApplicationLogo.jsx";
import ThemeToggle from "@/Components/ThemeToggle";

function Landing({ children }) {
    return (
        <div className="flex flex-col min-h-screen dark:text-zinc-50">
            <header className="border-b dark:bg-slate-800 dark:border-slate-600">
                <Head title="Welcome" />

                <nav className="flex flex-row items-center p-2">
                    <Link href="/">
                        <ApplicationLogo className="block w-auto text-gray-500 dark:text-zinc-50 h-9" />
                    </Link>

                    <ThemeToggle className="ml-auto" />
                </nav>
            </header>
            <main className="h-full pt-2 bg-gray-100 grow dark:bg-slate-700">
                {children}
                <div className="flex flex-col items-center justify-center gap-1 ">
                    <Link
                        href="/login"
                        className="px-2 py-1 my-2 uppercase bg-red-600 rounded shadow text-zinc-50"
                    >
                        Start Here
                    </Link>
                </div>
            </main>
        </div>
    );
}

export default Landing;
