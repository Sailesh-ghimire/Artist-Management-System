export const authHeader = () => {
    // Replace `token` with actual logic to get the JWT token from local storage or other source
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user?.token; // Adjust according to your stored token field
    if (token) {
      return { Authorization: `Bearer ${token}` };
    } else {
      return {};
    }
  };
  