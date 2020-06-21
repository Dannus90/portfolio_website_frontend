import React, { Fragment } from "react";
import "./blogPosts.styles.scss";
import moment from "moment";
import { categoryColors } from "../../../storage/categoryColors/categoryColors";
import { Link } from "react-router-dom";

const BlogPosts = ({ postData }) => {
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
            <Link to="/blog/addpost" className="add-blog-post-link">
                <div className="add-blog-post-btn">
                    <p>Add New Post</p>
                </div>
            </Link>
        </Fragment>
    );
};

export default BlogPosts;
