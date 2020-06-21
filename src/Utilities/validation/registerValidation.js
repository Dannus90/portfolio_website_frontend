export const registerValidation = (
    fullName,
    email,
    password,
    confirmPassword
) => {
    let validated = true;

    const emailPattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

    const passwordPattern = new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
    );

    if (
        fullName === "" ||
        fullName.match(new RegExp(/^[a-zA-Z\s]*$/)) === null
    ) {
        return (validated = false);
    }

    if (email === "" || !emailPattern.test(email)) {
        return (validated = false);
    }

    if (password === "" || !passwordPattern.test(password)) {
        return (validated = false);
    }

    if (confirmPassword === "" || !passwordPattern.test(confirmPassword)) {
        return (validated = false);
    }

    if (confirmPassword !== password) {
        return (validated = false);
    }

    return validated;
};
