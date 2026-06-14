import { useState, useEffect } from "react";
import API from "../services/api";
import "../styles/style.css";
import { useNavigate } from "react-router-dom";
function AdminDashboard() {

    const [activeSection, setActiveSection] = useState("dashboard");

    const [appointments, setAppointments] = useState([]);

    const [doctors, setDoctors] = useState([]);

    const [patients, setPatients] = useState([]);

    const [showDoctorModal, setShowDoctorModal] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {

        const role = localStorage.getItem("role");

        if (role !== "ADMIN") {

            alert("Access Denied");

            navigate("/");

            return;
        }

        fetchDoctors();
        fetchAppointments();
        fetchPatients();

    }, [navigate]);

    const deletePatient = async (id) => {

        try {

            await API.delete(`/patients/${id}`);

            fetchPatients();

        } catch (error) {

            console.log(error);

            alert("Failed To Delete Patient");
        }
    };

    const [newDoctor, setNewDoctor] = useState({

        doctorName: "",
        speciality: "",
        experience: "",
        availability: "",
        imageUrl: ""
    });

    // FETCH DOCTORS

    const fetchDoctors = async () => {

        try {

            const response = await API.get("/doctors");

            setDoctors(response.data);

        } catch (error) {

            console.log(error);
        }
    };

    // FETCH APPOINTMENTS

    const fetchAppointments = async () => {

        try {

            const response = await API.get("/appointments");

            setAppointments(response.data);

        } catch (error) {

            console.log(error);
        }
    };

    // FETCH PATIENTS

    const fetchPatients = async () => {

        try {

            const response = await API.get("/patients");

            setPatients(
                response.data.filter(
                    patient => patient.role !== "ADMIN"
                )
            );

        } catch (error) {

            console.log(error);
        }
    };

    // ADD DOCTOR

    const handleAddDoctor = async () => {

        try {

            const response = await API.post(
                "/doctors",
                newDoctor
            );

            setDoctors([
                ...doctors,
                response.data
            ]);

            alert("Doctor Added Successfully");

            setNewDoctor({

                doctorName: "",
                speciality: "",
                experience: "",
                availability: "",
                imageUrl: ""
            });

            setShowDoctorModal(false);

        } catch (error) {

            console.log(error);

            alert("Failed To Add Doctor");
        }
    };


    // CHANGE DOCTOR AVAILABILITY

    const toggleAvailability = async (doctor) => {

        try {

            const updatedStatus =
                doctor.availability === "Available"
                    ? "Unavailable"
                    : "Available";

            await API.put(
                `/doctors/${doctor.id}/availability`,
                {
                    availability: updatedStatus
                }
            );

            fetchDoctors();

        } catch (error) {

            console.log(error);

            alert("Failed To Update Availability");
        }
    };
    // DELETE DOCTOR

    const deleteDoctor = async (id) => {

        try {

            await API.delete(`/doctors/${id}`);

            fetchDoctors();

        } catch (error) {

            console.log(error);
        }
    };

    // APPROVE APPOINTMENT

    const approveAppointment = async (id) => {

        try {

            await API.put(`/appointments/${id}`);

            fetchAppointments();

        } catch (error) {

            console.log(error);
        }
    };

    // DELETE APPOINTMENT

    const deleteAppointment = async (id) => {

        try {

            await API.delete(`/appointments/${id}`);

            fetchAppointments();

        } catch (error) {

            console.log(error);
        }
    };

    return (

        <div className="admin-layout">

            {/* SIDEBAR */}

            <div className="sidebar">

                <h2>Medicare Admin</h2>

                <button
                    onClick={() => setActiveSection("dashboard")}
                >
                    Dashboard
                </button>

                <button
                    onClick={() => setActiveSection("doctors")}
                >
                    Doctors ({doctors.length})
                </button>

                <button
                    onClick={() => setActiveSection("appointments")}
                >
                    Appointments ({appointments.length})
                </button>

                <button
                    onClick={() => setActiveSection("patients")}
                >
                    Patients ({patients.length})
                </button>

            </div>

            {/* CONTENT */}

            <div className="dashboard-content">

                <div className="dashboard-header">

                    <h1>Hospital Dashboard</h1>

                    <button
                        className="add-doctor-btn"
                        onClick={() => setShowDoctorModal(true)}
                    >
                        + Add Doctor
                    </button>

                </div>

                {/* DASHBOARD */}

                {activeSection === "dashboard" && (

                    <div className="dashboard-cards">

                        <div className="dash-card">
                            <h2>{patients.length}</h2>
                            <p>Total Patients</p>
                        </div>

                        <div className="dash-card">
                            <h2>{doctors.length}</h2>
                            <p>Total Doctors</p>
                        </div>

                        <div className="dash-card">
                            <h2>{appointments.length}</h2>
                            <p>Total Appointments</p>
                        </div>

                    </div>
                )}

                {/* DOCTORS */}

                {activeSection === "doctors" && (

                    <div className="doctor-grid">

                        {doctors.map((doctor, index) => (

                            <div className="doctor-card" key={index}>

                                <img
                                    src={
                                        doctor.imageUrl ||
                                        "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d"
                                    }
                                    alt="doctor"
                                />

                                <h3>{doctor.doctorName}</h3>

                                <p>{doctor.speciality}</p>

                                <span>{doctor.experience}</span>

                                <div
                                    className={
                                        doctor.availability === "Available"
                                            ? "available"
                                            : "unavailable"
                                    }
                                >
                                    {doctor.availability}
                                </div>

                                <button
                                    className="status-btn"
                                    onClick={() => toggleAvailability(doctor)}
                                >
                                    {doctor.availability === "Available"
                                        ? "Mark Unavailable"
                                        : "Mark Available"}
                                </button>

                                <button
                                    className="delete-btn"
                                    onClick={() => deleteDoctor(doctor.id)}
                                >
                                    Delete Doctor
                                </button>

                            </div>

                        ))}

                    </div>
                )}

                {/* APPOINTMENTS */}

                {activeSection === "appointments" && (

                    <div className="appointment-table">

                        <table>

                            <thead>

                                <tr>

                                    <th>Patient</th>

                                    <th>Doctor</th>

                                    <th>Date</th>

                                    <th>Time</th>

                                    <th>Reason</th>

                                    <th>Status</th>

                                    <th>Actions</th>

                                </tr>

                            </thead>

                            <tbody>

                                {appointments.map((app) => (

                                    <tr key={app.id}>

                                        <td>
                                            {app.patientName}
                                        </td>

                                        <td>
                                            {app.doctorName}
                                        </td>

                                        <td>
                                            {app.appointmentDate}
                                        </td>

                                        <td>
                                            {app.appointmentTime}
                                        </td>

                                        <td>
                                            {app.reason}
                                        </td>

                                        <td>

                                            <span
                                                className={`status ${app.status?.toLowerCase()}`}
                                            >
                                                {app.status}
                                            </span>

                                        </td>

                                        <td className="action-buttons">

                                            <button
                                                className="approve-btn"
                                                onClick={() =>
                                                    approveAppointment(app.id)
                                                }
                                            >
                                                Approve
                                            </button>

                                            <button
                                                className="delete-btn"
                                                onClick={() =>
                                                    deleteAppointment(app.id)
                                                }
                                            >
                                                Delete
                                            </button>

                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>
                )}

                {/* PATIENTS */}

                {activeSection === "patients" && (

                    <div className="appointment-table">

                        <table>

                            <thead>

                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Gender</th>
                                    <th>Age</th>
                                    <th>Actions</th>
                                </tr>

                            </thead>

                            <tbody>

                                {patients.map((patient) => (

                                    <tr key={patient.id}>

                                        <td>{patient.name}</td>

                                        <td>{patient.email}</td>

                                        <td>{patient.phone}</td>

                                        <td>{patient.gender}</td>

                                        <td>{patient.age}</td>

                                        <td>
                                            <button
                                                className="delete-btn"
                                                onClick={() => deletePatient(patient.id)}
                                            >
                                                Delete
                                            </button>
                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>
                )}

            </div>

            {/* MODAL */}

            {showDoctorModal && (

                <div className="modal-overlay">

                    <div className="doctor-modal">

                        <h2>Add Doctor</h2>

                        <input
                            type="text"
                            placeholder="Doctor Name"
                            value={newDoctor.doctorName}
                            onChange={(e) =>
                                setNewDoctor({
                                    ...newDoctor,
                                    doctorName: e.target.value
                                })
                            }
                        />

                        <input
                            type="text"
                            placeholder="Speciality"
                            value={newDoctor.speciality}
                            onChange={(e) =>
                                setNewDoctor({
                                    ...newDoctor,
                                    speciality: e.target.value
                                })
                            }
                        />

                        <input
                            type="text"
                            placeholder="Experience"
                            value={newDoctor.experience}
                            onChange={(e) =>
                                setNewDoctor({
                                    ...newDoctor,
                                    experience: e.target.value
                                })
                            }
                        />

                        <select
                            value={newDoctor.availability}
                            onChange={(e) =>
                                setNewDoctor({
                                    ...newDoctor,
                                    availability: e.target.value
                                })
                            }
                        >

                            <option value="">
                                Select Availability
                            </option>

                            <option value="Available">
                                Available
                            </option>

                            <option value="Unavailable">
                                Unavailable
                            </option>

                        </select>

                        <input
                            type="text"
                            placeholder="Doctor Image URL"
                            value={newDoctor.imageUrl}
                            onChange={(e) =>
                                setNewDoctor({
                                    ...newDoctor,
                                    imageUrl: e.target.value
                                })
                            }
                        />

                        <div className="modal-buttons">

                            <button
                                className="save-btn"
                                onClick={handleAddDoctor}
                            >
                                Save Doctor
                            </button>

                            <button
                                className="cancel-btn"
                                onClick={() => setShowDoctorModal(false)}
                            >
                                Cancel
                            </button>

                        </div>

                    </div>

                </div>
            )}

        </div>
    );
}

export default AdminDashboard;