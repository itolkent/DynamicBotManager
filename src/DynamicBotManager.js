import React, { useState } from 'react';

const DynamicBotManager = () => {
  const [bots, setBots] = useState([
    { id: '1', name: 'Bot1', status: 'Active' },
    { id: '2', name: 'Bot2', status: 'Inactive' }
  ]);

  const [newBot, setNewBot] = useState({ id: '', name: '', status: 'Active' });

  // Handle input changes for new bot fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBot((prevBot) => ({
      ...prevBot,
      [name]: value
    }));
  };

  // Add new bot to the list
  const addBotToList = () => {
    if (!newBot.id || !newBot.name || !newBot.status) {
      alert('Please fill in all fields: id, name, and status!');
      return;
    }

    // Prevent duplicate IDs
    if (bots.some((bot) => bot.id === newBot.id)) {
      alert('Bot ID must be unique!');
      return;
    }

    setBots((prevBots) => [...prevBots, newBot]);
    setNewBot({ id: '', name: '', status: 'Active' }); // reset form
  };

  // Delete bot by id
  const deleteBot = (id) => {
    setBots((prevBots) => prevBots.filter((bot) => bot.id !== id));
  };

  return (
    <div className="dynamic-bot-manager">
      <h1>Dynamic Bot Manager</h1>

      {/* Input fields for new bot */}
      <div className="bot-form">
        <input
          type="text"
          name="id"
          placeholder="Bot ID"
          value={newBot.id}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="name"
          placeholder="Bot Name"
          value={newBot.name}
          onChange={handleInputChange}
        />
        <select
          name="status"
          value={newBot.status}
          onChange={handleInputChange}
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
        <button onClick={addBotToList}>Add Bot</button>
      </div>

      {/* Display list of bots */}
      <ul>
        {bots.map((bot) => (
          <li key={bot.id}>
            <span>
              <strong>ID:</strong> {bot.id} | <strong>Name:</strong> {bot.name} | <strong>Status:</strong> {bot.status}
            </span>
            <button onClick={() => deleteBot(bot.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DynamicBotManager;