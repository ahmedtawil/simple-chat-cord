
const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const usersList = document.getElementById('users');

// Get username and room from URL
const {username , room} = Qs.parse(location.search , {
    ignoreQueryPrefix:true
})

const socket = io();

// Join chatroom
socket.emit('joinRoom' , {username , room});

// Get room and users
socket.on('roomUsers' , ({room , users})=>{
    outputRoomName(room);
   outputUsersList(users);

})

// Message from server
socket.on('message' , msg =>{
    outputMsg(msg);

      // Scroll down
    chatMessages.scrollTop = chatMessages.scrollHeight;
})

// Pure JavaScript
document.getElementById('btn').addEventListener('click' , ()=>{
    const msg =document.getElementById('msg').value;
    socket.emit('chatMessage' , msg);
    document.getElementById('msg').value = '';
    document.getElementById('msg').focus();
})
// Message submit

function outputMsg(m){
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<div class="message">
    <p class="meta"> ${m.userName} : <span>${m.time}</span></p>
    <p class="text">
        ${m.text}
    </p>
    </div>`
    document.querySelector('.chat-messages').appendChild(div);

}
// Add room name to DOM
function outputRoomName(room){
    roomName.innerHTML = room;
}
// Add users to DOM
function outputUsersList(ul){
    usersList.innerHTML = `${
        ul.map(user=>`<li>${user.username}</li>`).join('')
        
    }`

}