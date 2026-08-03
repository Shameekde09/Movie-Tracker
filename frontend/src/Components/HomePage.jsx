import React from "react";
import "./HomePage.css";

const HomePage = () => {

    return (

        <div className="page-container">

            {/* <div className="poster-wrapper">
                <img
                    src={image}
                    alt="Movie Poster"
                    className="poster-image"
                />
            </div> */}

            <p className="tagline">

                An app to discover, explore, and manage movies curated for your
                entertainment preferences.

            </p>

            <div className="contact-card">

                <h3>Contact Us</h3>

                <p>Email: contact@movietrackr.com</p>

                <p>Phone: +1 (123) 456-7890</p>

            </div>

        </div>

    );

};

export default HomePage;
