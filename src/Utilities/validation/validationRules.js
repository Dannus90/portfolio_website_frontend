export const checkValidity = (value, rules) => {
    let isValid = true;

    if (!rules || rules === "") {
        return true;
    }

    if (rules.required) {
        isValid = value.trim() !== "" && isValid;
    }

    if (rules.minLength) {
        isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
        isValid = value.length <= rules.maxLength && isValid;
    }

    if (rules.isEmail) {
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        isValid = pattern.test(value) && isValid;
    }

    // Not using but saving incase for the future.

    if (rules.isPhone) {
        const pattern = /^(\+\d{1,3}[- ]?)?\d{10}$/;
        isValid = pattern.test(value) && isValid;
    }

    return isValid;
};
