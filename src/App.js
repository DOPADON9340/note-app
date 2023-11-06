import React, { useState, useEffect } from "react";
import picture from './image.png';

const App = () => {
  const [groups, setGroups] = useState([]);
  const [currentGroup, setCurrentGroup] = useState('');
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');

  useEffect(() => {
    const savedGroups = JSON.parse(localStorage.getItem('groups')) || [];
    setGroups(savedGroups);

    if (savedGroups.length > 0) {
      setCurrentGroup(savedGroups[0]);
    }

    const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    setNotes(savedNotes);
  }, []);

  useEffect(() => {
    localStorage.setItem('groups', JSON.stringify(groups));
  }, [groups]);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const createGroup = () => {
    const groupName = prompt('Enter the group name:');
    if (groupName) {
      setGroups([...groups, groupName]);
    }
  };

  const addNote = () => {
    if (newNote.trim() !== '') {
      const newNoteItem = {
        text: newNote,
        group: currentGroup,
        dateCreated: new Date().toLocaleString(),
        lastUpdated: new Date().toLocaleString(),
      };

      setNotes([...notes, newNoteItem]);
      setNewNote('');
    }
  };

  const switchGroup = (group) => {
    setCurrentGroup(group);
  };

  const filteredNotes = notes.filter((note) => note.group === currentGroup);

  return (
    <div className="container">
      <div className="group">
        <p className="pocketnotes">pocket notes</p>
        <button onClick={createGroup} className="button1">+ Create notes group</button>
        <div className="groups">
          <div className="icon1" onClick={() => switchGroup("CU")}>CU</div>
          <p className="cuveet-notes" onClick={() => switchGroup("CU")}>cuveet notes</p>
          <div className="icon2" onClick={() => switchGroup("MG")}>MG</div>
          <p className="My-personal-grp" onClick={() => switchGroup("MG")}>My personal grp</p>
        </div>
      </div>
      <div className="container2">
        <img className="image" src={picture} alt="Image" />
      </div>
      <div className="pocket_notes">pocket notes</div>
    </div>
  );
};

export default App;