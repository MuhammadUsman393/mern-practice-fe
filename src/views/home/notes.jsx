import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { useNotesCrud } from "../../context/use-notes-crud";

const Notes = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [tag, setTag] = useState("");
  const [selectedNote, setSelectedNote] = useState(null);
  const [mode, setMode] = useState("add");

  const { notes, getAllNotes, addNotes, deleteNote, updateNotes } =
    useNotesCrud();

  useEffect(() => {
    getAllNotes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddTask = () => {
    if (title.trim() === "" || desc.trim() === "") {
      toast.error("Title and Desciption are required", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        theme: "colored",
        progress: undefined,
      });
    } else {
      if (mode === "add") {
        // Add new note
        if (tag === "") {
          addNotes(title, desc, "General");
        } else {
          addNotes(title, desc, tag);
        }
      } else if (mode === "update" && selectedNote) {
        // updateNote
        if (tag === "") {
          updateNotes(selectedNote._id, title, desc, "General");
        } else {
          updateNotes(selectedNote._id, title, desc, tag);
        }
        setMode("add");
        setSelectedNote(null);
      }
      setTitle("");
      setDesc("");
      setTag("");
    }
  };

  const handleUpdateTask = (index) => {
    const selected = notes[index];
    setSelectedNote(selected);
    setTitle(selected.title);
    setDesc(selected.description);
    setTag(selected.tag);
    setMode("update");
  };

  return (
    <div className="mx-4 sm:mx-12 mt-8 p-4">
      <div className="mb-4 flex gap-4 flex-col items-center">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter Title"
          className="p-2 border rounded w-full"
        />
        <input
          type="text"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          placeholder="Enter Description"
          className="p-2 border rounded w-full"
        />
        <input
          type="text"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          placeholder="Enter Tag"
          className="p-2 border rounded w-full"
        />
        <button
          className={`${
            mode === "add" ? "bg-blue-500" : "bg-yellow-500"
          } text-white w-[110px] p-2 rounded`}
          onClick={handleAddTask}
        >
          {mode === "add" ? "Add Task" : "Update Task"}
        </button>
      </div>
      <ul className="list-none p-0">
        {notes.length > 0 &&
          notes.map((item, index) => (
            <li
              key={index}
              className="border-b py-2 gap-4 flex flex-col sm:flex-row justify-between items-center"
            >
              <span className="mr-4">
                <p className="text-lg font-bold">
                  {item.title}-({item.tag})
                </p>
                <p className="text-sm">{item.description}</p>
              </span>
              <div className="flex gap-2">
                <button
                  className="bg-red-500 text-white p-2 ml-2 rounded"
                  onClick={() => deleteNote(item._id)}
                >
                  Remove
                </button>
                <button
                  className="bg-yellow-500 text-white p-2 ml-2 rounded"
                  onClick={() => handleUpdateTask(index)}
                >
                  Update
                </button>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Notes;
