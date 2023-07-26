class MarvelService {
  #apiBaseUrl = "https://gateway.marvel.com:443/v1/public";
  #apiPublicKey = "apikey=4a4925b838851c7de398b4ffaf6ece12";

  getMarvelCharactersData = async (url) => {
    try {
      let responce = await fetch(url);

      if (!responce.ok) {
        throw new Error(`Could not fetch ${url}, status: ${responce.status}`);
      }

      return await responce.json();
    } catch (e) {
      // console.log(e.name);
      return e.name;
    }
  };

  getAllCharactersData = async () => {
    const allCharactersData = await this.getMarvelCharactersData(
      `${this.#apiBaseUrl}/characters?limit=9&offset=210&${this.#apiPublicKey}`
    );

    return allCharactersData.data.results.map((characterList) => {
      const emptyArray = [];

      return this._transformCharactersData(emptyArray.concat(characterList));
    });
  };

  getCharactersDataById = async (charactersId) => {
    const charactersDataById = await this.getMarvelCharactersData(
      `${this.#apiBaseUrl}/characters/${charactersId}?${this.#apiPublicKey}`
    );

    return this._transformCharactersData(charactersDataById.data.results);
  };

  _transformCharactersData = (charactersData) => {
    return {
      id: charactersData.map((character) => character.id).join(),
      name: charactersData.map((character) => character.name).join(),
      thumbnail: charactersData
        .map((character) => `${character.thumbnail.path}.${character.thumbnail.extension}`)
        .join(),
      description: charactersData.map((character) => character.description).join(),
      homepage: charactersData.map((character) => character.urls[0].url).join(),
      wiki: charactersData.map((character) => character.urls[1].url).join(),
    };
  };
}

export default MarvelService;
