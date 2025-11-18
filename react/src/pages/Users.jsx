import React, { useState, useEffect } from "react"; // ← добавили useState и useEffect
import axiosClient from "../axios-client";
import { Link } from "react-router-dom"; // ← импортируем Link для навигации
// import "../index.css"; // ← импортируем стили
import { useStateContext } from "../contexts/ContextProvider";

export default function Users() {
    const [user, setUser] = useState([]); // ← исправлено: useState возвращает массив [state, setter]
    const [loading, setLoading] = useState(false); // ← то же самое
    const { setNotification } = useStateContext();

    useEffect(() => {
        getUsers();
    }, []); // ← добавили [] чтобы запрос был один раз при загрузке

    const onDelete = (id) => {
        if (!window.confirm("Are you sure you want to delete this user?")) {
            return;
        }
        setLoading(true);
        axiosClient
            .delete(`/users/${id}`)
            .then(() => {
                setLoading(false);
                setNotification("The user deleted seccessfully");
                getUsers(); // ← обновляем список пользователей после удаления
            })
            .catch((err) => {
                console.error("An error occurred while deleting user:", err);
                setLoading(false);
            });
    };

    const getUsers = () => {
        setLoading(true);
        axiosClient
            .get("/users")
            .then(({ data }) => {
                setLoading(false);
                setUser(data.data); // ← раскомментируй, если нужно сохранять пользователей
            })
            .catch((err) => {
                console.error("An error occurred while fetching users:", err);
                setLoading(false);
            });
    };

    return (
        <div>
            <div className="flex items-center justify-between w-full px-4">
                <h1 className="text-xl font-bold">Users Page</h1>
                <Link
                    to="/users/new"
                    className="px-4 py-2 bg-[#00a762] text-white rounded"
                >
                    Add new
                </Link>
            </div>
            <div className="card animated fadeInDown">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Full Name</th>
                            <th>Email</th>
                            <th>Create date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    {loading && (
                        <tbody>
                            <tr>
                                <td colSpan="5" className="text-center">
                                    Loading...
                                </td>
                            </tr>
                        </tbody>
                    )}
                    {!loading && (
                        <tbody>
                            {user.map((u) => (
                                <tr key={u.id}>
                                    <td>{u.id}</td>
                                    <td>{u.first_name + " " + u.last_name}</td>
                                    <td>{u.email}</td>
                                    <td>
                                        {new Date(
                                            u.created_at
                                        ).toLocaleDateString()}
                                    </td>
                                    <td>
                                        <Link
                                            to={`/users/${u.id}`}
                                            className="px-4 py-2 bg-[#5b08a7] text-white rounded"
                                        >
                                            Edit
                                        </Link>
                                        &nbsp;
                                        <Link
                                            onClick={() => onDelete(u.id)}
                                            className="px-4 py-2 bg-[#b72424] text-white rounded"
                                        >
                                            Delete
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    )}
                </table>
            </div>
        </div>
    );
}
