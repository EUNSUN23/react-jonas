import {useEffect, useState} from "react";

const KEY = '151bf98b';

export function useMovies(query) {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");


    useEffect(function () {
        const controller = new AbortController(); // WEB API. 리액트와 상관없음.
        async function fetchMovies() {
            try {
                setIsLoading(true);
                setError("");
                const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=${query}`, {signal: controller.signal});

                if (!res.ok) throw new Error("Sth went wrong with fetching movies");

                const data = await res.json();
                if (data.Response === "False") throw new Error("Movie not Found");

                setMovies(data.Search);
            } catch (e) {
                // fetch취소 에러는 에러로 출력하지 않도록.
                if (e.name !== "AbortError") setError(e.message);
            } finally {
                setIsLoading(false);
            }
        }

        if (query.length < 3) {
            setMovies([]);
            setError("");
            return;
        }
        // handleCloseMovie();
        fetchMovies();

        return function () { // query가 바뀌어서 다음 실행이 이뤄지기 직전에 실행된다.
            controller.abort(); // 현재 fetch를 취소한다. --> 결국에는 query가 더 이상 바뀌지 않을때까지 일어나는 모든 fetch 취소시킴.
        };
    }, [query]);

    return {movies, isLoading, error};
}