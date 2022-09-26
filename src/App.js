import { useEffect, useState } from 'react';
import './App.scss';
import CreateNote from './components/createNote/CreateNote';
import NoteCard from './components/noteCard/NoteCard';
import Search from './components/search/Search';
import { TbNotesOff } from 'react-icons/tb';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [searchNotes, setSearchNotes] = useState([]);
  const [id, setId] = useState('');

  useEffect(() => {
    if (localStorage.getItem("myNotes")) {
      setNotes([...JSON.parse(localStorage.getItem("myNotes"))]);
    }
  }, []);

  useEffect(() => {
    setSearchNotes([...notes]);
  }, [notes]);

  return (
    <div className='App'>
      <h1>Note Keeper</h1>
      <div className="note-container">
        <div className='sidebar'>
          <Search notes={notes} setSearchNotes={setSearchNotes} />
          <CreateNote setNotes={setNotes} id={id} setId={setId} />
        </div>
        <div className="display-notes">
          {
            searchNotes.length ?
              searchNotes.map((note, index) => {
                return <NoteCard noteData={note} setNotes={setNotes} setId={setId} key={index} />
              })
              : <div className='no-notes-found'>
                <TbNotesOff />
                <h1>No notes found!</h1>
              </div>
          }
        </div>
      </div>

    </div>
  );
}

export default App;
