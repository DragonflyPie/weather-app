import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Daily from "./components/daily/Daily";
import Suggestions from "./components/suggestions/Suggestions";
import Today from "./components/today/Today";
import SingleDay from "./components/singleDay/SingleDay";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./App.scss";
import NoMatch from "./components/noMatch/NoMatch";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<Today />} />
          <Route path="daily" element={<Daily />} />
          <Route path="suggestions" element={<Suggestions />} />
          <Route path="day/:dt" element={<SingleDay />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
