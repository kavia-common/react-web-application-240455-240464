import React from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

// PUBLIC_INTERFACE
export function AppLayout({ children }) {
  /** Provides consistent page chrome (navbar + content container + footer). */
  return (
    <div className="App">
      <Navbar />
      <main className="container content" role="main">
        {children}
      </main>
      <Footer />
    </div>
  );
}
