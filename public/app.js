// Get references to DOM elements by their IDs
const quoteContainer = document.getElementById('quote-container'); // Container holding the quote section
const quoteButton = document.getElementById('quote-button');       // Button to generate new quote
const quoteDisplay = document.getElementById('quote-display');     // Element to show the quote text
const quoteAuthor = document.getElementById('quote-author');       // Element to show the quote author

// Buttons to change page background color
const yellow = document.getElementById('yellow');
const black = document.getElementById('black');
const purple = document.getElementById('purple');
const red = document.getElementById('red');
const blue = document.getElementById('blue');

// Array to hold all quotes from both API and local JSON file
let QuotesArray = [];
// Index to keep track of the current quote shown, initialized to -1 before first quote
let index = -1;

// Async function to fetch quotes from an external API and a local JSON file
const getQuotes = async () => {
    // Fetch quotes from external API
    const response = await fetch('https://dummyjson.com/quotes');
    if (!response.ok) throw new Error(`API error: ${response.status}`);  // Throw error if fetch fails
    const data = await response.json();  // Parse response JSON
    const dataArray = data.quotes;        // Extract quotes array from API response
    
    // Fetch quotes from local JSON file
    const res = await fetch('/quotes.json');
    if (!res.ok) throw new Error(`Local JSON error: ${res.status}`);    // Throw error if local fetch fails
    const newData = await res.json();        // Parse local JSON
    const newDataArray = newData;             // Assume local JSON is an array of quotes
    
    // Combine both arrays of quotes into one array
    QuotesArray = [...newDataArray, ...dataArray];
    console.log(QuotesArray); // Log the combined array for debugging
}

// Call getQuotes to load the quotes, then add event listener to button
getQuotes().then(() => {
    
    // When quoteButton is clicked, show the next quote in the QuotesArray
    quoteButton.addEventListener('click', () => {
        // If QuotesArray is empty, log error and return early
        if (QuotesArray.length === 0){
            console.error('Error: QuotesArray is empty');
            return;
        }
        
        index++; // Increment index to move to the next quote
        
        // If index exceeds the last quote index, loop back to the start (0)
        if(index >= QuotesArray.length){
            index = 0;
        }
        
        // Extract quote text and author from current quote object
        const quotes = QuotesArray[index].quote;
        const author = QuotesArray[index].author;
        
        // Update the page with the new quote and author
        quoteDisplay.textContent = `"${quotes}"`;
        quoteAuthor.textContent = `${author}`;
    });
}).catch((error) => {
    // Log any errors that occur during quote fetching
    console.error('Failed to load quotes:', error);
});

// Array of color class names used for changing background colors
const colors = ['yellow', 'black', 'purple', 'red', 'blue'];

// Loop through each color button, add click event to change body background color
colors.forEach(color => {
  const button = document.getElementById(color);
  
  // When a color button is clicked
  button.addEventListener('click', () => {
    // Remove all color classes from body
    document.body.classList.remove(...colors);
    // Add the clicked color class to body
    document.body.classList.add(color);
  });
});
