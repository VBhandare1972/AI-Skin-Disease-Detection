import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Landing from "./pages/Landing";
import Prediction from "./pages/Prediction";
import Hospital from "./pages/Hospital";
import Feedback from "./pages/Feedback";

function App() {

  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route path="/" element={<Landing />} />
        <Route path="/predict" element={<Prediction />} />
        <Route path="/hospital" element={<Hospital />} />
        <Route path="/feedback" element={<Feedback />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;