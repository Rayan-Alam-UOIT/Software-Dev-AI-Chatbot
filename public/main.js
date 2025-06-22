const chatLog = document.getElementById('chat-log');
const userInput = document.getElementById('user-input');
function sendMessage() {
    const message = userInput.value;
    // Display user's message
    displayMessage('user', message);
    // Call OpenAI API to get chatbot's response
    getChatbotResponse(message);
    // Clear user input
    userInput.value = '';
}
function displayMessage(sender, message) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', sender);
    
    // Create sender indicator
    const senderIndicator = document.createElement('span');
    senderIndicator.classList.add('sender-indicator');
    senderIndicator.textContent = sender === 'user' ? 'You: ' : 'AI: ';
    senderIndicator.style.fontWeight = 'bold';
    
    // Wrap the message in a <p> tag
    const messageParagraph = document.createElement('p');
    messageParagraph.prepend(senderIndicator); // Add indicator before message
    messageParagraph.append(message); // Add the message text
    
    // Append the <p> tag to the message element
    messageElement.appendChild(messageParagraph);
    chatLog.appendChild(messageElement);
    
    // Scroll to bottom
    chatLog.scrollTop = chatLog.scrollHeight;
}
function getChatbotResponse(userMessage) {
    // Make a request to your server with the user's message
    fetch('/getChatbotResponse', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userMessage }),
    })
    .then(response => response.json())
    .then(data => {
        // Display chatbot's response
        displayMessage('chatbot', data.chatbotResponse);
    })
    .catch(error => console.error('Error:', error));
}
// Allow sending message with Enter key (but allow Shift+Enter for new line)
document.getElementById('user-input').addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault(); // Prevent new line in input field
        sendMessage();
    }
});
// Click handler for send button
document.querySelector('.input-container button').addEventListener('click', sendMessage);