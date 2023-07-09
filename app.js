const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
mongoose.connect("mongodb://localhost:27017/todolist");

const todolistschema = mongoose.Schema(
    {
        name: String,
        ischecked: Boolean
    }
);
const todolistCollection = mongoose.model("list", todolistschema);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.post("/post", (req, res) => {
    if (req.method == "POST") {
        console.log(req.body);
        const name1 = req.body.name;
        const checked = req.body.isChecked;
        const newitem = todolistCollection({
            name: name1,
            ischecked: checked
        });
        newitem.save();
        console.log(name1);
        console.log(checked);
    }

});
app.get("/getList", (req, res) => {
    try {
        const items = todolistCollection.find().then(
            (listItems) => {
                res.json(listItems);
            }
        );
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error" });
    }
});
app.delete("/delete", (req, res) => {
    console.log(req.body);
    const id = req.body.id;
    console.log(id);
    todolistCollection.deleteOne({ _id: id }).then(err=>{
        console.log(err);
    });
    console.log("deleted");
});
app.listen(3000, () => {
    console.log("server is runnig on port 3000");
})