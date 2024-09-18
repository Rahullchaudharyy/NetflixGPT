export const CheakValid = (email, password) => {

    const IsEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const IsPasswordValid = /^[A-Za-z\d@$!%*?&]{8}$/.test(password);

    if (!IsEmailValid) return "Email is not valid. Please enter a valid email address.";
    if (!IsPasswordValid) return `
        Password must:
        - Be at least 8 characters long.
    `;

    return null;
};
