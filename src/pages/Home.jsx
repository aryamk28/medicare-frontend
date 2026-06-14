import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import DoctorCard from "../components/DoctorCard";
import Footer from "../components/Footer";

import API from "../services/api";

function Home() {

    const [doctors, setDoctors] = useState([]);

    useEffect(() => {

        fetchDoctors();

    }, []);

    const fetchDoctors = async () => {

        try {

            const response = await API.get(
                "/doctors"
            );

            setDoctors(response.data);

        } catch (error) {

            console.log(error);
        }
    };

    return (

        <>

            <Navbar />

            <Hero />

            <section className="doctor-section">

                <h2>Top Doctors</h2>

                <div className="doctor-grid">

                    {doctors.map((doctor, index) => (

                        <DoctorCard
                            key={index}
                            doctor={doctor}
                        />

                    ))}

                </div>

            </section>

            <Footer />

        </>
    );
}

export default Home;