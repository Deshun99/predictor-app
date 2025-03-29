import { decksByVersion } from "./decks/decks";

// Predict 4th Card
export const predictCard = (card1, card2, card3, barcodeDown, version) => {
  if (!version || !decksByVersion[version]) return { error: "Invalid version" };

  const decks = decksByVersion[version];
  let results = [];

  for (const [deckName, deck] of Object.entries(decks)) {
    if (!Array.isArray(deck)) continue;

    let index1 = deck.indexOf(card1);
    while (index1 !== -1) {
      let sequenceMatch =
        (!barcodeDown &&
          deck[index1 + 1] === card2 &&
          deck[index1 + 2] === card3) ||
        (barcodeDown &&
          deck[index1 - 1] === card2 &&
          deck[index1 - 2] === card3);

      if (sequenceMatch) {
        let predictedCardIndex = barcodeDown ? index1 - 3 : index1 + 3;
        let predictedCard = deck[predictedCardIndex] || null;

        if (predictedCard) {
          results.push({
            deckName: `Deck ${deckName}`,
            cards: barcodeDown ? [...deck].reverse() : [...deck],
            matchedIndices: barcodeDown
              ? [
                  deck.length - index1 - 1,
                  deck.length - index1,
                  deck.length - index1 + 1,
                ]
              : [index1, index1 + 1, index1 + 2],
            predictedCardIndex: barcodeDown
              ? deck.length - predictedCardIndex - 1
              : predictedCardIndex,
            predictedCard,
          });
        }
      }
      index1 = deck.indexOf(card1, index1 + 1);
    }
  }

  return results.length > 0 ? results : [];
};

// Predict 3rd Card
export const predict3rdCard = (card1, card2, barcodeDown, version) => {
  if (!version || !decksByVersion[version]) return { error: "Invalid version" };

  const decks = decksByVersion[version];
  let results = [];

  for (const [deckName, deck] of Object.entries(decks)) {
    if (!Array.isArray(deck)) continue;

    let index1 = deck.indexOf(card1);
    while (index1 !== -1) {
      let sequenceMatch =
        (!barcodeDown && deck[index1 + 1] === card2) ||
        (barcodeDown && deck[index1 - 1] === card2);

      if (sequenceMatch) {
        let predictedCardIndex = barcodeDown ? index1 - 2 : index1 + 2;
        let predictedCard = deck[predictedCardIndex] || null;

        if (predictedCard) {
          results.push({
            deckName: `Deck ${deckName}`,
            cards: barcodeDown ? [...deck].reverse() : [...deck],
            matchedIndices: barcodeDown
              ? [deck.length - index1 - 1, deck.length - index1]
              : [index1, index1 + 1],
            predictedCardIndex: barcodeDown
              ? deck.length - predictedCardIndex - 1
              : predictedCardIndex,
            predictedCard,
          });
        }
      }
      index1 = deck.indexOf(card1, index1 + 1);
    }
  }

  return results.length > 0 ? results : [];
};

// Get all cards in a deck version
export const fetchAllCards = (version) => {
  if (!version || !decksByVersion[version]) return [];

  return [...new Set(Object.values(decksByVersion[version]).flat())].sort();
};
