import React from "react";
import Predictor from "./components/Predictor/Predictor";
import { CssBaseline, Container } from "@mui/material";
import "./App.css";

export default function App() {
  return (
    <>
      {/* Normalize default styles across browsers */}
      <CssBaseline />

      {/* Centered Container for the App */}
      <Container
        maxWidth="sm"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start", // Aligns content to the top
          minHeight: "100vh",
          paddingTop: "20px", // Add slight top padding
        }}
      >
        <Predictor />
      </Container>
    </>
  );
}
