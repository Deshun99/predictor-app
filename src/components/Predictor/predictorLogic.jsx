const API_URL = import.meta.env.VITE_API_URL;

export const fetchAllCards = async () => {
  try {
    const response = await fetch(`${API_URL}/calculation/all-cards`);
    if (!response.ok) {
      throw new Error("Failed to fetch cards");
    }
    const data = await response.json();
    console.log("Fetched Cards:", data); // ✅ Debugging step
    return data;
  } catch (error) {
    console.error("Error fetching cards:", error);
    return [];
  }
};

export const predictCard = async (card1, card2, card3, barcodeDown) => {
  try {
    const response = await fetch(`${API_URL}/calculation/predict`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ card1, card2, card3, barcodeDown }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch prediction results");
    }

    const data = await response.json();
    return data; // Return the response to update UI
  } catch (error) {
    console.error("Error fetching prediction:", error);
    return [];
  }
};
