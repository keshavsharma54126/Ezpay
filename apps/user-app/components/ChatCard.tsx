"use client";

import { Card } from "@repo/ui/card";
import { Input } from "../../../packages/ui/@/components/ui/input";
import { useState, useEffect, useRef } from "react";
import { Button } from "@repo/ui/button";
import { useSession } from "next-auth/react";
import { io, Socket } from "socket.io-client";

interface User {
  id: number;
  email: string | null;
  name: string | null;
  number: string;
  password: string;
}

interface Message {
  id: number;
  conversationId: number;
  senderId: number;
  receiverId: number;
  text: string;
  createdAt: string;
}

interface Conversation {
  id: number;
  user1Id: number;
  user2Id: number;
  user1: User;
  user2: User;
}

export function ChatCard() {
  const [phoneInput, setPhoneInput] = useState<string>("");
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversation, setActiveConversation] =
    useState<Conversation | null>(null);
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");

  const SOCKET_SERVER_URL =
    process.env.SOCKET_SERVER_URL || "http://localhost:4000";
  const { data: session } = useSession();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (session) {
      fetchConversations();
    }
  }, [session]);
  useEffect(() => {
    socketRef.current = io(SOCKET_SERVER_URL);

    socketRef.current.on("load_messages", (loadedMessages: Message[]) => {
      setChatMessages(loadedMessages);
    });

    socketRef.current.on("message", (newMessage: Message) => {
      setChatMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    if (activeConversation && socketRef.current) {
      // Leave previous room if any
      if (socketRef.current.connected) {
        socketRef.current.emit("leave", activeConversation.id);
      }
      // Join new room
      socketRef.current.emit("join", activeConversation.id);
    }
  }, [activeConversation]);

  const fetchConversations = async () => {
    if (!session) {
      setError("User not authenticated");
      return;
    }

    try {
      const res = await fetch("/api/conversations", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (res.ok) {
        setConversations(data.conversations);
        setError(null);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("An unexpected error occurred");
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneInput(e.target.value);
  };

  const handleSearch = async () => {
    if (!session) {
      setError("User not authenticated");
      return;
    }

    try {
      const res = await fetch("/api/search-people", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ number: phoneInput }),
      });

      const data = await res.json();

      if (res.ok) {
        setUser(data);
        setError(null);
      } else {
        setUser(null);
        setError(data.message);
      }
    } catch (err) {
      setUser(null);
      setError("An unexpected error occurred");
    }
  };

  const handleAdd = async () => {
    if (!session) {
      setError("User not authenticated");
      return;
    }

    try {
      const res = await fetch("/api/addConversation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ toUserId: user?.id }),
      });

      const result = await res.json();
      setMessage(result.message);
      fetchConversations(); // refresh conversations
    } catch (err) {
      setUser(null);
      setError("An unexpected error occurred");
    }
  };

  const handleSendMessage = async () => {
    if (!session || !activeConversation || !socketRef.current) {
      setError("User not authenticated or no active conversation");
      return;
    }

    try {
      const newMessageData = {
        conversationId: activeConversation.id,
        //@ts-ignore
        senderId: Number(session?.user?.id),

        receiverId:
          // @ts-ignore
          activeConversation.user1Id === Number(session?.user?.id)
            ? activeConversation.user2Id
            : activeConversation.user1Id,
        text: newMessage,
      };

      socketRef.current.emit("message", newMessageData);
      setNewMessage("");
    } catch (err) {
      setError("An unexpected error occurred");
    }
  };
  //@ts-ignore
  const userid = session?.user?.id;

  return (
    <div>
      <Card title="Recent Conversations">
        <div>
          <div className="text-indigo-500 text-xl mb-2">Find People</div>
          <div className="flex flex-row gap-2">
            <Input
              type="text"
              placeholder="Search by Phone Number"
              value={phoneInput}
              onChange={handleInput}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
            />
            <Button disabled={false} onClick={handleSearch}>
              Search
            </Button>
          </div>
        </div>
        {user && (
          <div className="flex flex-row justify-between my-4 p-3 border border-indigo-500 shadow-lg">
            <div className="text-indigo-600 my-1 mx-2">{user.name}</div>
            <div>
              <Button disabled={false} onClick={handleAdd}>
                Add
              </Button>
            </div>
          </div>
        )}
        <div>{message}</div>
        {error && <div>{error}</div>}
        <div className="mt-4">
          <div className="text-indigo-500 text-xl mb-2">Conversations</div>
          {conversations.map((conv) => (
            <div>
              <div
                key={conv.id}
                className={`flex flex-row justify-between my-2 p-2 border border-indigo-500 shadow-lg cursor-pointer ${conv == activeConversation ? `bg-indigo-500` : `bg-white`}`}
                onClick={() => {
                  setActiveConversation(conv);
                }}>
                <div
                  className={`text-indigo-600 my-1 mx-2 ${conv == activeConversation ? `text-white` : `text-indigo-500`}`}>
                  {conv.user1Id === Number(userid)
                    ? conv.user2.name
                    : conv.user1.name}
                </div>
              </div>
              <div></div>
            </div>
          ))}
        </div>
      </Card>
      {activeConversation && (
        <div className="mt-6">
          <Card title="Chat">
            <div className="h-96  overflow-y-scroll p-2 border border-gray-300">
              {chatMessages.map((msg) => (
                <div className="flex bg-[#ebe6e6]">
                  <div
                    key={msg.id}
                    className={`my-1 p-2  rounded-xl ${
                      //@ts-ignore
                      msg.senderId === Number(session?.user?.id)
                        ? "bg-indigo-300  w-64 ml-auto font-bold"
                        : "bg-white text-left font-bold w-64"
                    }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef}></div>
            </div>
            <div className="flex flex-row mt-2">
              <Input
                type="text"
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleSendMessage();
                  }
                }}
              />
              <Button disabled={false} onClick={handleSendMessage}>
                Send
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
