import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import API from "../services/api";
import "../styles/style.css";

function Profile() {

    const navigate = useNavigate();

    const [patient, setPatient] = useState(null);

    useEffect(() => {

        const loggedUser =
            JSON.parse(localStorage.getItem("hospitalUser"));

        if (!loggedUser) {

            navigate("/login");

            return;
        }

        fetchPatient(loggedUser.email);

    }, []);

    const fetchPatient = async (email) => {

        try {

            const response = await API.get("/patients");

            const foundPatient =
                response.data.find(
                    (p) => p.email === email
                );

            setPatient(foundPatient);

        } catch (error) {

            console.log(error);
        }
    };

    const handleLogout = () => {

        localStorage.removeItem("hospitalUser");

        navigate("/login");
    };

    if (!patient) {

        return (

            <>

                <Navbar />

                <div className="profile-loading">

                    Loading Profile...

                </div>

            </>
        );
    }

    return (

        <>

            <Navbar />

            <div className="profile-page">

                <div className="profile-card">

                    <div className="profile-top">

                        <div className="profile-avatar">

                            {patient.name?.charAt(0)}

                        </div>

                        <div >

                            <h1>{patient.name}</h1>

                            <p>{patient.email}</p>

                        </div>

                    </div>

                    <div className="profile-details">

                        <div className="profile-box">

                            <span>📞 Phone</span>

                            <h3>{patient.phone}</h3>

                        </div>

                        <div className="profile-box">

                            <span>⚧ Gender</span>

                            <h3>{patient.gender}</h3>

                        </div>

                        <div className="profile-box">

                            <span>🎂 Age</span>

                            <h3>{patient.age}</h3>

                        </div>

                        <div className="profile-box">

                            <span>🆔 Patient ID</span>

                            <h3>{patient.id}</h3>

                        </div>

                    </div>

                    <button
                        className="logout-btn"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>

                </div>

            </div>

        </>
    );
}

export default Profile;