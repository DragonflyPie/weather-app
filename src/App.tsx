import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Daily from "./components/daily/Daily";
import Suggestions from "./components/suggestions/Suggestions";
import Today from "./components/today/Today";
import SingleDay from "./components/singleDay/SingleDay";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./App.scss";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<Today />} />
          <Route path="daily" element={<Daily />} />
          {/* <Route path="tomorrow" element={<Tomorrow />} /> */}
          <Route path="tomorrow" element={<SingleDay day={1} />} />
          <Route path="suggestions" element={<Suggestions />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
