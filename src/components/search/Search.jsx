import React, { useState } from 'react';
import './Search.scss';

const Search = ({ notes, setSearchNotes }) => {

    const [searchInput, setSearchInput] = useState('');

    const handleChange = (e) => {
        const value = e.target.value;

        const filterdNotes = notes.filter(note => note.title.includes(value));
        setSearchNotes([...filterdNotes]);
        setSearchInput(value);
    }

    return (
        <div className='search-container'>
            <input
                type="search"
                name="search"
                value={searchInput}
                onChange={(e) => handleChange(e)}
                placeholder='search ...'
            />
        </div>
    )
}

export default Search;