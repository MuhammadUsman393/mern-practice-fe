/* eslint-disable react/prop-types */
import { createContext, useState } from "react";
import { BASE_URL } from "../utils/axios-instance";

export const NotesCrud = createContext();

export const NotesProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const getAllNotes = async () => {
    try {
      const resp = await fetch(`${BASE_URL}/api/notes/fetch-all-notes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": `${localStorage.getItem("token")}`,
        },
      });

      if (!resp.ok) {
        throw new Error(`Error: ${resp.status} - ${resp.statusText}`);
      }

      const json = await resp.json();
      setNotes(json);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const addNotes = async (title, description, tag) => {
    try {
      const resp = await fetch(`${BASE_URL}/api/notes/add-note`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": `${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ title, description, tag }),
      });

      if (!resp.ok) {
        throw new Error(`Error: ${resp.status} - ${resp.statusText}`);
      }
      getAllNotes();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const updateNotes = async (id, title, description, tag) => {
    try {
      const resp = await fetch(`${BASE_URL}/api/notes/update-note/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": `${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ title, description, tag }),
      });

      if (!resp.ok) {
        throw new Error(`Error: ${resp.status} - ${resp.statusText}`);
      }
      getAllNotes();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const deleteNote = async (id) => {
    try {
      const resp = await fetch(`${BASE_URL}/api/notes/delete-note/${id}`, {
        method: "DELETE",
        headers: {
          "auth-token": `${localStorage.getItem("token")}`,
        },
      });

      if (!resp.ok) {
        throw new Error(`Error: ${resp.status} - ${resp.statusText}`);
      }
      getAllNotes();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <NotesCrud.Provider
      value={{ notes, getAllNotes, addNotes, deleteNote, updateNotes }}
    >
      {children}
    </NotesCrud.Provider>
  );
};
