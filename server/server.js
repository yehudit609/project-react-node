require("dotenv").config()
const express = require("express")
const app = express()
const cors = require("cors")

const { default: mongoose } = require("mongoose")
const corsOptions = require("./config/corsOptions")
const PORT = process.env.PORT || 3260

const connectDB = require("./config/dbConn")
connectDB()

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.static("public"))

app.use("/api/user", require("./routes/user"))
app.use("/api/product", require("./routes/product"))
app.use("/api/order", require("./routes/order"))
app.use("/api/category", require("./routes/category"))
app.use("/api/auth",require("./routes/auth"))
app.use("/api/basket",require("./routes/basket"))



app.use('/uploads', express.static(__dirname + '/public/uploads'));
app.get('/uploads/:filename', (req, res) => {
    const imagePath = path.join(__dirname, '/public/uploads/', req.params.filename);
    res.sendFile(imagePath, { headers: { 'Content-Type': 'image/jpeg' } });
});



app.get("/",(req,res)=>{
    res.send("HomePage")
})

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})

mongoose.connection.on('error', err => {
console.log(err)
})