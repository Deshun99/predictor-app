import React, { useState, useEffect } from "react";
import { predictCard, predict3rdCard, fetchAllCards } from "./predictorLogic";
import {
  TextField,
  Autocomplete,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
  Box,
  Tabs,
  Tab,
} from "@mui/material";
import PredictionResult from "./PredictionResult";
import "../../App.css";

const Predictor = () => {
  // Store selected dropdown values
  const [selectedVer, setSelectedVer] = useState(null);
  const [allCards, setAllCards] = useState([]);
  const [selectedCard1, setSelectedCard1] = useState(null);
  const [selectedCard2, setSelectedCard2] = useState(null);
  const [selectedCard3, setSelectedCard3] = useState(null);
  const [selectedBarcodeDown, setSelectedBarcodeDown] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);

  // Store final submitted values (only updates when Predict is clicked)
  const [card1, setCard1] = useState(null);
  const [card2, setCard2] = useState(null);
  const [card3, setCard3] = useState(null);
  const [ver, setVer] = useState(null);
  const [barcodeDown, setBarcodeDown] = useState(false);
  const [result, setResult] = useState(null);

  const versionOptions = ["1"];

  // Fetch cards only when a version is selected
  useEffect(() => {
    if (selectedVer) {
      const loadCards = async () => {
        const cards = await fetchAllCards(selectedVer);
        setAllCards(cards);

        // Reset selected cards when changing the version
        setSelectedCard1(null);
        setSelectedCard2(null);
        setSelectedCard3(null);
      };

      loadCards();
    }
  }, [selectedVer]); // Runs only when selectedVer changes

  const handleSubmit = async (event) => {
    event.preventDefault();

    setCard1(selectedCard1);
    setCard2(selectedCard2);
    setCard3(selectedCard3);
    setVer(selectedVer);
    setBarcodeDown(selectedBarcodeDown);

    let results;

    if (tabIndex === 0) {
      // Predict 3rd Card (Less Accurate)
      results = await predict3rdCard(
        selectedCard1,
        selectedCard2,
        selectedBarcodeDown,
        selectedVer
      );
    } else {
      // Predict 4th Card (Standard)
      results = await predictCard(
        selectedCard1,
        selectedCard2,
        selectedCard3,
        selectedBarcodeDown,
        selectedVer
      );
    }

    setResult(results);
  };

  return (
    <div className="predictor-container">
      <Box
        className="mui-card"
        sx={{
          overflowX: "hidden",
        }}
      >
        {/* ✅ Logo + Tabs Row */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 2,
            px: 2,
          }}
        >
          {/* Logo */}
          <img
            src="/kv_logo.png"
            alt="App Logo"
            style={{ width: "150px", height: "auto" }}
          />

          {/* Tabs Section */}
          <Tabs
            value={tabIndex}
            onChange={(event, newValue) => setTabIndex(newValue)}
            indicatorColor="primary"
            textColor="primary"
            sx={{ minHeight: "40px" }} // Adjusts height to match logo
          >
            <Tab
              label="3rd Card"
              sx={{
                fontSize: "14px",
                minHeight: "40px",
                textTransform: "none",
              }}
            />
            <Tab
              label="4th Card"
              sx={{
                fontSize: "14px",
                minHeight: "40px",
                textTransform: "none",
              }}
            />
          </Tabs>
        </Box>

        <form onSubmit={handleSubmit} className="formContainer">
          {/* Card Selection - Disabled Until Version is Selected */}
          <Autocomplete
            sx={{ mb: 2 }}
            options={allCards}
            value={selectedCard1}
            onChange={(event, newValue) => setSelectedCard1(newValue)}
            disabled={!selectedVer}
            renderInput={(params) => (
              <TextField {...params} label="Card 1" variant="outlined" />
            )}
          />

          <Autocomplete
            sx={{ mb: 2 }}
            options={allCards}
            value={selectedCard2}
            onChange={(event, newValue) => setSelectedCard2(newValue)}
            disabled={!selectedVer}
            renderInput={(params) => (
              <TextField {...params} label="Card 2" variant="outlined" />
            )}
          />

          <Autocomplete
            sx={{ mb: 2 }}
            options={allCards}
            value={selectedCard3}
            onChange={(event, newValue) => setSelectedCard3(newValue)}
            disabled={!selectedVer || tabIndex === 0}
            renderInput={(params) => (
              <TextField {...params} label="Card 3" variant="outlined" />
            )}
          />

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mt: 2,
              gap: 2,
            }}
          >
            {/* Version Selection */}
            <Autocomplete
              sx={{ width: "120px" }}
              options={versionOptions}
              value={selectedVer}
              onChange={(event, newValue) => setSelectedVer(newValue)}
              renderInput={(params) => (
                <TextField {...params} label="Version" variant="outlined" />
              )}
            />

            {/* Checkbox */}
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedBarcodeDown}
                  onChange={(e) => setSelectedBarcodeDown(e.target.checked)}
                  color="primary"
                  disabled={!selectedVer}
                />
              }
              label="Barcode Down"
              sx={{ "& .MuiTypography-root": { fontSize: "14px" } }}
            />

            {/* Submit Button */}
            <Button
              type="submit"
              variant="contained"
              disabled={
                !selectedVer ||
                !selectedCard1 ||
                !selectedCard2 ||
                (tabIndex === 1 && !selectedCard3)
              }
              sx={{
                width: "100px",
                padding: "8px 16px",
                fontSize: "14px",
                fontWeight: "bold",
                backgroundColor: "#1976d2",
                color: "white",
                borderRadius: "8px",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "#155a9e",
                },
              }}
            >
              Predict
            </Button>
          </Box>
        </form>

        {/* Show Prediction Result Only After Clicking Predict */}
        <Typography
          variant="h5"
          sx={{ textAlign: "center", marginTop: 2, marginBottom: 2 }}
        >
          Prediction Result:
        </Typography>
        <PredictionResult
          result={result}
          selectedCards={[card1, card2, card3]}
          barcodeDown={barcodeDown}
        />
      </Box>
    </div>
  );
};

export default Predictor;
