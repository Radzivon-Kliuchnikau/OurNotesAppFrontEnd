import axiosBase from "../axiosBase.tsx";
import API_URL from "../../utils/Constants.tsx";
import { Note } from "../../types/general";

export const getNotes = async (): Promise<Note[]> => {
  // TODO: Think about error handling and on what level it should be approached. Should we use try/catch block here?
  const response = await axiosBase.get<Note[]>(API_URL.NOTES_URL, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
};

export const createNote = async (
  title: string,
  content: string,
): Promise<Note> => {
  const response = await axiosBase.post<Note>(
    `${API_URL.NOTES_URL}`,
    JSON.stringify({ title, content }),
    {
      headers: { "Content-Type": "application/json" },
    },
  );

  return response.data;
};

export const editNote = async (
  id: string,
  title: string,
  content: string,
): Promise<Note> => {
  const response = await axiosBase.put<Note>(
    `${API_URL.NOTES_URL}/${id}`,
    JSON.stringify({ title, content }),
    {
      headers: { "Content-Type": "application/json" },
    },
  );

  return response.data;
};

export const deleteNote = async (id: string): Promise<void> => {
  const response = await axiosBase.delete(`${API_URL.NOTES_URL}/${id}`, {
    headers: { "Content-Type": "application/json" },
  });

  return response.data;
};
