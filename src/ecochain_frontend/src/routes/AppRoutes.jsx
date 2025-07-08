import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import SubmitData from "../pages/SubmitData";
import DaoDashboard from "../pages/DaoDashboard";
import ExploreData from "../pages/ExploreData";
import Profile from "../pages/Profile";
import NotFound from "../pages/NotFound";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/submit" element={<SubmitData />} />
      <Route path="/dao" element={<DaoDashboard />} />
      <Route path="/explore" element={<ExploreData />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
