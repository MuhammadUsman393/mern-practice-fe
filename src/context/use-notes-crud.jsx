import { useContext } from "react";
import { NotesCrud } from "./notes-crud";

export const useNotesCrud = () => {
  const context = useContext(NotesCrud);
  if (!context) {
    throw new Error("useNotesCrud must be used within an NotesProvider");
  }
  return context;
};
