import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuthContext } from './AuthContext';
import io from "socket.io-client";

const SocketContext = createContext();

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { isLoggedIn, userData, lawyerData } = useAuthContext() || {}; // Fallback to empty object

  // Determine the active user (client or lawyer)
  const activeUser = isLoggedIn ? (userData || lawyerData) : null;

  useEffect(() => {
    if (activeUser && activeUser._id) { // Check for valid user with _id
      console.log("Connecting to WebSocket with userId:", activeUser._id);
      const newSocket = io('http://localhost:5000', { 
        query: { 
          userId: activeUser._id,
          name: activeUser.fullName || activeUser.name || '', // Adjust based on your user/lawyer data structure
        }
      });

      newSocket.on('connect', () => {
        console.log('Connected to WebSocket server');
      });

      newSocket.on('disconnect', () => {
        console.log('Disconnected from WebSocket server');
        setSocket(null);
      });

      newSocket.on('getOnlineUsers', (users) => {
        setOnlineUsers(users);
      });

      newSocket.on('newMessage', (newMessage) => {
        const message = {
          ...newMessage,
          shouldShake: true,
          createdAt: Date.now()
        };
        // Adjust if useConversation is from another context or library
        if (typeof useConversation?.setState === 'function') {
          useConversation.setState(prev => ({
            messages: [...prev.messages, message]
          }));
        }
      });

      setSocket(newSocket);

      return () => {
        newSocket.close();
      };
    } else if (socket) {
      // Clean up socket if user logs out
      socket.close();
      setSocket(null);
    }
  }, [activeUser]); // Depend on activeUser

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};