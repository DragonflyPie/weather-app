import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./Navbar";
import Today from "./Today";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<Today />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
