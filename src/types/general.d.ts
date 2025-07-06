export interface Note {
    id: string;
    title: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface LoginFormInputs {
    userEmail: string;
    password: string;
}

export interface RegistrationFormInputs {
    userName: string;
    userEmail: string;
    password: string;
    confirmPassword: string;
}
