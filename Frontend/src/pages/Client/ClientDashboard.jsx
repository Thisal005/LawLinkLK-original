import React, { useState } from 'react';
import Topbar from './components/Topbar';
import Sidebar from './components/Sidebar';
import CreateCasePostForm from './components/CreateCasePostForm'; // Updated import

function ClientDashboard() {
  const [activePage, setActivePage] = useState('dashboard');

  return (
    <div className="flex h-screen">
      <Sidebar activePage={activePage} setActivePage={setActivePage} />
      <div className="flex-1 flex flex-col">
        <Topbar />
        <div className="p-6">
          {activePage === 'dashboard' && (
            <div>
              <h1 className="text-2xl font-bold text-purple-600 mb-4">Your Dashboard</h1>
              <p className="text-gray-600">Manage your cases from the sidebar.</p>
            </div>
          )}
          {activePage === 'createPost' && <CreateCasePostForm />}
          {activePage === 'chatbot' && <div>Chatbot feature coming soon!</div>}
          {activePage === 'settings' && <div>Settings page coming soon!</div>}
        </div>
      </div>
    </div>
  );
}

export default ClientDashboard;