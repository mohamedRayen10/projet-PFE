import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";

const ChatApp = () => {
  // الحالة لتخزين الرسائل والمحتوى الحالي
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [socket, setSocket] = useState(null);

  // الاتصال بـ WebSocket
  useEffect(() => {
    const socketConnection = io("http://localhost:3000");
    setSocket(socketConnection);

    // استقبال الرسائل من الخادم
    socketConnection.on("chat message", (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    // التنظيف عند التوقف عن الاتصال
    return () => {
      socketConnection.disconnect();
    };
  }, []);

  // إرسال الرسالة
  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      socket.emit("chat message", message); // إرسال الرسالة إلى الخادم
      setMessage("");
    }
  };

  return (
    <div className="flex flex-col items-center bg-gray-100 min-h-screen p-4">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-4">
        <h1 className="text-3xl text-center font-bold mb-4">دردشة جماعية</h1>

        {/* عرض الرسائل */}
        <div className="mb-4 p-2 bg-gray-50 rounded-lg max-h-[500px] overflow-y-auto">
          {messages.map((msg, index) => (
            <div key={index} className="p-2 mb-2 border-b border-gray-200">
              {msg}
            </div>
          ))}
        </div>

        {/* نموذج إرسال الرسالة */}
        <form className="flex items-center" onSubmit={handleSubmit}>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="أكتب رسالتك..."
            className="flex-grow p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-r-lg hover:bg-blue-600"
          >
            إرسال
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatApp;