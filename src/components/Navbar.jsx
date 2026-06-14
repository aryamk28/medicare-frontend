import { NavLink, Link } from "react-router-dom";

function Navbar() {

    return (

        <nav className="navbar">

            <div className="logo">
                MediCare+
            </div>

            <ul className="nav-links">

                <li>
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            isActive ? "active-nav" : ""
                        }
                    >
                        Home
                    </NavLink>
                </li>

                <li>
                    <NavLink
                        to="/doctors"
                        className={({ isActive }) =>
                            isActive ? "active-nav" : ""
                        }
                    >
                        Doctors
                    </NavLink>
                </li>

                <li>
                    <NavLink
                        to="/appointment"
                        className={({ isActive }) =>
                            isActive ? "active-nav" : ""
                        }
                    >
                        Appointment
                    </NavLink>
                </li>

                <li>
                    <NavLink
                        to="/history"
                        className={({ isActive }) =>
                            isActive ? "active-nav" : ""
                        }
                    >
                        History
                    </NavLink>
                </li>

            </ul>

            <div className="nav-btns">

                <Link to="/login" className="login-btn">
                    Login
                </Link>

                <Link to="/register" className="register-btn">
                    Register
                </Link>
                <Link to="/profile" className="profile-btn">
                    Profile
                </Link>

            </div>

        </nav>

    );
}

export default Navbar;