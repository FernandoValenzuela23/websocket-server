
const socketController = (socket) => {

    console.log('Cliente conectado', socket.id);

    /*socket.on('event', data => { 
        
    });*/

    socket.on('disconnect', () => {
        console.log('Cliente desconectado',socket.id);
    });

    // escuchar mensajes cuando sean enviados al server
    socket.on('enviar-mensaje', (payload, callback) => {
        console.log(payload);
        const id = 'ABC123';
        // este callback se dispara aqui una vez recibido el mensaje, 
        // en el mismo en vez de solo id, se puede mandar objetos tambien
        // y esta dirigido a quien envio el mensaje
        callback(id);
        // Enviar mensaje desde el server a todos los sockets (broadcast)
        socket.broadcast.emit('enviar-mensaje', payload);
    });
}

module.exports = { socketController }