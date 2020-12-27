const FAVORITES = 'favorites';

const Favourites = (function () {
    const searchList = document.getElementById('search-results-list');

    function renderFavourites() {
        const favouritesData = getFavouriteSuperheroes();
        const indexOfSuperHeroInFavourites = favSuperHeroes.findIndex(
            (hero) => hero.id === element.id
        );

        // First empty the list
        searchList.innerHTML = '';

        if (!favouritesData || favouritesData.length === 0) {
            searchList.innerHTML = '<li>No results found!</li>';
        } else {
            favouritesData.forEach((element) => {
                const li = document.createElement('li');
                li.classList.add('search-result');
                li.innerHTML = `
                      <div class="search-left">
                        <img src=${element.image.url} alt="" />
                      </div>
                      <div class="search-right">
                        <a href="superhero.html?id=${element.id}">
                          <div class="name">${element.name}</div>
                        </a>
                        <div class="full-name">${element.biography['full-name']}</div>
  
                        <div class="address">${element.biography['place-of-birth']}</div>
                        <button class="btn remove-from-fav" data-id=${element.id}>Remove from favourites</button>
                      </div>
                    `;
                searchList.appendChild(li);
            });
        }

        return;
    }

    function getFavouriteSuperheroes() {
        return localStorage.getItem(FAVORITES)
            ? JSON.parse(localStorage.getItem(FAVORITES))
            : [];
    }



    // Add hero to fav
    function addHeroToFavourites(hero) {
        if (!hero) return;

        const favouritesFromLocalStorage = getFavouriteSuperheroes();
        favouritesFromLocalStorage.push(hero);


        localStorage.setItem(
            FAVORITES,
            JSON.stringify(favouritesFromLocalStorage)
        );

    }

    // Remove hero 
    function removeHeroFromFavourites(heroId) {
        if (!heroId) return;

        let favouritesFromLocalStorage = getFavouriteSuperheroes();

        favouritesFromLocalStorage = favouritesFromLocalStorage.filter(
            (item) => item.id !== heroId
        );

        // Save in localstorage
        localStorage.setItem(
            FAVORITES,
            JSON.stringify(favouritesFromLocalStorage)
        );
    }

    //get fav hero
    function getFavouriteSuperheroes() {
        return localStorage.getItem(FAVORITES)
            ? JSON.parse(localStorage.getItem(FAVORITES))
            : [];
    }

    //remove from fav
    function handleDocumentClick(e) {
        const target = e.target;

        if (target.classList.contains('remove-from-fav')) {

            const searchResultClickedId = target.dataset.id;
            removeHeroFromFavourites(searchResultClickedId);
            renderFavourites();
        }
    }

    function init() {
        renderFavourites();
        document.addEventListener('click', handleDocumentClick);


        document.addEventListener('click', function (event) {

            const target = event.target;

            if (target.classList.contains('add-to-fav')) {
                // find hero
                const searchResultClickedId = target.dataset.id;
                const hero = searchResults.filter(
                    (hero) => hero.id === searchResultClickedId
                );
                addHeroToFavourites(hero[0]);
                renderSearchResults();
            } else if (target.classList.contains('remove-from-fav')) {
                // remove hero
                const searchResultClickedId = target.dataset.id;


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
    }

    return {
        init,
    };
})();
