const express = require('express')
const app = express()
const http = require('http').createServer(app)      

const PORT = process.env.PORT || 3000

http.listen(PORT, () => {
    console.log(`Listening on port http://localhost:${PORT}`)
})

app.use(express.static(__dirname + '/public'))    // setting public folder as static

// this is the routing or api 
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

// Socket 
const io = require('socket.io')(http)

io.on('connection', (socket) => {
    console.log('Connected...')
    socket.on('message', (msg) => {
        socket.broadcast.emit('message', msg)
    })

})

