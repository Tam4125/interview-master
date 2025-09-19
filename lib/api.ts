export const loginUser = async (email: string, password: string) => {
    const endpoint = `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/sign-in`;
    const reqBody = {
        email: email,
        password: password,
    }

    const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include', // very important for cookies
        body: JSON.stringify(reqBody),
    });

    if (!response.ok) {
        throw new Error("Login failed");
    }

    return response.json();
}

export const registUser = async (username: string, email: string, password: string) => {
    const endpoint = `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/sign-up`;
    const reqBody = {
        username: username,
        email: email,
        password: password,
    }

    const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(reqBody),
    });

    if (!response.ok) {
        throw new Error("Sign up failed");
    }

    return response.json();
}


export const fetchCurrentUser = async () => {
    const endpoint = `${process.env.NEXT_PUBLIC_SERVER_URL}/users/me`;
    const response = await fetch(endpoint, {
        method: 'GET',
        credentials: 'include',
    })

    if (!response.ok) {
        throw new Error("Failed to get current user");
    }

    return response.json();
}

export const fetchUserInterviews = async () => {
    const endpoint = `${process.env.NEXT_PUBLIC_SERVER_URL}/interviews/me`;
    const response = await fetch(endpoint, {
        method: 'GET',
        credentials: 'include',
    })

    if (!response.ok) {
        throw new Error("Failed to get current user");
    }

    return response.json();
}

export const createNewInterview = async ({type, role, level, techstack, amount, cv}:InterviewInfor) => {
    const endpoint = `${process.env.NEXT_PUBLIC_SERVER_URL}/vapi/generate-interview`

    //Use FormData (only accepts string or Blob/File) instead of json String file because of having cv as File object
    const formData = new FormData();
    formData.append("type", type);
    formData.append("role", role);
    formData.append("level", level);
    formData.append("techstack", techstack);
    formData.append("amount", amount);
    if(cv){formData.append("cv", cv)} // this sends the actual file


    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            body: formData,
            credentials: "include"
        })

        if (!response.ok) {
            throw new Error("Failed to create interview");
        }
        console.log("New Interview was created successfully.");
        const data = await response.json();
        return data.data;

    } catch (error) {
        console.error(error);
    }
}



