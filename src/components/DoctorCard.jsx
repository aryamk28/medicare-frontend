import { useNavigate } from "react-router-dom";

function DoctorCard({ doctor }) {

    const navigate = useNavigate();

    return (

        <div className="doctor-card">

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
                className="book-btn"
                onClick={() => navigate("/appointment")}
            >
                Book Now
            </button>

        </div>
    );
}

export default DoctorCard;