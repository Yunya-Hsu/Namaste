module.exports = io => {
  io.on('connection', socket => {
    socket.on('joinRoom', message => {
      socket.join(message.courseDetailId)
      io.sockets.to(message.courseDetailId).emit(message.courseDetailId, message)
    })

    socket.on('peerConnectSignaling', message => {
      // io.sockets.in(message.roomId).emit(message.roomId, message)
      socket.broadcast.to(message.courseDetailId).emit(message.courseDetailId, message)
    })
  })
}
