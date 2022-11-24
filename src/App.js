import { useState } from 'react';
import { allHeroes } from './HeroData';
import './App.css';

const App = () => {
  // create state for favourite heroes and array to store all heroes in
  const [favourites, setFavourites] = useState([]);

  // function adds heroes to favourites array. Creates copy of favourites array from state, adds a selected 
  // item to the favourites array, then updates state to new array
  const handleAddtoFav = (hero) => {
    let newFavArr = [...favourites];
    newFavArr.push(hero);
    setFavourites(newFavArr);
  }


  // function removes item from favourite array by copying the array in the state, removing the item by 
  // the selected index, then updating the state to the new array
  const handleRemove = (index) => {
    let newFavArr = [...favourites];
    newFavArr.splice(index, 1);
    setFavourites(newFavArr);
  }

  return (
    <>
      <h1>HERO INFORMATION</h1>

      <div id="favSection">
        <h3>FAVOURITE HEROES:</h3>
        <div id="favCardWrapper">
          {/* Map through the favourite array and render the Favourites component while passing the hero
              data and the function to remove an item */}
          {favourites.map((favHero, index) => {
            return <Favourites key={index} removeFav={() => handleRemove(index)} favHeroData={favHero} />
          })}
        </div>
      </div>

      <h3>ALL HEROES</h3>
      {/* Map through the imported heroData array and render the HeroCard component while passing the hero
          data and the function to add an item to favourites */}
      {allHeroes.map((heroInfo, index) => {
        return <HeroCard key={index} heroObj={heroInfo} favFunc={handleAddtoFav} />
      })}
    </>
  );
}

// Favourites Component
// destructuring the props object rather than using the entire props object
const Favourites = ({ favHeroData, removeFav }) => {

  return (
    <div className="favCard">
      <p>{favHeroData.hero}</p>
      <button onClick={removeFav}>X</button>
    </div>
  )
}

// Hero Card component
const HeroCard = (props) => {
  // state values to control if more nifo is visble and if animation is running
  const [show, setShow] = useState(false);
  const [animation, setAnimation] = useState(false);

  // run function to add hero to favourites array on click as well as adding wobble class which runs animation
  const addToFav = () => {
    props.favFunc(props.heroObj);
    setAnimation(true);
  }

  return (
    <>
      <p>HERO: {props.heroObj.hero}</p>

      {/* show more information if show is true */}
      {show && (
        <div>
          <p>INFO: {props.heroObj.info}</p>
          <p>VILLAIN: {props.heroObj.villain}</p>
        </div>
      )}

      {/* change button text depending on if more info is displayed or not, and change show state onClick */}
      <button onClick={() => setShow(!show)}>{show ? "HIDE INFO" : "SHOW INFO"}</button>
      {/* wobble class is removed when animation is finished */}
      <button 
        onClick={addToFav}
        onAnimationEnd={() => setAnimation(false)}
        className={animation ? "wobble" : ""}
      >ADD TO FAVOURITES</button>
    </>
  )
}

export default App;