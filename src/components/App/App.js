import "./styles.css";
import { Note } from "../../components/Note/Note.js";
import { useEffect, useState } from "react";

export default function App() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      fetch("https://jsonplaceholder.typicode.com/posts")
        .then((response) => response.json())
        .then((json) => {
          setNotes(json);
          setLoading(false);
        });
    }, 2000);
  }, []);

  const handleChange = (event) => {
    setNewNote(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const noteToAddToState = {
      id: notes.length + 1,
      title: newNote,
      body: newNote
    };
    setNotes(notes.concat(noteToAddToState));
    setNewNote("");
  };

  return (
    <div>
      <h1>Notes</h1>
      {loading ? "Cargando..." : ""}

      <ol>
        {notes.map((note) => (
          <Note key={note.id} {...note} />
        ))}
      </ol>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={handleChange} value={newNote}></input>
        <button>Crear nota</button>
      </form>
    </div>
  );
}
