import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Chat from "./Components/Chat/Chat";
import Sidebar from "./Components/Sidebar/Sidebar";
import { useState } from "react";
import Login from "./Components/Login/Login";
import { useStateValue } from "./StateProvider";

function App() {
  // const [user, setUser] = useState(true);
  const [{ user }, dispatch] = useStateValue();
  return (
    <div className="app">
      {!user ? (
        <Login />
      ) : (
        <div className="app-body">
          <Router>
            <Sidebar />
            <Routes>
              <Route path="/" element={<Chat />} />
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
