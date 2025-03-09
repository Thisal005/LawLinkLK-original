import React, { useState } from 'react';

function Sidebar({ activePage, setActivePage }) {
  const [cases, setCases] = useState([
    { id: 1, subject: 'Theft Case', color: 'bg-blue-500' },
    { id: 2, subject: 'Divorce Case', color: 'bg-teal-400' },
    { id: 3, subject: 'Property Dispute', color: 'bg-purple-500' },
  ]);

  const handleRemoveCase = (id) => {
    setCases(cases.filter((caseItem) => caseItem.id !== id));
    console.log('Case removed:', id);
  };

  return (
    <div className="w-64 bg-purple-800 flex flex-col h-full text-white">
      <div className="p-4 border-b border-purple-900">
        <div className="flex items-center">
          <span className="text-3xl mr-2">⬚</span>
          <span className="font-bold text-2xl">
            LawLink <span className="text-sm">LK</span>
          </span>
        </div>
      </div>
      <nav className="flex-1 py-4">
        <div
          className={`flex items-center p-4 cursor-pointer ${activePage === 'dashboard' ? 'bg-purple-900' : ''}`}
          onClick={() => setActivePage('dashboard')}
        >
          <span className="mr-2">[D]</span> Dashboard
        </div>
        <div
          className={`flex items-center p-4 cursor-pointer ${activePage === 'createPost' ? 'bg-purple-900' : ''}`}
          onClick={() => setActivePage('createPost')}
        >
          <span className="mr-2">[P]</span> Create Post
        </div>
        <div
          className={`flex items-center p-4 cursor-pointer ${activePage === 'chatbot' ? 'bg-purple-900' : ''}`}
          onClick={() => setActivePage('chatbot')}
        >
          <span className="mr-2">[C]</span> Chatbot
        </div>
        <div
          className={`flex items-center p-4 cursor-pointer ${activePage === 'settings' ? 'bg-purple-900' : ''}`}
          onClick={() => setActivePage('settings')}
        >
          <span className="mr-2">[S]</span> Settings
        </div>
      </nav>
      <div className="border-t border-purple-900 my-2"></div>
      <div className="py-4 px-6">
        <div className="font-bold mb-2">YOUR CASES</div>
        {cases.length === 0 ? (
          <p className="text-sm text-gray-300">No cases yet.</p>
        ) : (
          cases.map((caseItem) => (
            <div key={caseItem.id} className="flex items-center justify-between py-2">
              <div className="flex items-center">
                <div className={`w-3 h-3 rounded-full ${caseItem.color} mr-2`}></div>
                <span>{caseItem.subject}</span>
              </div>
              <button
                onClick={() => handleRemoveCase(caseItem.id)}
                className="text-red-400 hover:text-red-600"
              >
                [X]
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Sidebar;