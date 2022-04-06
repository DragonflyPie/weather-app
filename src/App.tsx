import { Route, Routes } from "react-router-dom";
import "./App.scss";
import Navbar from "./components/navbar/Navbar";
import Daily from "./components/daily/Daily";
import Current from "./components/current/Current";
import Suggestions from "./components/suggestions/Suggestions";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<Current />} />
          <Route path="daily" element={<Daily />} />
          <Route path="suggestions" element={<Suggestions />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
