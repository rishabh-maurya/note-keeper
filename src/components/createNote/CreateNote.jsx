import React, { useEffect, useState } from 'react';
import './CreateNote.scss';
import { GoPrimitiveDot } from 'react-icons/go';
import { v4 as uuidv4 } from 'uuid';

const CreateNote = ({ setNotes, id, setId }) => {

    useEffect(() => {
        if (id) {
            setNotes(prevNotes => {
                const noteData = prevNotes.filter(note => note.id === id);

                setNoteInput(prevInput => {
                    return { ...prevInput, ...noteData[0] }
                })
                return prevNotes;
            })
        }
    }, [id]); 

    const allColors = [
        '#2bc48a',
        '#7510f2',
        '#ff0990',
        '#c7831e',
        '#f4b523',
        '#d83d64'
    ];

    const [noteInput, setNoteInput] = useState({
        id: '',
        title: '',
        description: '',
        color: ''
    });

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setNoteInput(prevInput => {
            return { ...prevInput, [name]: value };
        })
    }

    const setColor = (color) => {
        setNoteInput(prevInput => {
            return { ...prevInput, color }
        });

        const newId = uuidv4();
        setNoteInput(prevInput => {
            return { ...prevInput, id: newId }
        });
    }

    const createNote = (e) => {
        e.preventDefault();

        const { title, description, color, id } = noteInput;

        if (title && description && color && id) {
            setNotes(prevNotes => {
                const updatedNotes = [...prevNotes, noteInput];
                localStorage.setItem("myNotes", JSON.stringify(updatedNotes));
                return updatedNotes;
            });

            setNoteInput({
                id: '',
                title: '',
                description: '',
                color: ''
            });
        } else {
            alert('Please add title, description and color!');
        }
    }

    const updateNote = (e) => {
        e.preventDefault();

        setNotes(prevNotes => {
            prevNotes.forEach((note, index) => {
                if (note.id === id) {
                    prevNotes[index] = { ...noteInput };
                }
            });
            localStorage.setItem("myNotes", JSON.stringify(prevNotes));
            return [...prevNotes];
        })

        setNoteInput({
            id: '',
            title: '',
            description: '',
            color: ''
        });

        setId('');
    }

    return (
        <div className='create-note-container'>
            <form onSubmit={(e) => !id ? createNote(e) : updateNote(e)}>
                <input
                    type="text"
                    name='title'
                    value={noteInput.title}
                    onChange={(e) => handleChange(e)}
                    placeholder='title'
                />

                <textarea
                    name="description"
                    value={noteInput.description}
                    onChange={(e) => handleChange(e)}
                    placeholder='description ...'
                ></textarea>

                <div className="color-selector">
                    {
                        allColors.map((color, index) =>
                            <button type='button' key={index} onClick={() => setColor(color)}>
                                <GoPrimitiveDot style={{ color }} />
                            </button>
                        )
                    }
                </div>
                {!id ?
                    <button type='submit'>Create Note</button>
                    : <button type='submit'>Update Note</button>
                }
            </form>
        </div>
    )
}

export default CreateNote;