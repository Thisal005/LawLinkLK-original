import { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import useConversation from "../zustand/useConversation";
import { AppContext } from "../context/AppContext";
import sodium from "libsodium-wrappers";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();
  const { backendUrl, userData, lawyerData, privateKey, getPublicKey } = useContext(AppContext);

  const encryptMessage = async (message, senderPrivateKey, receiverPublicKey) => {
    await sodium.ready;
    const nonce = sodium.randombytes_buf(sodium.crypto_box_NONCEBYTES);
    const encrypted = sodium.crypto_box_easy(
      message,
      nonce,
      sodium.from_hex(receiverPublicKey),
      sodium.from_hex(senderPrivateKey)
    );
    return {
      encrypted: sodium.to_hex(encrypted),
      nonce: sodium.to_hex(nonce),
    };
  };

  const sendMessage = async (messageText, files = []) => {
    if ((!messageText.trim() && files.length === 0) || loading) return;

    const currentUser = userData || lawyerData;
    if (!currentUser || !privateKey) {
      toast.error("You must be logged in to send messages");
      return;
    }

    if (!selectedConversation) {
      toast.error("No conversation selected");
      return;
    }

    const receiverId = selectedConversation._id;
    const isReceiverLawyer = selectedConversation.isLawyer;

    const receiverPublicKey = await getPublicKey(receiverId, isReceiverLawyer);

    if (!receiverPublicKey) {
      toast.error("Failed to fetch receiver's public key");
      return;
    }

    // Create a temporary pending message to show immediately
    const tempId = Date.now().toString(); // Temporary ID for the pending message
    const tempMessage = {
      _id: tempId,
      senderId: currentUser._id,
      receiverId: receiverId,
      message: messageText,
      messagePlaintext: messageText, // Store plaintext for later reference
      createdAt: new Date(),
      isPending: true,
      status: "pending"
    };
    
    // Add to state immediately to provide instant feedback
    setMessages((prev) => [...prev, tempMessage]);

    setLoading(true);

    try {
      let encryptedMessage = "";
      let nonce = "";
      if (messageText.trim()) {
        const { encrypted, nonce: messageNonce } = await encryptMessage(
          messageText,
          privateKey,
          receiverPublicKey
        );
        encryptedMessage = encrypted;
        nonce = messageNonce;
      }

      const formData = new FormData();
      formData.append("message", encryptedMessage);
      formData.append("nonce", nonce);
      files.forEach((file) => {
        formData.append("documents", file);
      });

      const res = await axios.post(`${backendUrl}/api/messages/send/${receiverId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      if (res.data.success) {
        // Replace the pending message with the actual message from server
        const newMessage = {
          ...res.data.data,
          message: messageText, // Use the plaintext for display
          messagePlaintext: messageText, // Store plaintext for later use
          isPending: false,
        };
        
        setMessages((prev) => prev.map(msg => 
          msg._id === tempId ? newMessage : msg
        ));
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      
      // Mark the temporary message as failed
      setMessages((prev) => prev.map(msg => 
        msg._id === tempId ? { ...msg, status: "failed", isPending: false } : msg
      ));
      
      toast.error("Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  return { loading, sendMessage };
};

export default useSendMessage;