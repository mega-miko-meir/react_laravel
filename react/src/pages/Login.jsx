import React from "react";
import { Link } from "react-router-dom";
import "../index.css";
import { useState, useRef } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios-client";

export default function Login() {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const [errors, setErrors] = useState(null);
    const { setUser, setToken } = useStateContext();

    const onSubmit = (ev) => {
        ev.preventDefault();
        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };
        console.log("Login form submitted", payload);

        axiosClient
            .post("/login", payload)
            .then(({ data }) => {
                setUser(data.user);
                setToken(data.token);
                localStorage.setItem("ACCESS_TOKEN", data.token);
            })
            .catch((err) => {
                const response = err.response;
                if (response && response.status === 422) {
                    setErrors(response.data.errors);
                } else {
                    // console.error("An error occurred while signing up.");
                    console.log(response.data.errors);
                }
            });
    };

    return (
        <div className="login-signup-form animated fadeIn">
            <div className="form">
                <form onSubmit={onSubmit}>
                    <h1 className="title">Login into your account</h1>
                    {errors && (
                        <div className="alert">
                            <ul>
                                {Object.keys(errors).map((key) => (
                                    <li key={key}>{errors[key][0]}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                    <input
                        ref={emailRef}
                        type="email"
                        name="email"
                        placeholder="Email"
                    />
                    <input
                        ref={passwordRef}
                        type="password"
                        placeholder="Password"
                    />
                    <button className="btn btn-block">Login</button>
                    <p className="message">
                        Not Registered?{" "}
                        <Link to="/signup">Create an account</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}
