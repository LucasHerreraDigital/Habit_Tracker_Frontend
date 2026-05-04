import { Routes } from "react-router";
import { Login } from "./pages/login";
import { Route } from "react-router";
import { Habits } from "./pages/Habits";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Habits/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
    </>
  );
}

export default App;
