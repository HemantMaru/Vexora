import badWordsList from "./words.js";

// 🛡️ VIP LIST (Safe Words) - In words ko kabhi block nahi kiya jayega
const safeWords = [
  "black",
  "white",
  "brown",
  "nude", // Fashion me 'nude' color hota hai (e.g., Nude Heels/Tops)
  "adult", // Adult category ke liye
  "asian",
  "color",
  "stroke",
  "horn",
  "cuban",
  "slit",
  "bust",
  "bare",
];

export const containsBadWords = (text) => {
  if (!text || badWordsList.length === 0) return false;

  const lowerText = text.toLowerCase();

  return badWordsList.some((badWord) => {
    const currentBadWord = badWord.toLowerCase();

    // Agar gaali hamari 'safeWords' list me maujood hai, toh usko chhod do (ignore)
    if (safeWords.includes(currentBadWord)) {
      return false;
    }

    // \b (Word Boundary) ensure karega ki exact word match ho (e.g., 'glass' me se 'ass' ko block na kare)
    const regex = new RegExp(`\\b${currentBadWord}\\b`, "i");
    return regex.test(lowerText);
  });
};
