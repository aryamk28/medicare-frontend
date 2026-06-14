import { useNavigate } from "react-router-dom";

function Hero() {

    const navigate = useNavigate();

    return (

        <section className="hero">

            <div className="hero-text">

                <h1>
                    Premium Healthcare <br />
                    At Your Fingertips
                </h1>

                <p>
                    Book appointments instantly with top doctors and
                    manage your medical records digitally.
                </p>

                <button onClick={() => navigate("/appointment")}>
                    Book Appointment
                </button>

            </div>

            <div className="hero-image">

                <img
                    src="https://images.unsplash.com/photo-1584515933487-779824d29309?q=80&w=1200&auto=format&fit=crop"
                    alt="doctor"
                />

            </div>

        </section>

    );
}

export default Hero;