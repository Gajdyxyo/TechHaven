export function checkLoggedIn() {
    const sessionToken = localStorage.getItem('sessionToken');
    return !!sessionToken;
}

export function logout(setIsLoggedIn, navigate, setHasInteracted) {
    localStorage.removeItem('sessionToken');
    localStorage.removeItem('userID');
    localStorage.removeItem('username');
    localStorage.removeItem('isAdmin');
    console.log('User has been logged out');
    setHasInteracted(true);
    setIsLoggedIn(false);
    navigate('/login');
}