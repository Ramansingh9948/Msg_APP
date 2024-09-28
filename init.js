const mongoose = require("mongoose");
// const path = require("path");
const Chat = require("./models/chat.js");


main().then(() => {
    console.log("connection sucessfull");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
};


let chat = [
    {
      from: "raman",
      to: "siddhant",
      msg: "Hii, Send me your notes",
      created_at: new Date()
    },
    {
      from: "siddhant",
      to: "raman",
      msg: "ok, I am sending you",
      created_at: new Date()
    },
    {
      from: "raman",
      to: "siddhant",
      msg: "ok , I am receiving",
      created_at: new Date()
    },
    {
      from: "siddhant",
      to: "raman",
      msg: "ok",
      created_at: new Date()
    }
  ];
Chat.insertMany(chat)
.then((res) => {
    console.log(res);
})
.catch((err) => {
    console.log(err);
});  

