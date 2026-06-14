import Navbar from '../components/Navbar'
import DoctorCard from '../components/DoctorCard'
import { useEffect, useState } from "react";

import API from "../services/api";

function Doctors() {


    const [doctors, setDoctors] = useState([]);

    useEffect(() => {

        fetchDoctors();

    }, []);

    const fetchDoctors = async () => {

        try {

            const response = await API.get("/doctors");

            setDoctors(response.data);

        } catch (error) {

            console.log(error);
        }
    };
    return (
        <>
            <Navbar />

            <div className='page-container'>
                <h1>Our Specialists</h1>

                <div className="doctor-grid">

                    {doctors.map((doctor, index) => (

                        <DoctorCard
                            key={index}
                            doctor={doctor}
                        />

                    ))}

                </div>
            </div>
        </>
    )
}

export default Doctors