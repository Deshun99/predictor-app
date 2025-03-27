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
        maxWidth={false} // Disables Material-UI default width constraints
        sx={{
          width: "100vw", // Ensures full viewport width
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          minHeight: "100vh",
          paddingTop: "20px",
          paddingLeft: "10px", // Prevents unintended margin shifts
          paddingRight: "10px",
          boxSizing: "border-box", // Ensures padding doesn't affect width
          overflowX: "hidden", // Prevents unwanted horizontal shifts
        }}
      >
        <Predictor />
      </Container>
    </>
  );
}
