const mongoose = require("mongoose");

// In your ./models/chat.js file
const chatSchema = new mongoose.Schema({
    from: String,
    to: { type: String, required: true },
    msg: { type: String, required: true },
    created_at: { type: Date, required: true },
  });
const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;