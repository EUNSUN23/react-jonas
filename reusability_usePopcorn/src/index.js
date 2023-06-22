import React, {useState} from 'react';
import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
import StarRating from "./StarRating";

// StarRating의 rating이 컴포넌트 바깥에서도 쓰여야 하는경우.
function Test() {
    const [movieRating, setMovieRating] = useState(0);


    return (
        <div>
            <StarRating maxRating={10} color='blue' onSetRating={setMovieRating}/>
            <div>This movie was rated {movieRating} stars</div>
        </div>
    )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/*<App />*/}
      <StarRating maxRating={5} defaultRating={3} message={['Terrible','Bad','Okay','Good','Amazing']}/>
      <Test/>
  </React.StrictMode>
);

