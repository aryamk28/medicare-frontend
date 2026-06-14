import { useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

function Login() {

    const navigate = useNavigate();

    const [form, setForm] = useState({

        email: "",
        password: ""

    });

    const [error, setError] = useState("");

    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {

        setForm({

            ...form,
            [e.target.name]: e.target.value

        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response = await API.post(
                "/patients/login",
                form
            );

            if (response.data) {

                localStorage.setItem(
                    "hospitalUser",
                    JSON.stringify(response.data)
                );

                localStorage.setItem(
                    "role",
                    response.data.role
                );

                setSuccess(true);

                setError("");

                setTimeout(() => {

                    if (
                        response.data.role === "ADMIN"
                    ) {

                        navigate("/admin");

                    } else {

                        navigate("/");
                    }

                }, 1500);

            } else {

                setError(
                    "Invalid Email or Password"
                );
            }

        } catch (error) {

            console.log(error);

            setError(
                "Invalid Email or Password"
            );

        }
    };

    return (

        <>

            <Navbar />

            <div className="auth-container">

                {success && (

                    <div className="success-popup">

                        <div className="success-box">

                            <h2>
                                Login Successful
                            </h2>

                            <p>
                                Welcome back to Medicare.
                            </p>

                        </div>

                    </div>
                )}

                <form
                    className="auth-form"
                    onSubmit={handleSubmit}
                >

                    <h2>Welcome Back</h2>

                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                        autoComplete="current-password"
                        required
                    />

                    {error && (

                        <p className="error-text">

                            {error}

                        </p>
                    )}

                    <button type="submit">

                        Login

                    </button>

                    <br />
                    <br />

                    <p className="auth-switch">

                        Don't have an account?

                        <Link to="/register">

                            {" "}Register

                        </Link>

                    </p>

                </form>

            </div>

        </>
    );
}

export default Login;