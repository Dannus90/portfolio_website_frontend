import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./pagination.styles.scss";

const Pagination = ({
    postsPerPage,
    totalPosts,
    paginate,
    currentPage,
    setCurrentPage,
}) => {
    let pageNumbers = [];
    let lastPageLength = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        lastPageLength.push(i);
    }

    if (currentPage === 1) {
        pageNumbers = [
            currentPage,
            currentPage + 1,
            currentPage + 2,
            currentPage + 3,
            currentPage + 4,
        ];
    } else if (currentPage === 2) {
        pageNumbers = [
            currentPage - 1,
            currentPage,
            currentPage + 1,
            currentPage + 2,
            currentPage + 3,
        ];
    } else if (currentPage === pageNumbers.length) {
        pageNumbers = [
            currentPage - 4,
            currentPage - 3,
            currentPage - 2,
            currentPage - 1,
            currentPage,
        ];
    } else if (currentPage === pageNumbers.length - 1) {
        pageNumbers = [
            currentPage - 3,
            currentPage - 2,
            currentPage - 1,
            currentPage,
            currentPage + 1,
        ];
    } else {
        pageNumbers = [
            currentPage - 2,
            currentPage - 1,
            currentPage,
            currentPage + 1,
            currentPage + 2,
        ];
    }

    return (
        <div className="pagination-container">
            <ul className="pagination-container-ul">
                <li
                    className="pagination-container-ul-item"
                    onClick={() => setCurrentPage(1)}
                    style={{
                        pointerEvents: currentPage === 1 ? "none" : null,
                        backgroundColor: currentPage === 1 ? "#ccc" : "#fff",
                    }}
                >
                    <FontAwesomeIcon icon="angle-double-left" />
                </li>

                <li
                    className="pagination-container-ul-item"
                    onClick={() => setCurrentPage(currentPage - 1)}
                    style={{
                        pointerEvents: currentPage === 1 ? "none" : null,
                        backgroundColor: currentPage === 1 ? "#ccc" : "#fff",
                    }}
                >
                    <FontAwesomeIcon icon="chevron-left" />
                </li>

                {pageNumbers.map((number, index) => (
                    <div
                        onClick={() => paginate(number)}
                        className="page-link"
                        key={index}
                    >
                        <li
                            className="pagination-container-ul-item "
                            style={{
                                backgroundColor:
                                    currentPage === number ? "#c53030" : "#fff",
                                color: currentPage === number ? "#fff" : "#000",
                            }}
                        >
                            {number}
                        </li>
                    </div>
                ))}

                <li
                    className="pagination-container-ul-item"
                    onClick={() => setCurrentPage(currentPage + 1)}
                    style={{
                        pointerEvents:
                            currentPage === lastPageLength.length
                                ? "none"
                                : null,
                        backgroundColor:
                            currentPage === lastPageLength.length
                                ? "#ccc"
                                : "#fff",
                    }}
                >
                    <FontAwesomeIcon icon="chevron-right" />
                </li>

                <li
                    className="pagination-container-ul-item"
                    onClick={() => setCurrentPage(lastPageLength.length)}
                    style={{
                        pointerEvents:
                            currentPage === lastPageLength.length
                                ? "none"
                                : null,
                        backgroundColor:
                            currentPage === lastPageLength.length
                                ? "#ccc"
                                : "#fff",
                    }}
                >
                    <FontAwesomeIcon icon="angle-double-right" />
                </li>
            </ul>
        </div>
    );
};

export default Pagination;
