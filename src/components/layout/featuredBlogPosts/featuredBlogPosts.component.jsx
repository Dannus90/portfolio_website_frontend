import React, { Fragment, useState, useEffect } from "react";
import "./featuredBlogPosts.styles.scss";
import { categoryColors } from "../../../storage/categoryColors/categoryColors";
import { Link } from "react-router-dom";
import axios from "axios";

const FeaturedBlogPosts = () => {
    const [postData, setPostData] = useState("");

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/api/BlogPosts`)
            .then((res) => {
                setPostData(res.data);
            });
    }, []);

    const featuredPostData = [
        postData[postData.length - 1],
        postData[postData.length - 2],
        postData[postData.length - 3],
        postData[postData.length - 4],
    ];

    return (
        <Fragment>
            <h2
                className="featuredBlogPosts-header"
                id="featuredBlogPosts-header"
            >
                Recent Posts
            </h2>
            <div className="featuredBlogPosts-container">
                {postData !== ""
                    ? featuredPostData.map((post, index) => (
                          <Link
                              to={`/blog/singlepost/?postId=${post._id}`}
                              className={`featuredBlogPosts-container-post-${index}`}
                              style={{ backgroundImage: `url(${post.image})` }}
                              key={index}
                          >
                              <div className="featuredBlogPosts-container-information">
                                  <h3 className="featuredBlogPosts-container-title">
                                      {post.title}
                                  </h3>
                                  <div className="featuredBlogPosts-container-author-date">
                                      <span className="by-text">By: </span>
                                      <span className="author">
                                          {post.author}
                                      </span>{" "}
                                      -{" "}
                                      <span className="date">{post.date}</span>
                                  </div>
                              </div>
                              <div
                                  className="featuredBlogPosts-container-item-tag"
                                  style={{
                                      backgroundColor:
                                          categoryColors[post.category],
                                  }}
                              >
                                  {post.category}
                              </div>
                          </Link>
                      ))
                    : null}
            </div>
        </Fragment>
    );
};

export default FeaturedBlogPosts;
