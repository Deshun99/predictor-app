const API_URL = import.meta.env.VITE_API_URL;

export const fetchAllCards = async (version) => {
  try {
    const response = await fetch(`${API_URL}/calculation/all-cards`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ version }),
    });

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

export const predictCard = async (card1, card2, card3, barcodeDown, version) => {
  try {
    const response = await fetch(`${API_URL}/calculation/predict`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ card1, card2, card3, barcodeDown, version }),
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

export const predict3rdCard = async (
  card1,
  card2,
  barcodeDown,
  version
) => {
  try {
    const response = await fetch(`${API_URL}/calculation/predict3rd`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ card1, card2, barcodeDown, version }),
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
