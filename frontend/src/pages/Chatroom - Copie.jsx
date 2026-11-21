import React, { useState, useEffect } from "react";
import { LogOut, SendHorizonal, Pencil, Trash2 } from "lucide-react";

export default function Chat() {
  const [username, setUsername] = useState("");
  const [nameInput, setNameInput] = useState("");
  const [userPhoto, setUserPhoto] = useState("");
  const [photoFile, setPhotoFile] = useState(null);
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem("messages");
    return saved ? JSON.parse(saved) : [];
  });
  const [messageInput, setMessageInput] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);

  // Clear login info on refresh
  useEffect(() => {
    localStorage.removeItem("username");
    localStorage.removeItem("userPhoto");
  }, []);

  // Persist messages
  useEffect(() => {
    localStorage.setItem("messages", JSON.stringify(messages));
  }, [messages]);

  const handleJoin = () => {
    if (!nameInput.trim() || !photoFile) {
      alert("Name and photo are required.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result;
      const trimmedName = nameInput.trim();
      localStorage.setItem("username", trimmedName);
      localStorage.setItem("userPhoto", base64);
      setUsername(trimmedName);
      setUserPhoto(base64);
    };
    reader.readAsDataURL(photoFile);
  };

  const handleSignOut = () => {
    setUsername("");
    localStorage.removeItem("username");
    localStorage.removeItem("userPhoto");
  };

  const sendMessage = () => {
    if (messageInput.trim() === "") return;

    const timestamp = new Date().toLocaleString();

    if (editingIndex !== null) {
      const updatedMessages = [...messages];
      updatedMessages[editingIndex] = {
        ...updatedMessages[editingIndex],
        text: messageInput.trim(),
        date: timestamp,
      };
      setMessages(updatedMessages);
      setEditingIndex(null);
    } else {
      const newMessage = {
        sender: username,
        text: messageInput.trim(),
        photo: userPhoto,
        date: timestamp,
      };
      setMessages([...messages, newMessage]);
    }
    setMessageInput("");
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setMessageInput(messages[index].text);
  };

  const handleDelete = (index) => {
    const updated = messages.filter((_, i) => i !== index);
    setMessages(updated);
  };

  if (!username) {
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-r from-red-400 to-red-600">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md text-center">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">Join the Chat</h1>
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-red-400"
            placeholder="Your name..."
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setPhotoFile(e.target.files[0])}
            className="mb-4 w-full text-sm"
          />
          <button
            className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg font-semibold"
            onClick={handleJoin}
          >
            Join Chat
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex items-center justify-center bg-red-50 px-2">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-lg flex flex-col h-[90vh]">
        {/* Header */}
        <div className="bg-red-600 text-white px-6 py-4 rounded-t-3xl flex justify-between items-center">
          <h2 className="text-lg font-semibold">Chat Room - {username}</h2>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-700 px-3 py-1 rounded-lg text-sm"
          >
            <LogOut size={16} /> Sign Out
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white">
          {messages.map((msg, index) => {
            const isUser = msg.sender === username;
            return (
              <div
                key={index}
                className={`flex items-start gap-3 max-w-[75%] ${
                  isUser ? "ml-auto flex-row-reverse" : ""
                } group`}
              >
                {msg.photo && (
                  <img
                    src={msg.photo}
                    alt="avatar"
                    className="w-10 h-10 rounded-full border object-cover"
                  />
                )}
                <div
                  className={`p-3 rounded-xl shadow-sm relative ${
                    isUser
                      ? "bg-red-500 text-white"
                      : "bg-red-100 text-gray-900 border border-red-200"
                  }`}
                >
                  <p className="text-xs font-medium mb-1">{msg.sender}</p>
                  <p>{msg.text}</p>
                  <p className="text-xs mt-2 text-gray-600">{msg.date}</p>
                  {isUser && (
                    <div className="absolute top-1 right-1 hidden group-hover:flex gap-2">
                      <button onClick={() => handleEdit(index)} title="Edit">
                        <Pencil size={14} className="text-white" />
                      </button>
                      <button onClick={() => handleDelete(index)} title="Delete">
                        <Trash2 size={14} className="text-white" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Input */}
        <div className="px-4 py-3 border-t bg-white flex gap-2">
          <input
            type="text"
            className="flex-1 p-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400"
            placeholder={
              editingIndex !== null ? "Edit your message..." : "Type a message..."
            }
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            onClick={sendMessage}
            className="bg-red-600 hover:bg-red-700 text-white p-3 rounded-full"
          >
            <SendHorizonal size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}