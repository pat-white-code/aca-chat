clientId = 0;
let onloadOptions = {
  method: 'POST'
}

window.onload = () => {
  fetch('/clients', onloadOptions)
    .then(id => clientId = id);
}

const message = document.getElementById('message');
const send = document.getElementById('send');

send.addEventListener('click', ()=>{
  let text = message.value;
  let options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: {
      clientId: clientId,
      text: text
    }
  }
  //bodyJSON.stringify
  fetch('/messages', options)
});

async function fetchMessages() {
  let response = await fetch('/messages');
  let messages = await response.json();
  let messageDiv = document.getElementById('messages');
  console.log(messages);
  messageDiv.innerHTML = '';
  messages.forEach(message => {
    let p = document.createElement('p');
    p.innerHTML = `User: ${message.clientId}: ${message.text}`;
    messageDiv.appendChild(p);
  })
}

setInterval(fetchMessages, 1000);
