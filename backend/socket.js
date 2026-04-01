const express=require("express")
const app=express()
const cors=require("cors")
const http=require("http")
const { Server }=require("socket.io")

app.use(cors())
app.use(express.json())

const server=http.createServer(app)

const io = new Server(Server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("user connected",(socket)=>{
    console.log("user conncted",socket.id)
})

socket.on("send_message",(data)=>{
    console.log("message recevid",data)

    io.emit("recive_message",data)
})

io.on("user dissconect",()=>{
    console.log("user dissonect",socket.id)
})

app.listen(300,()=>{
    console.log("sever running on port 300");
})