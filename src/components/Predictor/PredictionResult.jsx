import React, { useMemo } from "react";
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

  const tiktokVideoIds = [
    "7502005234613456149",
    "7497484058063031572",
    "7502012942796295445",
    "7498771593871494421",
  ];

  // Randomly select one video ID per render
  const randomTikTokId = useMemo(() => {
    const index = Math.floor(Math.random() * tiktokVideoIds.length);
    return tiktokVideoIds[index];
  }, [result]);


  return (
    <Box
      sx={{
        maxHeight: "600px",
        width: "100%",
        maxWidth: "1000px", // Slightly smaller than main container
        textAlign: "center",
        margin: "0 auto",
        overflowX: "hidden", // Prevent any horizontal shifting
      }}
    >
      {result === null ? ( // Handle case when result is not set
        <Typography
          variant="body1"
          color="textSecondary"
          sx={{ marginTop: 4, fontWeight: "bold" }}
        >
          Please submit a prediction.
        </Typography>
      ) : result.length > 0 ? ( // Handle case when results exist
        result.map((deck, index) => {
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
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 0.2,
                  justifyContent: "space-between",
                }}
              >
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
        <>
          <Typography
            variant="body1"
            color="textSecondary"
            sx={{ marginTop: 4, fontWeight: "bold" }}
          >
            No valid prediction found.
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <iframe
              src={`https://www.tiktok.com/embed/v2/${randomTikTokId}`}
              width="325"
              height="580"
              allow="encrypted-media"
              allowFullScreen
              style={{ border: "none", borderRadius: "8px" }}
              title="Random TikTok Video"
            />
          </Box>
        </>
      )}
    </Box>
  );
};

export default PredictionResult;
