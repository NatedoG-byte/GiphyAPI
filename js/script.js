console.log("script.js loaded");

const API_KEY = "https://api.giphy.com/v1/gifs/search?api_key=YOUR_API_KEY&q=dogs&limit=10&rating=g" 
const BASE_URL = "https://api.giphy.com/v1/gifs/search";


let images = [];

async function fetchGifs(query = "dogs") {
  try {
   
    const endpoint = `${BASE_URL}?api_key=${API_KEY}&q=${query}&limit=10&rating=g`;

    const response = await fetch(endpoint);
    const data = await response.json();


    images = data.data.map(gif => gif.images.original.url);

    console.log(`Fetched ${images.length} GIFs for "${query}":`, images);
  } catch (error) {
    console.error("Error fetching GIFs:", error);
  }
}


const gifContainer = document.querySelector("#gif-container");
const fetchButton = document.querySelector("#fetch-gif-btn");
const searchInput = document.querySelector("#search-input");


fetchButton.addEventListener("click", async () => {
 
  let query = searchInput.value.trim() || "dogs";

  
  await fetchGifs(query);

 
  gifContainer.innerHTML = "";

  for (let imageUrl of images) {
    gifContainer.innerHTML += `<img src="${imageUrl}" class="col-3 mb-3">`;
  }
});
