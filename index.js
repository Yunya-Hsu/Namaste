const { port, server } = require('./app')

server.listen(port, () => {
  console.log(`server is listen on ${port}`)
})