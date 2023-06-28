## Custom Hook

✅ 특정 기능을 수행하는 리액트 hook 로직들을 하나의 커스텀 훅으로 묶어서 재사용성을 높인다
✅ 리액트 hook의 rule이 그대로 적용된다
✅ 재사용성을 위해 커스텀 훅 하나당 명확한 기능 하나만 수행하도록 하자.

👉 함수로써, 인자를 받을 수 있고 값을 반환할 수 있다.
👉 함수명은 'use'로 시작해야한다.
👉 한 개 이상의 react hook을 포함해야 한다.

- useKey(**반환값 없음**)
  
  ```js
  export function useKey(key, action) {
  
   useEffect(function () {
       function callback(event) {
           if (event.code.toLowerCase() === key.toLowerCase()) {
               action();
           }
       }
       document.addEventListener('keydown', callback); // MovieDetails인스턴스가 mount될때마다 이벤트리스너가 누적되어서 등록된다.--> cleanup 필요
  
       return function () {
           document.removeEventListener('keydown', callback);
       };
  
   }, [action]);
  
  }
  ```

<br/>

- useKey 사용
  
  ```js
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
  ```
  
  <br/>
- useLocalStorage(state, setState 반환)
  
  ```js
  export function useLocalStorageState(initialState, key) {
   const [value, setValue] = useState(function () {
       const storedValue = localStorage.getItem(key);
       return storedValue ? JSON.parse(storedValue) : initialState;
   });
  
   useEffect(function () {
       localStorage.setItem(key, JSON.stringify(value));
   }, [value, key]);
  
   return [value, setValue];
  }
  ```
  
  <br/>
- useLocalStorage 사용
  
  ```js
  export default function App() {
   const [query, setQuery] = useState("");
   const [selectedId, setSelectedId] = useState(null);
   const {movies, isLoading, error} = useMovies(query);
   const [watched, setWatched] = useLocalStorageState([], "watched");
  
  
   function handleAddWatchedMovie(movie) {
       setWatched(watched => [...watched, movie]);
   }
  
   // [생략]
  }
  ```



```

```

