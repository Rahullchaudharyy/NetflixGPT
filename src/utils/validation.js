export const CheakValid = (email, password) => {

    const IsEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const IsPasswordValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);

    if (!IsEmailValid) return "Email is not valid. Please enter a valid email address.";
    if (!IsPasswordValid) return `
        Password must:
        - Be at least 8 characters long.
        - Contain at least one uppercase letter (A-Z).
        - Contain at least one lowercase letter (a-z).
        - Contain at least one digit (0-9).
        - Contain at least one special character (@, $, !, %, *, ?, &).
    `;

    return null;
};
