## Render Logic

👉 컴포넌트 함수의 top level에 선언하는, **컴포넌트가 렌더링 될 때마다 실행되는 로직**으로, 컴포넌트의 view를 결정한다.

```
export default function App() {
// **=============== 렌더링 로직 =====================**
    const [query, setQuery] = useState("");
    const [selectedId, setSelectedId] = useState(null);
    const {movies, isLoading, error} = useMovies(query, handleCloseMovie);
// **=============== 렌더링 로직 =====================**


    function handleSelectMovie(id) {
        setSelectedId(selectedId => selectedId === id ? null : id);
    }
    useEffect(function () {
        localStorage.setItem('watched', JSON.stringify(watched));
    }, [watched]);


// **=============== 렌더링 로직 =====================**
    return (
        <>
            <NavBar>
                <Logo/>
                <Search query={query} setQuery={setQuery}/>
                <NumResults num={movies.length}/>
            </NavBar>
        </>
    );
// **=============== 렌더링 로직 =====================**
}
```

## Rules for Render Logic

👉 컴포넌트 함수는 렌더링 로직에 있어서는 항상 pure해야 한다. 같은 props를 인자로 받으면 같은 jsx를 반환해야 한다.

👉 렌더링 로직은 side effect를 일으키지 않아야 한다. **즉, 함수 컴포넌트 외부와 상호작용해선 안된다.**

- HTTP 요청
- timer 함수 호출
- DOM에 직접 접근해서 API 사용
- 함수 스코프 외부의 객체나 변수 수정 (**받은 props를 수정하면 안됨**)

👉 렌더링 로직은 **state 업데이트를 하면 안된다**(무한 루프 생성함).

