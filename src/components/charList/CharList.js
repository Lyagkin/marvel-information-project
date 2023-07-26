import { Component } from "react";

import MarvelService from "../../services/MarvelService";

import Spinner from "../spinner/Spinner";
import Page404 from "../page404/Page404";

import "./charList.scss";

class CharList extends Component {
  state = {
    characterList: [],
    loading: true,
    error: false,
  };

  marvelService = new MarvelService();

  characterListLoaded = (characterList) => this.setState({ characterList, loading: false });

  setError = () => {
    this.setState({
      loading: false,
      error: true,
    });
  };

  getCharacterList = () => {
    this.marvelService.getAllCharactersData().then(this.characterListLoaded).catch(this.setError);
  };

  componentDidMount() {
    this.getCharacterList();
  }

  render() {
    let { characterList, loading, error } = this.state;
    const renderedCharacterList = characterList;

    const newCharacterList = renderedCharacterList.map(({ thumbnail, name, id }) => {
      let imgStyleClass;

      if (thumbnail.includes("image_not_available") || thumbnail.includes("gif")) {
        imgStyleClass = `not_available`;
      }
      return (
        <li key={id} className="char__item">
          <img className={imgStyleClass} src={thumbnail} alt={thumbnail} />
          <div className="char__name">{name}</div>
        </li>
      );
    });

    let spinner = loading ? <Spinner /> : null;
    let errorMessage = error ? <Page404 /> : null;
    let content = !loading && !error ? newCharacterList : null;

    let charListStyleClass = "char__list";

    if (loading) {
      charListStyleClass += ` center`;
    }

    return (
      <div className={charListStyleClass}>
        {spinner} {errorMessage}
        <ul className="char__grid">{content}</ul>
        <button className="button button__main button__long">
          <div className="inner">load more</div>
        </button>
      </div>
    );
  }
}

export default CharList;
