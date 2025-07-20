import React, { useMemo } from "react";
import { Card, Typography, Box, Chip, Avatar } from "@mui/material";
import "../../App.css";

// Function to apply color styles dynamically
const getHighlightStyle = (
  card,
  index,
  matchedIndices,
  predictedCardIndex,
  firstMatchIndex
) => {
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
      padding: "1px 2px",
      fontSize: "12px",
    };
  }
  if (card.includes("(Bronze)"))
    return {
      backgroundColor: "#CD7F32",
      color: "white",
      fontWeight: "bold",
      borderRadius: "5px",
      padding: "1px 2px",
      fontSize: "12px",
    };
  if (card.includes("(Silver)"))
    return {
      backgroundColor: "silver",
      color: "black",
      fontWeight: "bold",
      borderRadius: "5px",
      padding: "1px 2px",
      fontSize: "12px",
    };
  if (card.includes("(Gold)"))
    return {
      backgroundColor: "gold",
      color: "black",
      fontWeight: "bold",
      borderRadius: "5px",
      padding: "1px 2px",
      fontSize: "12px",
    };
  return { fontSize: "12px", borderRadius: "5px", padding: "1px 2px" };
};

// PredictionResult Component
const PredictionResult = ({ result }) => {
  const tiktokVideoIds = [
    "7523581547077799169",
    "7523231727561510160",
    "7522846151360400656",
  ];

  // Randomly select one video ID per render
  const randomTikTokId = useMemo(() => {
    const index = Math.floor(Math.random() * tiktokVideoIds.length);
    return tiktokVideoIds[index];
  }, [result]);

  return (
    <Box
      sx={{
        maxHeight: "650px",
        width: "100%",
        maxWidth: "1000px",
        textAlign: "center",
        margin: "0 auto",
        overflowX: "hidden",
        marginTop: 2,
      }}
    >
      {result === null ? (
        <Typography
          variant="body1"
          color="textSecondary"
          sx={{ fontWeight: "bold" }}
        >
          Enter the cards you've received
        </Typography>
      ) : result.length > 0 ? (
        result.map((deck, index) => {
          const firstMatchIndex =
            deck.matchedIndices.length > 0
              ? Math.min(...deck.matchedIndices)
              : deck.cards.length;

          const goldCount = deck.cards.filter(
            (card, i) => i >= firstMatchIndex && card.includes("(Gold)")
          ).length;

          const silverCount = deck.cards.filter(
            (card, i) => i >= firstMatchIndex && card.includes("(Silver)")
          ).length;

          const bronzeCount = deck.cards.filter(
            (card, i) => i >= firstMatchIndex && card.includes("(Bronze)")
          ).length;

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
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexWrap: "wrap",
                  mb: 1,
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: "bold", mr: 1 }}>
                  {deck.deckName}
                </Typography>

                <Chip
                  label="Gold"
                  avatar={
                    <Avatar
                      sx={{
                        bgcolor: "white",
                        color: "black",
                        width: 24,
                        height: 24,
                        fontSize: "12px",
                      }}
                    >
                      {goldCount}
                    </Avatar>
                  }
                  sx={{
                    backgroundColor: "gold",
                    color: "black",
                    fontWeight: "bold",
                    mr: 1,
                  }}
                  variant="outlined"
                />

                <Chip
                  label="Silver"
                  avatar={
                    <Avatar
                      sx={{
                        bgcolor: "white",
                        color: "black",
                        width: 24,
                        height: 24,
                        fontSize: "12px",
                      }}
                    >
                      {silverCount}
                    </Avatar>
                  }
                  sx={{
                    backgroundColor: "silver",
                    color: "black",
                    fontWeight: "bold",
                    mr: 1,
                  }}
                  variant="outlined"
                />

                <Chip
                  label="Bronze"
                  avatar={
                    <Avatar
                      sx={{
                        bgcolor: "white",
                        color: "#cd7f32",
                        border: "1px solid #cd7f32",
                        width: 24,
                        height: 24,
                        fontSize: "12px",
                      }}
                    >
                      {bronzeCount}
                    </Avatar>
                  }
                  sx={{
                    backgroundColor: "#cd7f32",
                    color: "white",
                    fontWeight: "bold",
                    mr: 1,
                  }}
                  variant="outlined"
                />
              </Box>

              {/* Deck Card List with Highlights (starting from firstMatchIndex) */}
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 0.2,
                  justifyContent: "space-between",
                }}
              >
                {deck.cards.slice(firstMatchIndex).map((card, i) => {
                  const actualIndex = i + firstMatchIndex;
                  return (
                    <React.Fragment key={actualIndex}>
                      <Typography
                        sx={getHighlightStyle(
                          card,
                          actualIndex,
                          deck.matchedIndices,
                          deck.predictedCardIndex,
                          firstMatchIndex
                        )}
                      >
                        {card}
                      </Typography>
                      {i !== deck.cards.slice(firstMatchIndex).length - 1 && (
                        <Typography sx={{ fontSize: "12px", color: "black" }}>
                          →
                        </Typography>
                      )}
                    </React.Fragment>
                  );
                })}
              </Box>
            </Card>
          );
        })
      ) : (
        <Box sx={{ marginTop: 2, display: "flex", justifyContent: "center" }}>
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
      )}
    </Box>
  );
};

export default PredictionResult;
