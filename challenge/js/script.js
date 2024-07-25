function navigateToAnswer() {
    const answer = document.getElementById('answerInput').value.trim().toLowerCase();
    
    if (answer) {
        // Remove any non-alphanumeric characters and spaces
        const cleanAnswer = answer.replace(/[^a-z0-9]/g, '');
        
        // Construct the URL
        const newUrl = `https://amirbagaon.github.io/challenge/${cleanAnswer}.html`;
        
        // Navigate to the new URL
        window.location.href = newUrl;
    } else {
        alert('נא להזין תשובה'); // Please enter an answer
    }
}

// Allow submitting by pressing Enter
document.getElementById('answerInput').addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        navigateToAnswer();
    }
});