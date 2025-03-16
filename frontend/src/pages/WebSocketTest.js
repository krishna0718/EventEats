import React, { useEffect, useState } from "react";
import socket from "../utils/socket";

const WebSocketTest = () => {
    const [serverResponse, setServerResponse] = useState("");

    useEffect(() => {
        socket.emit("testMessage", { message: "Hello WebSocket!" });

        socket.on("testResponse", (data) => {
            setServerResponse(data.message);
        });

        return () => {
            socket.off("testResponse");
        };
    }, []);

    return (
        <div>
            <h1>WebSocket Test Page</h1>
            <p>Server Response: {serverResponse}</p>
        </div>
    );
};

export default WebSocketTest;
