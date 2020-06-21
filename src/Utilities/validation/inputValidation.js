export const validateInput = (author, title, category, blogPost, image) => {
    let validated = true;

    if (author === "" || author.match(new RegExp(/^[a-zA-Z\s]*$/)) === null) {
        return (validated = false);
    }

    if (title === "" || title.match(new RegExp(/^[a-zA-Z\s]*$/)) === null) {
        return (validated = false);
    }

    if (category === "") {
        return (validated = false);
    }

    if (blogPost.length < 250) {
        return (validated = false);
    }

    if (image === "") {
        return (validated = false);
    }

    return validated;
};
