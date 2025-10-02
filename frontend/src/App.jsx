import { BrowserRouter, Routes } from "react-router-dom";
import { routes } from "./Routes/Index.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>{routes}</Routes>
    </BrowserRouter>
  );
}