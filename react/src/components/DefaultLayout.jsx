import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import "../index.css";
import { useEffect } from "react";
import axios from "axios";
import axiosClient from "../axios-client";
import Aside from "./Aside";

export default function DefaultLayout() {
    const { user, token, setUser, setToken, notification } = useStateContext();
    if (!token) {
        return <Navigate to={"/login"} />;
    }

    const onClickLogout = (ev) => {
        ev.preventDefault();

        axiosClient.post("/logout").then(() => {
            setUser({});
            setToken(null);
            localStorage.removeItem("ACCESS_TOKEN");
            console.log("Logged out successfully");
        });
    };

    useEffect(() => {
        axiosClient
            .get("/user")
            .then(({ data }) => {
                setUser(data);
            })
            .catch((err) => {
                console.error("Failed to fetch user data", err);
                if (err.response && err.response.status === 401) {
                    // Handle unauthorized access, e.g., redirect to login
                    console.log("Unauthorized access, redirecting to login");
                }
            });
    }, []);

    return (
        <div className="flex">
            <Aside />
            {notification && <div className="notification">{notification}</div>}
            <div className="ml-64 flex-1 min-h-screen bg-gray-100">
                <header className="bg-white shadow p-4 flex justify-between items-center">
                    <div>Header</div>
                    <div className="flex items-center">
                        <div className="mr-4">
                            {user.first_name + " " + user.last_name}
                        </div>
                        <a
                            href="logout"
                            onClick={onClickLogout}
                            className="btn-logout"
                        >
                            Logout
                        </a>
                    </div>
                </header>
                <main className="p-4">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
