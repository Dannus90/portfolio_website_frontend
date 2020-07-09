import React from "react";
import "./games-overview.styles.scss";
import { Link } from "react-router-dom";
import Layout from "../../layout/layout/layout.component";
import { motion } from "framer-motion";
import { pageTransition } from "../../../Utilities/Transitions/Transitions";

const GamesOverview = () => {
    return (
        <motion.div
            className="games-wrapper"
            exit="out"
            animate="in"
            initial="out"
            variants={pageTransition}
        >
            <Layout>
                <div className="header-container">
                    <h2>Gaming Arcade - Enjoy my Games!</h2>
                    <p>Made in Vanilla Javascript or React!</p>
                </div>

                <div className="games-grid-container">
                    <div className="games-grid-container__grid-item">
                        <a
                            href="https://sad-pasteur-97c9d3.netlify.app"
                            className="link-style"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <p>Tetris!</p>
                            <div className="grid__item--tetris"></div>
                        </a>
                    </div>

                    <div className="games-grid-container__grid-item">
                        <a
                            href="https://admiring-visvesvaraya-a0550e.netlify.app/"
                            className="link-style"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <p>BubbleShooter - Shark Game!</p>
                            <div className="grid__item--bubbleShark"></div>
                        </a>
                    </div>

                    <div className="games-grid-container__grid-item">
                        <a
                            href="https://gallant-curran-8388b8.netlify.app/"
                            className="link-style"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <p>Speed-Typer</p>
                            <div className="grid__item--speedTyper"></div>
                        </a>
                    </div>
                    <div className="games-grid-container__grid-item">
                        <Link to="/gamesoverview/tetris" className="link-style">
                            <p>Tetris!</p>
                            <div className="grid__item--tetris"></div>
                        </Link>
                    </div>
                    <div className="games-grid-container__grid-item">
                        <Link to="/gamesoverview/tetris" className="link-style">
                            <p>Tetris!</p>
                            <div className="grid__item--tetris"></div>
                        </Link>
                    </div>
                    <div className="games-grid-container__grid-item">
                        <Link to="/gamesoverview/tetris" className="link-style">
                            <p>Tetris!</p>
                            <div className="grid__item--tetris"></div>
                        </Link>
                    </div>
                </div>
            </Layout>
        </motion.div>
    );
};

export default GamesOverview;
