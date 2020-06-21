import React from "react";
import "./games-overview.styles.scss";
import { Link } from "react-router-dom";
import Layout from "../../layout/layout/layout.component";

const GamesOverview = () => {
    return (
        <div className="games-wrapper">
            <Layout>
                <div className="header-container">
                    <h2>Gaming Arcade - Enjoy my Games!</h2>
                    <p>
                        Made in Vanilla Javascript - Only working on computer
                        fully!
                    </p>
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
                    <div className="games-grid-container__grid-item">
                        <Link to="/gamesoverview/tetris" className="link-style">
                            <p>Tetris!</p>
                            <div className="grid__item--tetris"></div>
                        </Link>
                    </div>
                </div>
            </Layout>
        </div>
    );
};

export default GamesOverview;
