export const registerValidation = (
    fullName,
    email,
    password,
    confirmPassword
) => {
    let validated = { validated: true, msg: "" };

    const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const passwordPattern = new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
    );

    if (
        fullName === "" ||
        fullName.match(new RegExp(/^[a-öA-Ö\s]*$/)) === null
    ) {
        return (validated = {
            validated: false,
            msg:
                "Full name must not be empty and can only contain alphabetical characters.",
        });
    }

    if (email === "" || !emailPattern.test(email)) {
        return (validated = {
            validated: false,
            msg: "Please provide a proper email.",
        });
    }

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
