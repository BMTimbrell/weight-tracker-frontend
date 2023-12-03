const baseUrl = 'http://localhost:3001';

export const registerUser = async (name, email, password) => {
    try {
        const response = await fetch(`${baseUrl}/register`, {
            method: 'POST',
            credentials: "include",
                body: JSON.stringify({
                    name,
                    email,
                    password
                }),
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
        });

        console.log(response);
        if (response.ok) {
            return response.json();
        }
        return null;
    } catch (error) {
        console.log(error);
    }
};

export const loginUser = async (email, password) => {
    try {
        const response = await fetch(`${baseUrl}/login`, {
            method: 'POST',
            credentials: "include",
                body: JSON.stringify({
                    email,
                    password
                }),
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
        });

        
        if (response.ok) {
            return response.json();
        }
        return null;
    } catch (error) {
        console.log(error);
    }
};

export const logoutUser = async () => {
    try {
        const response = await fetch(`${baseUrl}/logout`, {
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        });
        
        return response;
    } catch (error) {
        console.log(error);
    }
};
