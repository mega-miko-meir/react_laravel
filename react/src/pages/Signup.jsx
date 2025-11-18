import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import { useStateContext } from "../contexts/ContextProvider.jsx";
import axiosClient from "../axios-client";
import "../index.css";

export default function Signup() {
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmationRef = useRef();
    const [errors, setErrors] = useState(null);

    const { setUser, setToken } = useStateContext();

    const onSubmit = (ev) => {
        ev.preventDefault();
        const payload = {
            first_name: firstNameRef.current.value,
            last_name: lastNameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirm: passwordConfirmationRef.current.value,
        };

        console.log("Login form submitted", payload);

        axiosClient
            .post("/signup", payload)
            .then(({ data }) => {
                setUser(data.user);
                setToken(data.token);
            })
            .catch((err) => {
                console.log(err);
                const response = err.response;
                if (response && response.status === 422) {
                    console.log(response.data.errors);
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
                    <h1 className="title">Sign up for free</h1>
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
                        ref={firstNameRef}
                        type="text"
                        name="name"
                        placeholder="First name"
                    />
                    <input
                        ref={lastNameRef}
                        type="text"
                        name="name"
                        placeholder="Last name"
                    />
                    <input
                        ref={emailRef}
                        type="email"
                        name="email"
                        placeholder="Email Address"
                    />
                    <input
                        ref={passwordRef}
                        type="password"
                        placeholder="Password"
                    />
                    <input
                        ref={passwordConfirmationRef}
                        type="password"
                        placeholder="Password confirmation"
                    />
                    <button className="btn btn-block">Signup</button>
                    <p className="message">
                        Already Registered? <Link to="/login">Sign in</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}
