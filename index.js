const url = `https://www.superheroapi.com/api.php/10219177700206566/`;
const searchBox = document.getElementById('name');
const searchList = document.getElementById('search-result');
let searchResults = [];
const SEARCH_TEXT_LIMIT = 2;
const loader = document.getElementById('loader');
const FAVORITES = 'favorites.js';

function initializeSuperHeroApp() {

    document.addEventListener('click', function (event) {

        const target = event.target;

    if (target.classList.contains('add-to-fav')) {
      // Find the hero data and store it in favourites and localstorage
      const searchResultClickedId = target.dataset.id;
      const hero = searchResults.filter(
        (hero) => hero.id === searchResultClickedId
      );
      addHeroToFavourites(hero[0]);
      renderSearchResults();
    } else if (target.classList.contains('remove-from-fav')) {
      // Find the hero data and remove from local storage
      const searchResultClickedId = target.dataset.id;

      // Show add to fav button and hide the remove from fav button
      const addToFavBtn = document.querySelector(
        `button[data-id="${searchResultClickedId}"].add-to-fav`
      );
      if (addToFavBtn) addToFavBtn.style.display = 'block';

      const removeFromFavBtn = document.querySelector(
        `button[data-id="${searchResultClickedId}"].remove-from-fav`
      );
      if (removeFromFavBtn) removeFromFavBtn.style.display = 'none';

      removeHeroFromFavourites(searchResultClickedId);
    }
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
        // Find if superhero exists in favourites
        const indexOfSuperHeroInFavourites = favSuperHeroes.findIndex(
            (hero) => hero.id === element.id
        );
        li.classList.add('search-result');
        li.innerHTML = `
                        <a href="hero.html?id=${element.id}">
                          <div class="name">${element.name}</div>
                        </a>
                        <button class="btn add-to-fav" data-id=${
                          element.id
                        } style="display: ${
          indexOfSuperHeroInFavourites === -1 ? 'block' : 'none'
        }">Add to favourites</button>
                        <button class="btn remove-from-fav" data-id=${
                          element.id
                        }  style="display: ${
          indexOfSuperHeroInFavourites === -1 ? 'none' : 'block'
        }">Remove from favourites</button>
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

  function getFavouriteSuperheroes() {
    return localStorage.getItem(FAVORITES)
      ? JSON.parse(localStorage.getItem(FAVORITES))
      : [];
  }



     /* Add hero to localstorage */
     function addHeroToFavourites(hero) {
      if (!hero) return;
  
      const favouritesFromLocalStorage = getFavouriteSuperheroes();
      favouritesFromLocalStorage.push(hero);
  
      // Save in localstorage
      localStorage.setItem(
        FAVORITES,
        JSON.stringify(favouritesFromLocalStorage)
      );
  
    }
  
    /* Remove hero from localstorage */
    function removeHeroFromFavourites(heroId) {
      if (!heroId) return;
  
      let favouritesFromLocalStorage = getFavouriteSuperheroes();
  
      // Remove hero from localstorage
      favouritesFromLocalStorage = favouritesFromLocalStorage.filter(
        (item) => item.id !== heroId
      );
  
      // Save in localstorage
      localStorage.setItem(
        FAVORITES,
        JSON.stringify(favouritesFromLocalStorage)
      );
    }
  
    /* Get fav superheroes from the local storage */
    function getFavouriteSuperheroes() {
      return localStorage.getItem(FAVORITES)
        ? JSON.parse(localStorage.getItem(FAVORITES))
        : [];
    }
  
  
initializeSuperHeroApp();

