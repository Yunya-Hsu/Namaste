module.exports = io => {
  io.on('connection', socket => {
    console.log(`socket 用戶連接 ${socket.id}`)

    socket.on('joinRoom', message => {
      socket.join(message.courseDetailId)
      io.sockets.to(message.courseDetailId).emit(message.courseDetailId, message)
    })

    socket.on('peerConnectSignaling', message => {
      // io.sockets.in(message.roomId).emit(message.roomId, message)
      socket.broadcast.to(message.courseDetailId).emit(message.courseDetailId, message)
    })

    socket.on('disconnect', () => {
      console.log(`socket 用戶離開 ${socket.id}`)
    })
  })
}
