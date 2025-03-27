import React from "react";
import { Card, Typography, Box } from "@mui/material";
import "../../App.css";

// Function to apply color styles dynamically
const getHighlightStyle = (
  card,
  index,
  matchedIndices,
  predictedCardIndex,
  firstMatchIndex
) => {
  if (index < firstMatchIndex) {
    return {
      color: "grey",
      opacity: 0.5,
      fontSize: "12px",
    };
  }
  if (matchedIndices.includes(index)) {
    return {
      backgroundColor: "yellow",
      color: "black",
      fontWeight: "bold",
      borderRadius: "5px",
      padding: "2px 4px",
      fontSize: "12px",
    };
  }
  if (index === predictedCardIndex) {
    return {
      backgroundColor: "red",
      color: "white",
      fontWeight: "bold",
      borderRadius: "5px",
      padding: "2px 4px",
      fontSize: "12px",
      border: "2px solid black",
    };
  }
  if (card.includes("(Bronze)"))
    return {
      backgroundColor: "#CD7F32",
      color: "white",
      fontWeight: "bold",
      borderRadius: "5px",
      padding: "2px 4px",
      fontSize: "12px",
    };
  if (card.includes("(Silver)"))
    return {
      backgroundColor: "silver",
      color: "black",
      fontWeight: "bold",
      borderRadius: "5px",
      padding: "2px 4px",
      fontSize: "12px",
    };
  if (card.includes("(Gold)"))
    return {
      backgroundColor: "gold",
      color: "black",
      fontWeight: "bold",
      borderRadius: "5px",
      padding: "2px 4px",
      fontSize: "12px",
    };
  return { fontSize: "12px" };
};

// PredictionResult Component
const PredictionResult = ({ result }) => {
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "1000px", // Slightly smaller than main container
        textAlign: "center",
        margin: "0 auto",
        overflowX: "hidden", // Prevent any horizontal shifting
      }}
    >
      {result.length > 0 ? (
        result.map((deck, index) => {
          // Get the first match index to grey out previous cards
          const firstMatchIndex =
            deck.matchedIndices.length > 0
              ? Math.min(...deck.matchedIndices)
              : deck.cards.length;

          return (
            <Card
              key={index}
              sx={{
                padding: 1,
                marginBottom: 2,
                borderRadius: 2,
                boxShadow: 1,
              }}
            >
              {/* Deck Title */}
              <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                {deck.deckName}
              </Typography>

              {/* Deck Card List with Highlights */}
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {deck.cards.map((card, i) => (
                  <React.Fragment key={i}>
                    <Typography
                      sx={getHighlightStyle(
                        card,
                        i,
                        deck.matchedIndices,
                        deck.predictedCardIndex,
                        firstMatchIndex
                      )}
                    >
                      {card}
                    </Typography>
                    {i !== deck.cards.length - 1 && (
                      <Typography sx={{ fontSize: "12px", color: "black" }}>
                        →
                      </Typography>
                    )}
                  </React.Fragment>
                ))}
              </Box>
            </Card>
          );
        })
      ) : (
        <Typography variant="body1" color="textSecondary">
          No valid prediction found.
        </Typography>
      )}
    </Box>
  );
};

export default PredictionResult;
