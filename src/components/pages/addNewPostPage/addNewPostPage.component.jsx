import React, { useState } from "react";
import axios from "axios";
import "./addNewPostPage.styles.scss";
import moment from "moment";
import { validateInput } from "../../../Utilities/validation/inputValidation";
import LayoutSinglePost from "../../layout/layout/layoutSinglePost.component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { pageTransition } from "../../../Utilities/Transitions/Transitions";
import SpinnerSmallLight from "../../../UI/SpinnerSmallLight/spinnerSmallLight.component";
require("dotenv").config();

const AddNewPostPage = () => {
    const [image, setImage] = useState("");
    const [author, setAuthor] = useState("");
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("Tech");
    const [blogPost, setBlogPost] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState("");

    const uploadImage = async (e) => {
        const files = e.target.files;
        const data = new FormData();
        data.append("file", files[0]);
        data.append("upload_preset", "Daniel Portfolio Website");
        setLoading(true);
        const res = await fetch(
            "https://api.cloudinary.com/v1_1/dfq1maxu9/image/upload",
            {
                method: "POST",
                body: data,
            }
        );
        const file = await res.json();

        setImage(file.secure_url);
        setLoading(false);
    };

    //State handlers

    const handleTitle = (value) => {
        setTitle(value);
    };

    const handleAuthor = (value) => {
        setAuthor(value);
    };

    const handleCategory = (value) => {
        setCategory(value);
    };

    const handleBlogPost = (value) => {
        setBlogPost(value);
    };

    //Reset form
    const resetForm = () => {
        setImage("");
        setAuthor("");
        setTitle("");
        setCategory("Tech");
        setBlogPost("");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        if (validateInput(author, title, category, blogPost, image)) {
            let dataToSubmit = {
                title: title,
                author: author,
                category: category,
                blogPost: blogPost,
                image: image,
                date: moment().format("YYYY-MM-DD"),
            };

            axios
                .post(
                    `${process.env.REACT_APP_API_URL}/api/BlogPosts`,
                    dataToSubmit
                )
                .then((res) => {
                    setLoading(false);
                    setShowPopup(true);
                    setPopupMessage("Your Blog Post has been commited!");
                    resetForm();
                    setTimeout(() => {
                        setShowPopup(false);
                    }, 3000);
                })
                .catch((err) => {
                    setShowPopup(true);
                    setPopupMessage("Could not connect to the server!");
                    setTimeout(() => {
                        setShowPopup(false);
                    }, 3000);
                });
        } else {
            setShowPopup(true);
            setPopupMessage(
                "Please enter all fields, choose a category and upload a image"
            );
            setTimeout(() => {
                setShowPopup(false);
            }, 3000);
        }
    };

    return (
        <motion.div
            exit="out"
            animate="in"
            initial="out"
            variants={pageTransition}
        >
            <LayoutSinglePost>
                <div className="new-post-page-wrapper">
                    <div className="new-post-form-container-overlay"></div>
                    <h2>Add Blog Post</h2>
                    <div className="new-post-form-container">
                        <form
                            id="newPost-form"
                            onSubmit={(e) => handleSubmit(e)}
                        >
                            <div className="required-info">
                                <p>* Denotes required field</p>
                            </div>
                            <div className="new-post-form-content-container">
                                <label htmlFor="title">
                                    Title <span className="label-span">*</span>
                                </label>
                                <div className="input-container">
                                    <input
                                        placeholder="Title"
                                        type="text"
                                        name="title"
                                        value={title}
                                        className="form-input"
                                        onChange={(e) => {
                                            handleTitle(e.target.value);
                                        }}
                                    />
                                </div>
                                <label htmlFor="author">
                                    Author <span className="label-span">*</span>
                                </label>
                                <div className="input-container">
                                    <input
                                        placeholder="Author"
                                        type="text"
                                        name="author"
                                        value={author}
                                        className="form-input"
                                        onChange={(e) => {
                                            handleAuthor(e.target.value);
                                        }}
                                    />
                                </div>
                                <label htmlFor="categories">
                                    Choose a category{" "}
                                    <span className="label-span">*</span>
                                </label>
                                <div className="input-container">
                                    <select
                                        className="drop-down-list"
                                        name="categories"
                                        onChange={(e) => {
                                            handleCategory(e.target.value);
                                        }}
                                    >
                                        <option value="Tech">Tech</option>
                                        <option value="Sports">Sports</option>
                                        <option value="General">General</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                                <label htmlFor="textarea">
                                    Message{" "}
                                    <span className="label-span">*</span>
                                </label>
                                <div className="input-container">
                                    <textarea
                                        placeholder="Write your blog post here. Atleast 250 characters are required..."
                                        type="textarea"
                                        name="blogpost"
                                        value={blogPost}
                                        className="blogpost-message"
                                        onChange={(e) => {
                                            handleBlogPost(e.target.value);
                                        }}
                                    />
                                </div>
                                <div className="input-container upload-container">
                                    <label className="custom-file-upload">
                                        <input
                                            type="file"
                                            name="file"
                                            onChange={uploadImage}
                                        />
                                        <p className="image-upload-text">
                                            Upload an Image{" "}
                                            <span className="label-span-upload">
                                                *
                                            </span>
                                        </p>
                                    </label>
                                </div>

                                {loading ? (
                                    <div className="spinner-style">
                                        <SpinnerSmallLight />
                                    </div>
                                ) : (
                                    <img
                                        src={image}
                                        style={{ width: "300px" }}
                                        className="image-style"
                                    />
                                )}

                                <input
                                    type="submit"
                                    value="submit"
                                    className="newPost-submit-button"
                                />
                            </div>
                        </form>
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
                    </div>
                </div>
            </LayoutSinglePost>
        </motion.div>
    );
};

export default AddNewPostPage;
