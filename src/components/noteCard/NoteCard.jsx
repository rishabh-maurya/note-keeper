import React from 'react';
import './NoteCard.scss';
import { RiQuillPenFill } from 'react-icons/ri';
import { MdDelete } from 'react-icons/md';

const NoteCard = ({ noteData, setNotes, setId }) => {

  const editNote = (id) => {
    setId(id);
  }

  const deleteNote = (id) => {
    setNotes(prevNotes => {
      const updatedNotes = prevNotes.filter(note => note.id !== id);
      localStorage.setItem("myNotes", JSON.stringify(updatedNotes));
      return [...updatedNotes];
    })
  }


  return (
    <div className='note-card' id={noteData.id} style={{ backgroundColor: `${noteData.color}` }}>
      <h3>{noteData.title}</h3>
      <p>{noteData.description}</p>
      <div className="icons-container">
        <button onClick={() => editNote(noteData.id)}><RiQuillPenFill /></button>
        <button onClick={() => deleteNote(noteData.id)}><MdDelete /></button>
      </div>
    </div>
  )
}

export default NoteCard;