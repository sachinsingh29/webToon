const { type } = require("express/lib/response");
const mongoose = require("mongoose");

const webtoonschema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    characters: [String]
});

const webtoon = mongoose.model("webtoon", webtoonschema);

module.exports = webtoon;