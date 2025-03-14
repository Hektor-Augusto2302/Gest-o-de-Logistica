export interface User {
    id: string;
    name: string;
    email: string;
    profileImage: string;
    role: "user" | "admin";
}

export interface RegisterData {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface loginData {
    email: string;
    password: string;
}