
// Get username and room from url
 const {username,room} = Qs.parse(location.search,{
     ignoreQueryPrefix : true
 })

const socket = io();
const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');

// Join chatroom
socket.emit('joinRoom',{username,room});

// Get room and users
socket.on('roomUsers',({room,users}) =>{
    outputRoomName(room);
    outputUsers(users);
}) 

socket.on('message',(message)=>{
    console.log(message);
    outputMessage(message);

    //Scroll down
    chatMessages.scrollTop = chatMessages.scrollHeight; 
});

// message submit
chatForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    
    const msg = e.target.elements.msg.value;
    console.log(msg);
    // Emiting a message to server
    socket.emit('chatMessage',msg);

    // Clear input
    e.target.elements.msg.value = '';
    e.target.elements.msg.focus();

});

// output message to DOM

function outputMessage(message){
    const div = document.createElement('div');
    div.classList.add('message');

    div.innerHTML = `<p class="meta">${message.username} <span>${message.time}</span></p>
    <p class="text">
        ${message.text}
    </p>`
    document.querySelector('.chat-messages').appendChild(div);
    // console.log("Coming here");
}

// Edit users to the DOM

function outputUsers(users){
    // userList.innerHTML =  `
    // ${users.map(user => `<li>${user.username}</li>`).join('')}
    // `;
    userList.innerHTML = '';
  users.forEach((user) => {
    const li = document.createElement('li');
    li.innerText = user.username;
    userList.appendChild(li);
  });
}

// Edit the roomname in DOM
function outputRoomName(room){
  roomName.innerText = room;
}

//Prompt the user before leave chat room
document.getElementById('leave-btn').addEventListener('click', () => {
    const leaveRoom = confirm('Are you sure you want to leave the chatroom?');
    if (leaveRoom) {
      window.location = '../index.html';
    } else {
    }
  });