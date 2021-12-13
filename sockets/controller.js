const socketController = (socket) => {
  console.log(`Cliente: ${socket.id} conectado!`);

  socket.on('disconnect', () => {
    console.log(`Cliente: ${socket.id} desconectado!`);
  });

  socket.on('mensaje', (payload, callback) => {
    console.log(payload);
    callback('Recibido');
    socket.broadcast.emit('mensaje', JSON.stringify(payload));
  });
};

module.exports = {
  socketController,
};
