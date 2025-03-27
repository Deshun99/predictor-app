import React, { useState } from "react";
import { predictCard, allCards } from "./predictorLogic";
import {
  TextField,
  Autocomplete,
  Button,
  Checkbox,
  FormControlLabel,
  Card,
  Typography,
  Box,
} from "@mui/material";
import PredictionResult from "./PredictionResult";
import "../../App.css";

const Predictor = () => {
  // Store selected dropdown values (not used for prediction until button is clicked)
  const [selectedCard1, setSelectedCard1] = useState(null);
  const [selectedCard2, setSelectedCard2] = useState(null);
  const [selectedCard3, setSelectedCard3] = useState(null);
  const [selectedBarcodeDown, setSelectedBarcodeDown] = useState(false);

  // Store final submitted values (only updates when Predict is clicked)
  const [card1, setCard1] = useState(null);
  const [card2, setCard2] = useState(null);
  const [card3, setCard3] = useState(null);
  const [barcodeDown, setBarcodeDown] = useState(false);
  const [result, setResult] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Update the final values for prediction
    setCard1(selectedCard1);
    setCard2(selectedCard2);
    setCard3(selectedCard3);
    setBarcodeDown(selectedBarcodeDown);
    setResult(
      predictCard(
        selectedCard1,
        selectedCard2,
        selectedCard3,
        selectedBarcodeDown
      )
    );
  };

  return (
    <div className="predictor-container">
      <Box
        className="mui-card"
        sx={{
          overflowX: "hidden", // Prevent any horizontal shifting
        }}
      >
        <form onSubmit={handleSubmit} className="formContainer">
          <Autocomplete
            sx={{ mb: 2 }}
            options={allCards}
            value={selectedCard1}
            onChange={(event, newValue) => setSelectedCard1(newValue)}
            renderInput={(params) => (
              <TextField {...params} label="Card 1" variant="outlined" />
            )}
          />

          <Autocomplete
            sx={{ mb: 2 }}
            options={allCards}
            value={selectedCard2}
            onChange={(event, newValue) => setSelectedCard2(newValue)}
            renderInput={(params) => (
              <TextField {...params} label="Card 2" variant="outlined" />
            )}
          />

          <Autocomplete
            sx={{ mb: 2 }}
            options={allCards}
            value={selectedCard3}
            onChange={(event, newValue) => setSelectedCard3(newValue)}
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
            }}
          >
            {/* Checkbox */}
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedBarcodeDown}
                  onChange={(e) => setSelectedBarcodeDown(e.target.checked)}
                  color="primary"
                />
              }
              label="Barcode Down"
            />

            {/* Submit Button */}
            <Button
              type="submit"
              variant="contained"
              sx={{
                width: "100px",
                padding: "8px 16px",
                fontSize: "14px",
                fontWeight: "bold",
                backgroundColor: "#1976d2", // Custom primary color
                color: "white",
                borderRadius: "8px",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", // Adds shadow
                textTransform: "none", // Removes uppercase styling
                "&:hover": {
                  backgroundColor: "#155a9e", // Darker blue on hover
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
