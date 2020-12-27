const url = `https://www.superheroapi.com/api.php/10219177700206566/`;
const searchBox = document.getElementById('name');
const searchList = document.getElementById('search-result');
let searchResults = [];
const SEARCH_TEXT_LIMIT = 2;
const loader = document.getElementById('loader');
const FAVORITES = 'favorites.js';

function initializeSuperHeroApp() {

    document.addEventListener('click', function (event) {
      renderSearchResults();
    });

    searchBox.addEventListener('keyup', async function (event) {


        if (event.target.value.length <= SEARCH_TEXT_LIMIT) {
            searchList.innerHTML = '';
            searchResults = [];
            return;
        }

        // Show loader and remove existing search results

        loader.style.display = 'block';

        searchList.innerHTML = '';
        searchResults = [];

        try {
            const data = await apiRequest(`${url}/search/${event.target.value}`);
            loader.style.display = 'none';

            if (data.success) {
                searchResults = data.data.results;
                renderSearchResults();
            }
        } catch (error) {
            console.log('error', error);
            loader.style.display = 'none';
        }
    });

}



function renderSearchResults() {
    // If data is empty warn the user
    if (!searchResults || searchResults.length === 0) {
        searchList.innerHTML = '<li class="no-results">No results found!</li>';
        return;
    }

    const favSuperHeroes = getFavouriteSuperheroes();
    searchList.innerHTML = '';

    // Append each search result in the list
    searchResults.forEach((element) => {
        const li = document.createElement('li');
        
        li.classList.add('search-result');
        li.innerHTML = `
                        <a href="hero.html?id=${element.id}">
                          <div class="name">${element.name}</div>
                        </a>
                        `;
        searchList.appendChild(li);
    });
}

/* Send api requests */
async function apiRequest(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();

        return {
            data,
            success: true,
        };
    } catch (error) {
        console.log('error', error);
        return {
            error: error.message,
            success: false,
        };
    }
}

  
initializeSuperHeroApp();

