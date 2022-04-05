import { Route, Routes } from "react-router-dom";
import "./App.scss";
import Navbar from "./Navbar";
import Daily from "./Daily";
import Current from "./Current";
import Suggestions from "./Suggestions";

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
