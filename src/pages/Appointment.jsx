import { useState, useEffect } from "react";
import API from "../services/api";
import "../styles/style.css";
import Navbar from "../components/Navbar";
function Appointment() {

    const [doctors, setDoctors] = useState([]);
    const [showSuccess, setShowSuccess] =
        useState(false);

    const [appointmentData, setAppointmentData] = useState({
        patientName: "",
        patientEmail: "",
        doctorName: "",
        appointmentDate: "",
        appointmentTime: "",
        reason: "",
        status: "Pending"
    });

    // FETCH AVAILABLE DOCTORS

    useEffect(() => {

        fetchDoctors();

    }, []);

    const fetchDoctors = async () => {

        try {

            const response = await API.get(
                "/doctors"
            );

            const availableDoctors =
                response.data.filter(
                    (doc) =>
                        doc.availability === "Available"
                );

            setDoctors(availableDoctors);

        } catch (error) {

            console.log(error);
        }
    };

    // BOOK APPOINTMENT

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response = await API.post(
                "/appointments",
                appointmentData
            );

            console.log(response.data);

            // SHOW SUCCESS POPUP

            setShowSuccess(true);

            // CLEAR FORM

            setAppointmentData({
                patientName: "",
                patientEmail: "",
                doctorName: "",
                appointmentDate: "",
                appointmentTime: "",
                reason: "",
                status: "Pending"
            });

            // HIDE POPUP AFTER 3 SECONDS

            setTimeout(() => {

                setShowSuccess(false);

            }, 3000);

        } catch (error) {

            console.log(error);

            alert("Failed To Book Appointment");
        }
    };

    return (

        <>

            <Navbar />
            <br></br>

            <div className="appointment-page">

                {showSuccess && (

                    <div className="success-popup">

                        <div className="success-box">

                            <h2>
                                Appointment Booked
                            </h2>

                            <p>
                                Your appointment was booked successfully.
                            </p>

                        </div>

                    </div>
                )}


                <form
                    className="appointment-form"
                    onSubmit={handleSubmit}
                >

                    <h2>Book Appointment</h2>

                    <input
                        type="text"
                        placeholder="Patient Name"
                        value={appointmentData.patientName}
                        onChange={(e) =>
                            setAppointmentData({
                                ...appointmentData,
                                patientName:
                                    e.target.value
                            })
                        }
                        required
                    />

                    <input
                        type="email"
                        placeholder="Patient Email"
                        value={appointmentData.patientEmail}
                        onChange={(e) =>
                            setAppointmentData({
                                ...appointmentData,
                                patientEmail: e.target.value
                            })
                        }
                        required
                    />

                    {/* DOCTOR */}

                    <select
                        value={appointmentData.doctorName}
                        onChange={(e) =>
                            setAppointmentData({
                                ...appointmentData,
                                doctorName:
                                    e.target.value
                            })
                        }
                        required
                    >

                        <option value="">
                            Select Doctor
                        </option>

                        {doctors.map((doctor) => (

                            <option
                                key={doctor.id}
                                value={doctor.doctorName}
                            >
                                {doctor.doctorName}
                                {" - "}
                                {doctor.speciality}
                            </option>

                        ))}

                    </select>

                    {/* DATE */}

                    <input
                        type="date"
                        value={appointmentData.appointmentDate}
                        onChange={(e) =>
                            setAppointmentData({
                                ...appointmentData,
                                appointmentDate: e.target.value
                            })
                        }
                    />
                    {/* TIME */}

                    <input
                        type="time"
                        value={appointmentData.appointmentTime}
                        onChange={(e) =>
                            setAppointmentData({
                                ...appointmentData,
                                appointmentTime: e.target.value
                            })
                        }
                    />

                    {/* REASON */}

                    <textarea
                        placeholder="Reason For Appointment"
                        value={appointmentData.reason}
                        onChange={(e) =>
                            setAppointmentData({
                                ...appointmentData,
                                reason: e.target.value
                            })
                        }
                        required
                    ></textarea>

                    <button type="submit">
                        Book Appointment
                    </button>


                </form>

            </div>
        </>
    );
}

export default Appointment;