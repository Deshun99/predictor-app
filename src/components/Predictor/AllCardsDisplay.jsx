import React from "react";
import { Box, Typography } from "@mui/material";

const AllCardsDisplay = ({ cards }) => {
  return (
    <Box
      sx={{
        maxHeight: "700px",
        width: "100%",
        maxWidth: "1000px", // Slightly smaller than main container
        textAlign: "center",
        mt: 2,
        overflowX: "hidden",
      }}
    >
      {cards.length === 0 ? (
        <Typography
          variant="body1"
          color="textSecondary"
          sx={{ marginTop: 4, fontWeight: "bold" }}
        >
          Select a version to view all cards
        </Typography>
      ) : (
        cards.map((deck, index) => (
          <Box
            key={index}
            sx={{
              p: 1,
              borderRadius: "8px",
              backgroundColor: "white",
              boxShadow: 1,
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
              Deck {deck.deckName}
            </Typography>

            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {deck.cards.map((card, i) => (
                <React.Fragment key={i}>
                  <Typography
                    sx={{
                      backgroundColor: card.includes("(Bronze)")
                        ? "#CD7F32"
                        : card.includes("(Silver)")
                        ? "silver"
                        : card.includes("(Gold)")
                        ? "gold"
                        : "transparent",
                      color: card.includes("(Bronze)") ? "white" : "black",
                      borderRadius: "5px",
                      padding: "2px 4px",
                      fontSize: "12px",
                    }}
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
          </Box>
        ))
      )}
    </Box>
  );
};

export default AllCardsDisplay;
