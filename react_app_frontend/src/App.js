import React from "react";
import "./App.css";
import { AppProviders } from "./app/providers/AppProviders";
import { AppLayout } from "./components/layout/AppLayout";
import { Routes } from "./routes/Routes";

// PUBLIC_INTERFACE
function App() {
  /** Root React component wiring providers + layout + routes. */
  return (
    <AppProviders>
      <AppLayout>
        <Routes />
      </AppLayout>
    </AppProviders>
  );
}

export default App;
