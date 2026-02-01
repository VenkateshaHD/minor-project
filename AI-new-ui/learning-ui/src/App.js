import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// import Login from "./pages/Login";
// import Register from "./pages/Register";
import Auth from "./pages/Auth";
import OnBoarding from "./pages/OnBoarding";
import Search from "./pages/Search";
import Analytics from "./pages/Analytics";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
import "./styles/theme.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/" replace />;
  }
  return children;
};


function App() {
  return (
    <>
      <BrowserRouter>
        {/* NAVBAR appears only after login */}
        {localStorage.getItem("token") && <Navbar />}

        <Routes>
          {/* PUBLIC ROUTES */}
          <Route path="/" element={<Auth />} />
          {/* <Route path="/register" element={<Register />} /> */}

          {/* ONBOARDING (FIRST LOGIN) */}
          <Route
            path="/onboarding"
            element={
              <ProtectedRoute>
                <OnBoarding />
              </ProtectedRoute>
            }
          />

          {/* MAIN GAME / BATTLE */}
          <Route
            path="/search"
            element={
              <ProtectedRoute>
                <Search />
              </ProtectedRoute>
            }
          />

          {/* PLAYER PROFILE */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          {/* WAR STATS / ANALYTICS */}
          <Route
            path="/analytics"
            element={
              <ProtectedRoute>
                <Analytics />
              </ProtectedRoute>
            }
          />

          {/* FALLBACK */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={2200}
        theme="dark"
        toastStyle={{
          border: "2px solid #cfa640",
          background: "#1c1504",
          color: "#ffec9c",
          boxShadow: "0 0 10px #cfa640",
          fontFamily: "Cinzel",
          fontWeight: "600"
        }}
      />
    </>
  );
}

export default App;

