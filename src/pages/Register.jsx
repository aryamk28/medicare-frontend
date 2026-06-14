import { useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

function Register() {

    const navigate = useNavigate();

    const [form, setForm] = useState({

        name: "",
        email: "",
        phone: "",
        gender: "",
        age: "",
        password: ""

    });

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

            await API.post(
                "/patients",
                form
            );

            setSuccess(true);

            setTimeout(() => {

                navigate("/login");

            }, 2000);

            setForm({

                name: "",
                email: "",
                phone: "",
                gender: "",
                age: "",
                password: ""

            });

        } catch (error) {

            console.log(error);

            alert("Registration Failed");
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
                                Registration Successful
                            </h2>

                            <p>
                                Your account has been created successfully.
                            </p>

                        </div>

                    </div>
                )}

                <form
                    className="auth-form"
                    onSubmit={handleSubmit}
                >

                    <h2>Create Account</h2>

                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={form.name}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="text"
                        name="phone"
                        placeholder="Phone Number"
                        value={form.phone}
                        onChange={handleChange}
                        required
                    />

                    <select
                        name="gender"
                        value={form.gender}
                        onChange={handleChange}
                        className="premium-select"
                        required
                    >

                        <option value="">
                            Select Gender
                        </option>

                        <option value="Male">
                            Male
                        </option>

                        <option value="Female">
                            Female
                        </option>

                        <option value="Other">
                            Other
                        </option>

                    </select>

                    <input
                        type="number"
                        name="age"
                        placeholder="Age"
                        value={form.age}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                        required
                    />

                    <button type="submit">
                        Create Account
                    </button>

                    <br />
                    <br />

                    <p className="auth-switch">
                        Already have an account?
                        <Link to="/login">
                            {" "}Login
                        </Link>
                    </p>

                </form>

            </div>
        </>
    );
}

export default Register;