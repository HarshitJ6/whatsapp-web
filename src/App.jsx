import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Chat from "./Components/Chat/Chat";
import Sidebar from "./Components/Sidebar/Sidebar";
import { useState } from "react";
import Login from "./Components/Login/Login";

function App() {
  const [user, setUser] = useState(null);

  return (
    <div className="app">
      {!user ? (
        <Login />
      ) : (
        <div className="app-body">
          <Router>
            <Sidebar />
            <Route path="/" element={<Chat />} />
            <Routes>
              <Route path="/rooms/:roomId" element={<Chat />} />
            </Routes>
            {/* <Chat /> */}
          </Router>
        </div>
      )}
    </div>
  );
}

export default App;
