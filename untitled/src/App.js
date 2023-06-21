import {useState} from "react";

const tempMovieData = [
    {
        imdbID: "tt1375666",
        Title: "Inception",
        Year: "2010",
        Poster:
            "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    },
    {
        imdbID: "tt0133093",
        Title: "The Matrix",
        Year: "1999",
        Poster:
            "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
    },
    {
        imdbID: "tt6751668",
        Title: "Parasite",
        Year: "2019",
        Poster:
            "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
    },
];

const tempWatchedData = [
    {
        imdbID: "tt1375666",
        Title: "Inception",
        Year: "2010",
        Poster:
            "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
        runtime: 148,
        imdbRating: 8.8,
        userRating: 10,
    },
    {
        imdbID: "tt0088763",
        Title: "Back to the Future",
        Year: "1985",
        Poster:
            "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
        runtime: 116,
        imdbRating: 8.5,
        userRating: 9,
    },
];


function NavBar({movies}) {
    const [query, setQuery] = useState("");

    return (<nav className="nav-bar">
        <div className="logo">
            <span role="img">🍿</span>
            <h1>usePopcorn</h1>
        </div>
        <input
            className="search"
            type="text"
            placeholder="Search movies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
        />
        <p className="num-results">
            Found <strong>{movies.length}</strong> results
        </p>
    </nav>);
}

function BoxToggle({onClickBoxToggle, toggleIcon}) {
    return (
        <button className='btn-toggle' onClick={onClickBoxToggle}>{toggleIcon}</button>
    );
}

function Box({children}) {
    const [isOpen, setIsOpen] = useState(true);

    function handleOnclickBoxToggle() {
        setIsOpen(open => !open);
    }

    return (
        <div className="box">
            <BoxToggle onClickBoxToggle={handleOnclickBoxToggle} toggleIcon={isOpen ? "–" : "+"}/>
            {isOpen && children}
        </div>
    );
}

function Rating({rating}) {
    return (
        <p>
            <span>⭐</span>
            <span>{rating}</span>
        </p>
    );
}

function Runtime({runtime}) {
    return (
        <p>
            <span>⏳</span>
            <span>{runtime} min</span>
        </p>
    );
}


function Movie({movie, contentsType}) {
    const content = contentsType === 'movie1' ? (<div>
        <p>
            <span>🗓</span>
            <span>{movie.Year}</span>
        </p>
    </div>) : (<div>
        <Rating rating={movie.imdbRating}/>
        <Rating rating={movie.userRating}/>
        <Runtime runtime={movie.runtime}/>
    </div>);

    return (
        <li>
            <img src={movie.Poster} alt={`${movie.Title} poster`}/>
            <h3>{movie.Title}</h3>
            {content}
        </li>
    );

}

function Main({movies, watched}) {

    const average = (arr) =>
        arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

    const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
    const avgUserRating = average(watched.map((movie) => movie.userRating));
    const avgRuntime = average(watched.map((movie) => movie.runtime));

    return (
        <main className="main">
            <Box>
                {
                    <ul className="list">
                        {movies?.map((movie) => (
                            <Movie movie={movie} contentsType='movie1' key={movie.imdbID}/>
                        ))}
                    </ul>
                }
            </Box>
            <Box>
                {
                    <>
                        <div className="summary">
                            <h2>Movies you watched</h2>
                            <div>
                                <p>
                                    <span>#️⃣</span>
                                    <span>{watched.length} movies</span>
                                </p>
                                <p>
                                    <span>⭐️</span>
                                    <span>{avgImdbRating}</span>
                                </p>
                                <p>
                                    <span>🌟</span>
                                    <span>{avgUserRating}</span>
                                </p>
                                <p>
                                    <span>⏳</span>
                                    <span>{avgRuntime} min</span>
                                </p>
                            </div>
                        </div>
                        <ul className="list">
                            {watched.map((movie) =>
                                <Movie movie={movie} contentsType='movie2' key={movie.imdbID}/>
                            )}
                        </ul>
                    </>
                }
            </Box>
        </main>
    )
}

export default function App() {
    const [movies, setMovies] = useState(tempMovieData);
    const [watched, setWatched] = useState(tempWatchedData);


    return (
        <>
            <NavBar movies={movies}/>
            <Main movies={movies} watched={watched}/>
        </>
    );
}