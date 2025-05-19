const quoteContainer = document.getElementById('quote-container');
const quoteButton = document.getElementById('quote-button');
const quoteDisplay = document.getElementById('quote-display');
const quoteAuthor = document.getElementById('quote-author');
const yellow = document.getElementById('yellow');
const black = document.getElementById('black');
const purple = document.getElementById('purple');
const red = document.getElementById('red');
const blue = document.getElementById('blue');

let QuotesArray = [];
let index = -1;

const getQuotes = async () => {
    const response = await fetch('https://dummyjson.com/quotes');
    if (!response.ok) throw new Error(`API error: ${response.status}`);
    const data = await response.json();
    dataArray = data.quotes; 
    
    const res = await fetch('../JSON/quotes.json');
    if (!res.ok) throw new Error(`Local JSON error: ${res.status}`);
    const newData = await res.json();
    newDataArray = newData;

    QuotesArray = [...newDataArray, ...dataArray];
    console.log(QuotesArray);
    
}

getQuotes().then(() => {
    
    quoteButton.addEventListener('click', () => {
        if (QuotesArray.length === 0){
            console.log('error')
        }
        
        index++;
        if(index >= QuotesArray.length){
            index = 0
        }
        
        const quotes = ( QuotesArray[index].quote);
        const author = ( QuotesArray[index].author);
        
        quoteDisplay.textContent = `"${quotes}"`;
        quoteAuthor.textContent = `${author}`;
        
    });
}).catch((error) => {
    console.error('Failed to load quotes:', error);
});



const colors = ['yellow', 'black', 'purple', 'red', 'blue'];

colors.forEach(color => {
  const button = document.getElementById(color);
  button.addEventListener('click', () => {
    document.body.classList.remove(...colors);
    document.body.classList.add(color);
  });
});
