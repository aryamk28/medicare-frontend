import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";

import Footer from "../components/Footer";

import API from "../services/api";

function History() {

    const [appointments, setAppointments] = useState([]);

    useEffect(() => {

        fetchAppointments();

    }, []);

    const fetchAppointments = async () => {

        try {

            const user = JSON.parse(
                localStorage.getItem("hospitalUser")
            );

            console.log("Logged User:", user);

            const response = await API.get(
                "/appointments"
            );

            console.log("Appointments:", response.data);

            const myAppointments = response.data.filter(
                (appointment) =>
                    appointment.patientName === user.name
            );

            setAppointments(myAppointments);

            console.log(
                "My Appointments:",
                myAppointments
            );

            setAppointments(myAppointments);

        } catch (error) {

            console.log(error);
        }
    };
    return (

        <>

            <Navbar />

            <br></br>

            <div className="history-page">

                <h1>Appointment History</h1>

                <div className="history-container">

                    {appointments.map((appointment, index) => (

                        <div
                            className="history-card"
                            key={index}
                        >

                            <h3>
                                {appointment.patientName}
                            </h3>

                            <p>
                                Doctor:
                                {" "}
                                {appointment.doctorName}
                            </p>

                            <p>
                                Date:
                                {" "}
                                {appointment.appointmentDate}
                            </p>

                            <p>
                                Time:
                                {" "}
                                {appointment.appointmentTime}
                            </p>

                            <span
                                className={
                                    appointment.status === "Approved"
                                        ? "approved"
                                        : "pending"
                                }
                            >
                                {appointment.status}
                            </span>

                        </div>

                    ))}

                </div>

            </div>

            <Footer />

        </>
    );
}

export default History;