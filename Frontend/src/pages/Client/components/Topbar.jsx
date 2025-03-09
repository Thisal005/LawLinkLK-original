import React from 'react';

function Topbar() {
  return (
    <div className="bg-white h-16 border-b flex items-center justify-end px-6">
      <div className="flex items-center space-x-6">
        <button className="text-gray-600 hover:text-purple-600">[Calendar]</button>
        <button className="text-gray-600 hover:text-purple-600">[Help]</button>
        <button className="text-gray-600 hover:text-purple-600">[Notifications]</button>
        <div className="flex items-center">
          <div className="mr-2 text-right">
            <div className="font-bold text-purple-600">DESHAN</div>
            <div className="text-xs text-gray-500">FERNANDO</div>
          </div>
          <span className="text-3xl text-gray-400">[User]</span>
        </div>
      </div>
    </div>
  );
}

export default Topbar;