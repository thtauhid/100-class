export const Logout = () => {
    localStorage.removeItem('user_id')
    window.location = "/";
}