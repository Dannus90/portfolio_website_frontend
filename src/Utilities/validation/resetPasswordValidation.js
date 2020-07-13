export const resetPasswordValidation = (password, confirmPassword) => {
    let validated = { validated: true, msg: "" };

    const passwordPattern = new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
    );

    if (password === "" || !passwordPattern.test(password)) {
        return (validated = {
            validated: false,
            msg: "Please provide a proper password",
        });
    }

    if (confirmPassword !== password) {
        return (validated = {
            validated: false,
            msg: "Please provide a matching confirm password",
        });
    }

    return validated;
};
