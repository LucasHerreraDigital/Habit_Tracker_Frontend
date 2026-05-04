import { Routes } from "react-router";
import { Login } from "./pages/Login";
import { Route } from "react-router";
import { Habits } from "./pages/Habits";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Register } from "./pages/Register";

function App() {
  return (
    <>
      <Routes>
        <Route path="/register" element={<Register/>} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Habits />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
