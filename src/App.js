import React from "react";
import { Route, Routes } from "react-router-dom"; 
import { LoginPage } from "./pages/LoginPage"; 
import { UserProfile } from "./pages/UserProfile";
import { ProtectedRoutes } from "./ProtectedRoutes";
import { NotFoundPage } from "./pages/NotFoundPage";
import { SupportTickets } from "./pages/SupportAdmin/SupportTickets";
import { SupportChatPage } from "./pages/ChatPage/SupportChatPage";

 function App() {
  return (
    <div className="App"> 
      <Routes> 
        <Route path="/" element={<LoginPage />} /> 
        <Route path="login" element={<LoginPage />} /> 
        <Route
          path="profile/:username"
          element={<ProtectedRoutes Component={UserProfile} />}
        />  
        <Route
          path="resolve-issue/:ticketId"
          element={<ProtectedRoutes Component={SupportChatPage} />}
        />      
        <Route
          path="tickets"
          element={<ProtectedRoutes Component={SupportTickets} />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
