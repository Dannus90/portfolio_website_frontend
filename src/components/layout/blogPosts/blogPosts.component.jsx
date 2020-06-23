import React, { useState, Fragment } from "react";
import "./blogPosts.styles.scss";
import moment from "moment";
import { categoryColors } from "../../../storage/categoryColors/categoryColors";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const BlogPosts = ({ postData, isAuthenticated }) => {
    const [showPopup, setShowPopup] = useState(false);

    function showAddPostConditionally() {
        console.log("restarting!!");
        if (isAuthenticated) {
            return "/blog/addpost";
        } else {
            return "/blog";
        }
    }

    function setPopupState() {
        setShowPopup(true);
        setTimeout(() => {
            setShowPopup(false);
        }, 4000);
    }
    return (
        <Fragment>
            <h2 className="blogPosts-all-posts-header">All Posts</h2>

            <div className="blog-posts-grid-container">
                {postData.map((post, index) => (
                    <Link
                        to={`/blog/singlepost/?postId=${post._id}`}
                        key={index}
                    >
                        <div className="grid-blog-item">
                            <figure>
                                <img src={post.image} alt="blog item" />
                            </figure>

                            <h4 className="grid-blog-item-title">
                                {post.title}
                            </h4>
                            <div className="grid-blog-item-author-date">
                                <span className="by-text">By: </span>
                                <span className="author">
                                    {post.author}
                                </span> -{" "}
                                <span className="date">{post.date}</span>
                            </div>
                            <div
                                className="grid-blog-item-tag"
                                style={{
                                    backgroundColor:
                                        categoryColors[post.category],
                                }}
                            >
                                {post.category}
                            </div>
                            <div className="grid-blog-item-description">
                                {post.blogPost}
                            </div>
                            <p className="read-more">Read more...</p>
                            <p className="post-info">
                                {moment(post.date).fromNow()} -{" "}
                                {Math.ceil(post.blogPost.length / 250)} minutes
                                read.
                            </p>
                        </div>
                    </Link>
                ))}
            </div>

            <Link
                onClick={setPopupState}
                to={showAddPostConditionally}
                className="add-blog-post-link"
            >
                <div className="add-blog-post-btn">
                    <p>Add New Post</p>
                </div>
            </Link>
            {showPopup ? (
                <div className="show-isAuthenticated-popup">
                    <p className="popup-paragraph">
                        You need to{" "}
                        <Link to="/login" className="login-paragraph">
                            log in
                        </Link>{" "}
                        to be able to access this route
                    </p>
                </div>
            ) : null}
        </Fragment>
    );
};

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.authReducer.isAuthenticated,
    };
};

export default connect(mapStateToProps)(BlogPosts);
