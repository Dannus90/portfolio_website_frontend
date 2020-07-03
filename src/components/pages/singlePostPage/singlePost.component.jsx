import React, { Fragment, useState, useEffect } from "react";
// import { postData } from "../../../storage/blogData/blogData";
import queryString from "query-string";
import { categoryColors } from "../../../storage/categoryColors/categoryColors";
import "./singlePost.styles.scss";
import LayoutSinglePost from "../../layout/layout/layoutSinglePost.component";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { motion } from "framer-motion";
import { pageTransition } from "../../../Utilities/Transitions/Transitions";

const SinglePostPage = (props) => {
    const [postData, setPostData] = useState("");

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/api/BlogPosts`)
            .then((res) => {
                setPostData(res.data);
            });
    }, []);

    const parsedSearchParam = queryString.parse(props.location.search);
    const postToBeViewed = parsedSearchParam.postId;
    let filteredPost;

    if (postData) {
        filteredPost = postData.filter((post) => {
            return post._id === postToBeViewed;
        });
    }

    return (
        <motion.div
            exit="out"
            animate="in"
            initial="out"
            variants={pageTransition}
        >
            {filteredPost && (
                <Fragment>
                    <LayoutSinglePost>
                        <div className="singlePostPage-wrapper">
                            <div className="singlePost-container">
                                <figure>
                                    <img
                                        src={filteredPost[0].image}
                                        alt="blog item"
                                    />
                                </figure>

                                <h4 className="singlePost-container-title">
                                    {filteredPost[0].title}
                                </h4>
                                <div className="singlePost-container-author-date">
                                    <span className="by-text">By: </span>
                                    <span className="author">
                                        {filteredPost[0].author}
                                    </span>{" "}
                                    -{" "}
                                    <span className="date">
                                        {filteredPost[0].date}
                                    </span>
                                </div>
                                <div
                                    className="singlePost-container-item-tag"
                                    style={{
                                        backgroundColor:
                                            categoryColors[
                                                filteredPost[0].category
                                            ],
                                    }}
                                >
                                    {filteredPost[0].category}
                                </div>
                                <Link
                                    to="/blog"
                                    className="singlePost-container-return-button"
                                >
                                    <FontAwesomeIcon
                                        icon="chevron-left"
                                        className="back-to-blog-icon"
                                    />{" "}
                                    Back to Blog
                                </Link>
                                <div className="singlePost-container-item-description">
                                    {filteredPost[0].blogPost}
                                </div>
                            </div>
                        </div>
                    </LayoutSinglePost>
                </Fragment>
            )}
        </motion.div>
    );
};

export default SinglePostPage;
