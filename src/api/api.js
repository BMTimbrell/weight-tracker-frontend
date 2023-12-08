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
        
        return response.json();
    } catch (error) {
        console.log(error);
    }
};

export const fetchUser = async (id, signal) => {
    try {
        const response = await fetch(`${baseUrl}/users/${id}`, {
            signal,
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        });
        
        if (response.ok) return response.json();

        return null;
    } catch (error) {
        console.log(error);
    }
};

export const fetchWeightData = async (id) => {
    try {
        const response = await fetch(`${baseUrl}/users/${id}/weight`, {
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        });
        
        if (response.ok) return response.json();
        if (response.status === 401) return {authorisationFailed: true};
        return null;
    } catch (error) {
        console.log(error);
    }
};

export const postWeightData = async (id, weight, date) => {
    try {
        const response = await fetch(`${baseUrl}/users/${id}/weight`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                weight,
                date
            }),
            credentials: "include"
        });
        
        if (response.ok) return response.json();
        if (response.status === 401) return {authorisationFailed: true};
        return null;
    } catch (error) {
        console.log(error);
    }
};

export const updateWeightData = async (userId, dataId, weight, date) => {
    try {
        const response = await fetch(`${baseUrl}/users/${userId}/weight/${dataId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                weight,
                date
            }),
            credentials: "include"
        });
        
        if (response.ok) return response.json();
        if (response.status === 401) return {authorisationFailed: true};
        return null;
    } catch (error) {
        console.log(error);
    }
};

export const deleteWeightData = async (userId, dataId) => {
    try {
        const response = await fetch(`${baseUrl}/users/${userId}/weight/${dataId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        });
        
        if (response.ok) return response.json();
        if (response.status === 401) return {authorisationFailed: true};
        return null;
    } catch (error) {
        console.log(error);
    }
};