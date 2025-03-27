import { decks } from "../Decks/ver1/decklist";

export const allCards = [...new Set(Object.values(decks).flat())].sort();

export const predictCard = (card1, card2, card3, barcodeDown) => {
  let results = [];

  for (const [deckName, deck] of Object.entries(decks)) {
    let index1 = deck.indexOf(card1);

    while (index1 !== -1) {
      // Check if the sequence is consecutive
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
            cards: barcodeDown ? [...deck].reverse() : [...deck], // Reverse if barcodeDown
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
            predictedCard: predictedCard,
          });

          // // Define start and end indices for the 7-card window
          // let startIndex = Math.max(0, index1 - 1);
          // let endIndex = Math.min(deck.length, predictedCardIndex + 6);

          // // Extract relevant portion of the deck
          // let extractedCards = deck.slice(startIndex, endIndex);

          // // Reverse if barcodeDown
          // if (barcodeDown) {
          //   extractedCards.reverse();
          // }

          // results.push({
          //   deckName: `Deck ${deckName}`,
          //   cards: extractedCards,
          //   matchedIndices: barcodeDown
          //     ? [
          //         extractedCards.length - (index1 - startIndex) - 1,
          //         extractedCards.length - (index1 - startIndex),
          //         extractedCards.length - (index1 - startIndex) + 1,
          //       ]
          //     : [
          //         index1 - startIndex,
          //         index1 - startIndex + 1,
          //         index1 - startIndex + 2,
          //       ],
          //   predictedCardIndex: barcodeDown
          //     ? extractedCards.length - (predictedCardIndex - startIndex) - 1
          //     : predictedCardIndex - startIndex,
          //   predictedCard: predictedCard,
          // });
        }
      }

      index1 = deck.indexOf(card1, index1 + 1);
    }
  }

  return results.length > 0 ? results : [];
};

const formatDeck = (
  deck,
  index1,
  index2,
  index3,
  predictedCard,
  barcodeDown
) => {
  let arrow = " → ";
  let formattedDeck = deck.map((card, index) => {
    let coloredCard = applyColorCoding(card);
    if (index === index1 || index === index2 || index === index3) {
      return `<span class='highlight'>${card}</span>`;
    } else if (card === predictedCard) {
      return `<span class='bold'>${coloredCard}</span>`;
    }
    return coloredCard;
  });
  return barcodeDown
    ? formattedDeck.reverse().join(arrow)
    : formattedDeck.join(arrow);
};

const applyColorCoding = (card) => {
  if (card.includes("(Bronze)")) return `<span class='bronze'>${card}</span>`;
  if (card.includes("(Silver)")) return `<span class='silver'>${card}</span>`;
  if (card.includes("(Gold)")) return `<span class='gold'>${card}</span>`;
  return card;
};
