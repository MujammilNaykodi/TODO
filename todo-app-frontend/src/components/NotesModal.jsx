import React, { useState } from 'react';

const NotesModal = ({ onClose }) => {
  const [note, setNote] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Note Added:', note);
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Add Note</h3>
        <form onSubmit={handleSubmit}>
          <textarea placeholder="Write your note here..." value={note} onChange={(e) => setNote(e.target.value)} />
          <div className="modal-buttons">
            <button type="submit">Save Note</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NotesModal;
