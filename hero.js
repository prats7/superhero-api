const SuperHero = (function () {
    const card = document.getElementById('super-card');

    const FAVORITES = "favorites.js"

//query params
    function getQueryParameter(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }

    function renderSuperHeroDetails(data) {
        const indexOfSuperHeroInFavourites = favSuperHeroes.findIndex(
            (hero) => hero.id === element.id
        );
        if (!data) {
            card.innerHTML =
                'Can not laod the superhero, please try again!';
            return;
        }
        card.innerHTML = `                    
                                            <h1>${data.name}</h1>
                                            <h3>${data.biography['full-name']}</h3>
  
                                            <div class="details">
                                              <div><span> Strength </span> <span> ${data.powerstats.strength}</span></div>
                                              <div><span> Speed </span> <span> ${data.powerstats.speed}</span></div>
                                              <div><span> Durability </span> <span> ${data.powerstats.durability}</span></div>
                                              <div><span> Power </span> <span>${data.powerstats.power}</span></div>
                                              <div><span> Combat </span> <span>${data.powerstats.combat}</span></div>
                                            </div>
                                            <img src=${data.image.url} alt="" />
                                            <button class="btn add-to-fav" data-id=${element.id
            } style="display: ${indexOfSuperHeroInFavourites === -1 ? 'block' : 'none'
            }">Add to favourites</button>
                                              <button class="btn remove-from-fav" data-id=${element.id
            }  style="display: ${indexOfSuperHeroInFavourites === -1 ? 'none' : 'block'
            }">Remove from favourites</button>
                                      
                              
                                          `;
    }

    function getFavouriteSuperheroes() {
        return localStorage.getItem(FAVORITES)
            ? JSON.parse(localStorage.getItem(FAVORITES))
            : [];
    }





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


    /* Fetch data of a superhero with character id as 'id' */
    async function fetchSuperHeroData(id) {
        const url = `https://www.superheroapi.com/api.php/10219177700206566/`;

        try {
            const data = await apiRequest(`${url}/${id}`);

            if (data.success) {
                renderSuperHeroDetails(data.data);
            } else {
                renderSuperHeroDetails(null);
            }
        } catch (error) {
            console.log('error', error);
            renderSuperHeroDetails(null);
        }
    }



    /* Initialize the module */
    function init() {
        const heroId = getQueryParameter('id');

        fetchSuperHeroData(heroId);

    }

    return {
        init,
    };
})();
