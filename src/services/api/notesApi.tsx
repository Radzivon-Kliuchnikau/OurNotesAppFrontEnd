import axiosBase from "../axiosBase.tsx";
import API_URL from "../../utils/Constants.tsx";
import { Note } from "../../types/general";
import { ErrorHandler } from "../../utils/ErrorHandler.tsx";

export const getNotes = async (): Promise<Note[] | undefined> => {
    try {
        const response = await axiosBase.get<Note[]>(API_URL.NOTES_URL, {
            headers: { "Content-Type": "application/json" },
        });

        return response.data;
    } catch (error) {
        ErrorHandler(error);
    }
};

export const createNote = async (
    title: string,
    content: string
): Promise<Note | undefined> => {
    try {
        const response = await axiosBase.post<Note>(
            `${API_URL.NOTES_URL}`,
            JSON.stringify({ title, content }),
            {
                headers: { "Content-Type": "application/json" },
            }
        );

        return response.data;
    } catch (error) {
        ErrorHandler(error);
    }
};

export const editNote = async (
    id: string,
    title: string,
    content: string
): Promise<Note | undefined> => {
    try {
        const response = await axiosBase.put<Note>(
            `${API_URL.NOTES_URL}/${id}`,
            JSON.stringify({ title, content }),
            {
                headers: { "Content-Type": "application/json" },
            }
        );

        return response.data;
    } catch (error) {
        ErrorHandler(error);
    }
};

export const deleteNote = async (id: string): Promise<void> => {
    try {
        const response = await axiosBase.delete(`${API_URL.NOTES_URL}/${id}`, {
            headers: { "Content-Type": "application/json" },
        });

        return response.data;
    } catch (error) {
        ErrorHandler(error);
    }
};
