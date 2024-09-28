const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat.js");
const methodOverride = require("method-override");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static( path.join(__dirname, "public")));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));


main().then(() => {
    console.log("connection sucessfull");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
};


//Index Route 
app.get("/chats", async (req, res) => {
    let chats = await Chat.find();
    // console.log(chats);
    res.render("index.ejs", {chats});
});


// New Chat
app.get("/chats/new", (req, res) =>{
    res.render("new.ejs");
})

app.post("/chats", (req, res) => {
    let { from, to, msg}= req.body;
    let newChat = new Chat({
        from: from,
        to: to,
        msg: msg,
        created_at: new Date()
    });
    newChat.save().then(res =>{
        console.log("chat was saved");
    })
    .catch((err) =>{
        console.log(err);
    })
    res.redirect("/chats");
});



//Edit Route
app.get("/chats/:id/edit", async (req, res) =>{
    let {id} = req.params;
    let chat = await Chat.findById(id);
    res.render("edit.ejs", {chat});
});


//Update Route 
app.put("/chats/:id", async (req, res) =>{
    let {id} = req.params;
    let {msg: newMsg} = req.body;
    let updatedChat = await Chat.findByIdAndUpdate(
        id,
        {msg: newMsg},
        {runValidators: true, new: true}
    );
    // console.log(msg);
    console.log(updatedChat);
    res.redirect("/chats");
});


//DESTROY ROUTE
app.delete("/chats/:id",async (req, res) =>{
    let {id} = req.params;
    await Chat.findByIdAndDelete(id).then(() =>{
        res.redirect("/chats");
        });
});

// let chat1 = new Chat({
//     from: "raman",
//     to: "arpita",
//     msg: "Hii, Send me your notes",
//     created_at: new Date(),
// });
// chat1.save().then((res) =>{
// console.log(res);
// })
// .catch((err) => {
//  console.log(err);
// });
// main().catch(err => console.log(err));
app.get("/", (req, res) => {
    res.send("Root is Working");
});
app.listen(8080, () => {
    console.log("Server is running on port 8080");
});
