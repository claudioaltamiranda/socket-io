const socket = io();

const spanConnected = document.querySelector('#spanConnected');
const spanDisconnected = document.querySelector('#spanDisconnected');
const txtInput = document.querySelector('#txtInput');
const btnEnviar = document.querySelector('#btnEnviar');
const lblOutput = document.querySelector('#lblOutput');

socket.on('connect', () => {
  lblOutput.textContent += '\nConectado!';
  spanConnected.style.display = '';
  spanDisconnected.style.display = 'none';
});

socket.on('disconnect', () => {
  lblOutput.textContent += '\nDesconectado!';
  spanDisconnected.style.display = '';
  spanConnected.style.display = 'none';
});

socket.on('mensaje', (payload) => {
  lblOutput.textContent += `\n${payload}`;
});

btnEnviar.addEventListener('click', () => {
  const payload = {
    texto: txtInput.value,
    fecha: new Date().getTime(),
  };
  socket.emit('mensaje', payload, (status) => {
    lblOutput.textContent += `\n${status}!`;
  });
});
