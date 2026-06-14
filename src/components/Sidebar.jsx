import { NavLink } from "react-router-dom";

function Sidebar() {

    return (

        <div className="sidebar">

            <h2>MediCare+</h2>

            <ul>

                <li>
                    <NavLink
                        to="/admin"
                        className={({ isActive }) =>
                            isActive ? "sidebar-active" : "sidebar-link"
                        }
                    >
                        Dashboard
                    </NavLink>
                </li>

                <li>
                    <NavLink
                        to="/doctors"
                        className={({ isActive }) =>
                            isActive ? "sidebar-active" : "sidebar-link"
                        }
                    >
                        Doctors
                    </NavLink>
                </li>

                <li>
                    <NavLink
                        to="/appointment"
                        className={({ isActive }) =>
                            isActive ? "sidebar-active" : "sidebar-link"
                        }
                    >
                        Appointments
                    </NavLink>
                </li>

                <li>
                    <NavLink
                        to="/history"
                        className={({ isActive }) =>
                            isActive ? "sidebar-active" : "sidebar-link"
                        }
                    >
                        History
                    </NavLink>
                </li>

                <li>
                    <NavLink
                        to="/profile"
                        className={({ isActive }) =>
                            isActive ? "sidebar-active" : "sidebar-link"
                        }
                    >
                        Profile
                    </NavLink>
                </li>

                <li>
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            isActive ? "sidebar-active" : "sidebar-link"
                        }
                    >
                        Home
                    </NavLink>
                </li>

            </ul>

        </div>

    );
}

export default Sidebar;