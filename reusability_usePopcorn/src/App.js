import {useEffect, useRef, useState} from "react";
import StarRating from "./StarRating";
import {useMovies} from "./useMovies";
import {useLocalStorageState} from "./useLocalStorageState";
import {useKey} from "./useKey";

const KEY = '151bf98b';
// 151bf98b
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

const average = (arr) =>
    arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);


function Movie({movie, onSelectMovie}) {
    return (
        <li onClick={() => onSelectMovie(movie.imdbID)}>
            <img src={movie.Poster} alt={`${movie.Title} poster`}/>
            <h3>{movie.Title}</h3>
            <div>
                <p>
                    <span>📆</span>
                    <span>{movie.Year}</span>
                </p>
            </div>
        </li>
    );
}

function MovieList({movies, onSelectMovie, onCloseMovie}) {
    return (
        <ul className="list list-movies">
            {movies?.map(movie =>
                <Movie movie={movie} key={movie.imdbID} onSelectMovie={onSelectMovie}/>
            )}
        </ul>
    );
}

function Box({children}) {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className="box">
            <button className="btn-toggle"
                    onClick={() => setIsOpen((open) => !open)}>
                {isOpen ? "-" : "+"}
            </button>
            {isOpen && children}
        </div>
    )
}

function MovieDetails({selectedId, onCloseMovie, onAddWatched, watched}) {
    const [movie, setMovie] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [userRating, setUserRating] = useState("");


    const countRef = useRef(0);

    // 유저가 평점 매길때마다 count
    useEffect(function () {
        if (userRating) countRef.current = countRef.current + 1;
    }, [userRating]);

    const {
        Title: title,
        Year: year,
        Poster: poster,
        Runtime: runtime,
        imdbRating,
        Plot: plot,
        Released: released,
        Actors: actors,
        Director: director,
        Genre: genre
    } = movie;

    function handleAdd() {
        const newWatchedMovie = {
            imdbId: selectedId,
            title,
            year,
            poster,
            imdbRating: Number(imdbRating),
            runtime: runtime.split(" ").at(0),
            userRating,
            countRatingDecisions: countRef.current
        }
        onAddWatched(newWatchedMovie);
        onCloseMovie();
    }

    useKey("Escape", onCloseMovie);

    useEffect(function () {
        async function getMovieDetails() {
            setIsLoading(true);
            const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`);
            const data = await res.json();
            setMovie(data);
            setIsLoading(false);
        }

        getMovieDetails();
    }, [selectedId]);
    // App에서 selectedId초기화시켜서 아예 인스턴스가 트리구조상에서 제거되지 않는 이상, 이 인스턴스는 재렌더링시에도 재생성 되지 않는다. 즉, 마운트를 더이상 겪지 않는다.
    // --> dependency array를 빈배열로 남겨두면 재렌더링이 일어나서 다른 selectedId를 넘겨받아도 이펙트 실행(데이터 fetch)을 하지 않는다.
    // --> 따라서 selectedId 변화에 따라서 이펙트 실행되도록 dependency array에 selectedId 추가.

    // 페이지 title 바꾸기 - 애플리케이션 바깥의 element 바꾸는 것이므로 사이드이펙트라서 useEffect 안에서 처리.
    useEffect(function () {
        if (!title) return;
        document.title = `Movie | ${title}`;

        return function () {
            document.title = "usePopcorn";
            // console.log(`Clean up effect for movie ${title}`); // 컴포넌트가 unmount된 후 실행됨에도 불구하고, closure함수라서 title을 기억하고 있다.
        };
    }, [title]);

    const isWatched = watched.find(movie => movie.imdbId === selectedId);

    return (
        <div className="details">
            {isLoading ? <Loader/> : (
                <>
                    <header>
                        <button className="btn-back" onClick={onCloseMovie}>&larr;</button>
                        {selectedId}
                        <img src={poster} alt={`Poster of ${movie} movie`}/>
                        <div className="details-overview">
                            <h2>{title}</h2>
                            <p>{released} &bull; {runtime}</p>
                            <p>{genre}</p>
                            <p><span>⭐</span>{imdbRating}IMDB rating</p>
                        </div>
                    </header>
                    <section>

                        <div className="rating">
                            {!isWatched ?
                                <>
                                    <StarRating maxRating={10} size={24} onSetRating={setUserRating}/>
                                    {userRating > 0 && (
                                        <button className="btn-add" onClick={handleAdd}>+ Add to list</button>)}
                                </>
                                : <p>You rated this movie
                                    with {watched.find(movie => movie.imdbId === selectedId)?.userRating} <span>🌟</span>
                                </p>}
                        </div>

                        <p><em>{plot}</em></p>
                        <p>Starring {actors}</p>
                        <p>Directed by {director}</p>
                    </section>
                </>
            )}
        </div>
    )
}

function WatchedSummary({watched}) {

    const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
    const avgUserRating = average(watched.map((movie) => movie.userRating));
    const avgRuntime = average(watched.map((movie) => movie.runtime));

    return (
        <div className="summary">
            <h2>Movies you watched</h2>
            <div>
                <p>
                    <span>📽️</span>
                    <span>{watched.length} movies</span>
                </p>
                <p>
                    <span>⭐</span>
                    <span>{avgImdbRating.toFixed(2)}</span>
                </p>
                <p>
                    <span>🌟</span>
                    <span>{avgUserRating.toFixed(2)}</span>
                </p>
                <p>
                    <span>🕐</span>
                    <span>{avgRuntime} min</span>
                </p>
            </div>
        </div>
    )
}

function WatchedMovie({movie, onDeleteWatched}) {
    return (
        <li>
            <img src={movie.poster} alt={`${movie.title} poster`}/>
            <h3>{movie.title}</h3>
            <div>
                <p>
                    <span>⭐</span>
                    <span>{movie.imdbRating}</span>
                </p>
                <p>
                    <span>🌟</span>
                    <span>{movie.userRating}</span>
                </p>
                <p>
                    <span>🕐</span>
                    <span>{movie.runtime} min</span>
                </p>

                <button className="btn-delete" onClick={() => onDeleteWatched(movie.imdbId)}>X</button>
            </div>
        </li>
    )
}

function WatchedMovieList({watched, onDeleteWatched}) {
    return (
        <ul className="list">
            {watched.map(movie => (
                <WatchedMovie movie={movie} key={movie.imdbID} onDeleteWatched={onDeleteWatched}/>
            ))}
        </ul>
    )
}

function Main({children}) {
    return (
        <main className="main">
            {children}
        </main>
    )
}

function Logo() {
    return (
        <div className="logo">
            <span role="img">🍿</span>
            <h1>usePopcorn</h1>
        </div>
    );
}

function NumResults({num}) {
    return (
        <p className="num-results">
            Found <strong>{num}</strong> results
        </p>
    );
}

function Search({query, setQuery}) {
    const inputEl = useRef(null); // 초기값 - null

    useKey("Enter", function () {
        if (document.activeElement === inputEl.current) return;  // 이미 focus된 상태면 return
            inputEl.current.focus();
            setQuery("");
    });

    return (
        <input
            className="search"
            type="text"
            placeholder="Search movies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            ref={inputEl}
        />
    );
}


function NavBar({children}) {
    return (
        <nav className="nav-bar">
            {children}
        </nav>
    );
}


export default function App() {
    const [query, setQuery] = useState("");
    const [selectedId, setSelectedId] = useState(null);
    const {movies, isLoading, error} = useMovies(query);
    const [watched, setWatched] = useLocalStorageState([], "watched");

    function handleSelectMovie(id) {
        setSelectedId(selectedId => selectedId === id ? null : id);
    }

    function handleCloseMovie() {
        setSelectedId(null);
    }

    function handleAddWatchedMovie(movie) {
        setWatched(watched => [...watched, movie]);
    }

    function handleDeleteWatchedMovie(id) {
        setWatched(watched => watched.filter(movie => movie.imdbId !== id))
    }


    return (
        <>
            <NavBar>
                <Logo/>
                <Search query={query} setQuery={setQuery}/>
                <NumResults num={movies.length}/>
            </NavBar>
            <Main>
                <Box>
                    {/*{isLoading ? <Loader/> : <MovieList movies={movies}/>}*/}
                    {isLoading && <Loader/>}
                    {!isLoading && !error && <MovieList movies={movies} onSelectMovie={handleSelectMovie}/>}
                    {error && <ErrorMessage message={error}/>}
                </Box>
                <Box>
                    {selectedId ? <MovieDetails selectedId={selectedId}
                                                onCloseMovie={handleCloseMovie}
                                                onAddWatched={handleAddWatchedMovie}
                                                watched={watched}
                        /> :
                        (<>
                            <WatchedSummary watched={watched}/>
                            <WatchedMovieList watched={watched} onDeleteWatched={handleDeleteWatchedMovie}/>
                        </>)
                    }
                </Box>
            </Main>
        </>
    );
}

function Loader() {
    return (<p className="loader">Loading...</p>)
}

function ErrorMessage({message}) {
    return (<p className="error"><span>⛔</span> {message}</p>)
}