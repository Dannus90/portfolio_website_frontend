import React, { useState, useEffect, Fragment } from "react";
import Layout from "../../layout/layout/layout.component";
import Pagination from "../../../UI/Pagination/pagination.component";
import SpinnerBig from "../../../UI/SpinnerBig/spinnerBig.component";
import BlogPosts from "../../layout/blogPosts/blogPosts.component";
import FeaturedBlogPosts from "../../layout/featuredBlogPosts/featuredBlogPosts.component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import "./blog.styles.scss";

const Blog = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(3);

    useEffect(() => {
        setLoading(true);
        axios.get("http://localhost:5000/api/addBlogPost").then((res) => {
            setPosts(res.data);
            setLoading(false);
        });
    }, []);

    //Get current post
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    //Change pange
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <Fragment>
            {loading ? (
                <div className="spinner-container">
                    <SpinnerBig />
                </div>
            ) : null}
            {posts !== [] ? (
                <div className="blog-wrapper">
                    <Layout>
                        <div className="main-background-blog">
                            <div className="main-background-blog__overlay" />
                            <h2>My Blog</h2>
                            <a href="#featuredBlogPosts-header">
                                <FontAwesomeIcon icon="chevron-down" />
                            </a>
                        </div>
                        <div className="blog-posts-container">
                            <FeaturedBlogPosts />
                            <BlogPosts postData={currentPosts} />
                            <Pagination
                                postsPerPage={postsPerPage}
                                totalPosts={posts.length}
                                paginate={paginate}
                                currentPage={currentPage}
                                setCurrentPage={setCurrentPage}
                            />
                        </div>
                    </Layout>
                </div>
            ) : null}
        </Fragment>
    );
};

export default Blog;
