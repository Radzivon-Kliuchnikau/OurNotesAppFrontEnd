export interface Note {
    id: string;
    title: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    sharedWith: User[];
}

export interface User {
    name: string;
    email: string;
    image?: string;
}

export interface LoginFormInputs {
    userEmail: string;
    password: string;
}

export enum ViewEditRights {
    VIEW = "VIEW",
    EDIT = "EDIT",
}

export interface ShareWithUserFormInputs {
    userEmail: string;
    viewEditRights: ViewEditRights;
}

export interface RegistrationFormInputs {
    userName: string;
    userEmail: string;
    password: string;
    confirmPassword: string;
}
