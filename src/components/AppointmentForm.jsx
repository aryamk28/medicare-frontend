import { useState } from "react";

function AppointmentForm() {

    const [form, setForm] = useState({
        patientName: "",
        doctor: "",
        date: "",
        time: "",
        reason: ""
    });

    const [showAlert, setShowAlert] = useState(false);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {

        e.preventDefault();

        setShowAlert(true);

        // RESET FORM
        setForm({
            patientName: "",
            doctor: "",
            date: "",
            time: "",
            reason: ""
        });

        // HIDE ALERT AFTER 3 SECONDS
        setTimeout(() => {
            setShowAlert(false);
        }, 3000);
    };

    return (

        <div className="appointment-container">

            {showAlert && (
                <div className="success-alert">
                    ✅ Appointment Booked Successfully
                </div>
            )}

            <form className="appointment-form" onSubmit={handleSubmit}>

                <h2>Book Appointment</h2>

                <input
                    type="text"
                    name="patientName"
                    placeholder="Patient Name"
                    value={form.patientName}
                    onChange={handleChange}
                    required
                />

                <select
                    name="doctor"
                    value={form.doctor}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select Doctor</option>
                    <option>Dr. Emma Watson</option>
                    <option>Dr. Daniel James</option>
                    <option>Dr. Olivia Smith</option>
                </select>

                <input
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    required
                />

                <input
                    type="time"
                    name="time"
                    value={form.time}
                    onChange={handleChange}
                    required
                />

                <textarea
                    name="reason"
                    placeholder="Reason For Visit"
                    value={form.reason}
                    onChange={handleChange}
                    required
                />

                <button type="submit">
                    Confirm Appointment
                </button>

            </form>

        </div>

    );
}

export default AppointmentForm;