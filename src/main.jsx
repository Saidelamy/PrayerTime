import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ApiContext } from "./Context/ApiContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ApiContext>
      <div className="app">
        <App />
      </div>
    </ApiContext>
  </StrictMode>
);
