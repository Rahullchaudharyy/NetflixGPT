export const CheakValid = (email,password)=>{

    const IsEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    const IsPasswordValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password)

    if(!IsEmailValid) return "Email is not valid "
    if(!IsPasswordValid) return "Please enter the correct password"

    return null;

}