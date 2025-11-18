import { Navigate, Link, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";

export default function Aside() {
    return (
        <aside className="fixed left-0 top-0 h-full w-64 bg-gray-800 text-white p-4 flex flex-col space-y-4">
            <Link to="/users" className="hover:underline">
                Users
            </Link>
            <Link to="/dashboard" className="hover:underline">
                Dashboard
            </Link>
        </aside>
    );
}
