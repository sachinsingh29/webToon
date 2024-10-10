const mongoose = require("mongoose");
const webtoon = require("./webtoon");

const sampleData = [
  {
    title: "Castle Swimmer",
    description:
      "A fantasy webtoon about a swimmer who discovers a hidden castle beneath the waves.",
    characters: ["Kappa", "Mermaid", "Sirens"],
  },
  {
    title: "Dragon King",
    description:
      "The epic tale of a young warrior destined to save the dragon kingdom.",
    characters: ["Zyra", "Fang", "Ragnar"],
  },{
    title: "Ocean's Heart",
    description: "A heartwarming story of friendship and adventure in the depths of the ocean. Follow the journey of three unlikely friends as they face challenges and learn the true meaning of loyalty and bravery.",
    characters: ["Nemo", "Dory", "Bruce"]
},
{
    title: "Mystic Tides",
    description: "A journey through mystical waters filled with danger and discovery. The protagonist seeks to uncover the truth about their past while navigating through magical realms and encountering powerful foes.",
    characters: ["Captain Aqua", "Mermaid Lily", "Sea Witch"]
},
{
    title: "Depths of Desire",
    description: "A romantic tale set in the enchanting underwater world where a mermaid falls in love with a human. Their love faces trials and tribulations as they try to bridge their two worlds.",
    characters: ["Ariel", "Prince Eric", "Ursula"]
},
{
    title: "Waves of Fate",
    description: "A gripping narrative about a young hero fighting to save his village from an impending storm. With courage and determination, he sets off on a quest to find the source of the dark magic causing the chaos.",
    characters: ["Kai", "Sam", "Luna"]
},
{
    title: "Secrets of the Deep",
    description: "Uncover the secrets hidden beneath the ocean's surface. This thrilling adventure follows a group of explorers who stumble upon an ancient civilization that once ruled the seas.",
    characters: ["Explorer John", "Diver Mia", "Guardian of the Sea"]
},
{
    title: "Journey to Atlantis",
    description: "An adventurous quest to find the lost city of Atlantis. A team of explorers sets sail on a perilous journey, facing mythical sea creatures and treacherous waters to discover the legendary city.",
    characters: ["Explorer Max", "Princess of Atlantis", "Titan"]
},
{
    title: "Tales of the Ocean",
    description: "An anthology of stories from the magical ocean realm. Each tale brings forth unique characters and their incredible adventures, showcasing the beauty and mysteries of the sea.",
    characters: ["Sirena", "Captain Blue", "Octopus Paul"]
},
{
    title: "The Siren's Call",
    description: "A haunting tale about a siren who lures sailors to their doom. As one sailor becomes enchanted by her song, he must decide between love and survival as he unravels her tragic past.",
    characters: ["Siren", "Fisherman Tom", "Mermaid Grace"]
}
];

const connection = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/webtoonsDB");
    console.log("MongoDB connected");

    await webtoon.insertMany(sampleData);
    console.log("sample data inserted");

    mongoose.connection.close();
  } catch (error) {
    console.log("error is :", error);
  }
};

connection();