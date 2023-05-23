
const online = document.querySelector('#online-text');
const offline = document.querySelector('#offline-text');

const txtMensaje =document.querySelector('#txtMensaje');
const btnEnviar =document.querySelector('#btnEnviar');

const socket = io();

// escuchar conexiones
socket.on('connect', () => {
    document.getElementById('online-text').style.display = 'block';
    document.getElementById('offline-text').style.display = 'none';
    console.log('Conectado...');
});

socket.on('disconnect', () => {
    /* Forma antigua
    document.getElementById('online-text').style.display = 'none';
    document.getElementById('offline-text').style.display = 'block';
    */

    // forma moderna    
    online.style.display = 'none';
    offline.style.display = 'block';


    console.log('Desconectado...');
});

socket.on('enviar-mensaje', (payload) => {
    console.log(payload)
})


btnEnviar.addEventListener('click', () => {
    const mensaje = txtMensaje.value;
    
    const payload = {
        id: '123',
        mensaje
    }
    // enviar mensaje al server
    socket.emit('enviar-mensaje', payload, (id) => {
        console.log('Desde el server: ', id);
    });
});

