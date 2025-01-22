import NoteObject from "../interfaces/NoteObject.tsx";
import axios from "./axios.tsx";
import API_URL from "../utils/Constants.tsx";

export const getNotes = async (): Promise<NoteObject[]> => {
    const response = await axios.get(
        API_URL.NOTES_URL,
        {
            headers: {"Content-Type": "application/json"},
            withCredentials: true
        }
    );
    
    return response.data;
} 

export const createNote = async (title: string, content: string): Promise<NoteObject> => {
    const response = await axios.post(
        `${API_URL.NOTES_URL}`,
        JSON.stringify({title, content}),
        {
            headers: {"Content-Type": "application/json"}
        }
    );
    
    return response.data;
}

export const editNote = async (id: string, title: string, content: string): Promise<NoteObject> => {
    const response = await axios.put(
        `${API_URL.NOTES_URL}/${id}`,
        JSON.stringify({title, content}),
        {
            headers: {"Content-Type": "application/json"},
        }
    )
    
    return response.data;
}

export const deleteNote = async (id: string): Promise<void> => {
    const response = await axios.delete(
        `${API_URL.NOTES_URL}/${id}`,
        {
            headers: {"Content-Type": "application/json"},
            withCredentials: true
        }
    )
    
    return response.data;
}