# Context API
<hr/>

👉 전체 애플리케이션 컴포넌트에서 접근 가능한 전역 데이터를 관리한다
<br/>
👉 props를 내려주는 방식으로 data를 전달하지 않고 직접 하위 컴포넌트가 전역 데이터를 접근 할 수 있게 한다.


## Context 생성
```js
import {createContext, useContext, useMemo, useState} from "react";

export const PostContext = createContext();
```
- createContext는 context를 반환하는데, context도 컴포넌트다.
- createContext에 기본값(default value)을 넘겨줄수도 있지만, 이 기본값은 변경할 수  없기때문에 사용하지 않고 보통 null을 인수로 넘겨주거나 인수를 아예 생략한다. 
- 한 state 그룹당 한 context를 생성하는 것이 기본이다. 
   - ex) post관련 context -> PostContext, search관련 context -> SearchContext
## Provider
```js
 return (
        <PostContext.Provider value={{
            posts: searchedPosts,
            onAddPost: handledHost,
            onClearPosts: handleClearPosts,
            searchQuery, 
            setSearchQuery
        }}> {/* 보통 한 state domain당 한 context이지만, 여기서는 배움목적으로 search관련도 한 컴포넌트에 포함함*/}
            {children}
        </PostContext.Provider>
    )
```
- 생성한 Context의 Provider로 자식 컴포넌트들에게 전역 value를 제공한다. 


## Consumer

````js
function Header() {
    const {onClearPosts} = useContext(PostContext); // context value 객체를 반환한다.

    return (
        <header>
            <h1>
                <span>⚛️</span>The Atomic Blog
            </h1>
            <div>
                <Results/>
                <SearchPosts/>
                <button onClick={onClearPosts}>Clear posts</button>
            </div>
        </header>
    );
}
````

- useContext : Context를 인수로 받아서 context value 객체를 반환한다.

## Context & Provider 리팩토링 레시피

### 1. Provider 반환하는 context provider 컴포넌트 생성

```js
import {createContext, useContext, useMemo, useState} from "react";

// [코드 생략]

// PostContext 사용할 수 있도록 export 
export const PostContext = createContext(); // 컴포넌트(context)를 반환한다.

export function PostProvider({children}) {

    // [코드 생략]

    return (
        // 2) Context Provider를 통해서 value를 자식 컴포넌트들에 전달한다.
        <PostContext.Provider value={{
            posts: searchedPosts,
            onAddPost: handledHost,
            onClearPosts: handleClearPosts,
            searchQuery,
            setSearchQuery
        }}>
            {children}
        </PostContext.Provider>
    )
}
```

<br/>

### 2. useContext를 커스텀 hook으로 분리 
```js
// Provider 컴포넌트와 동일 파일에 생성 
export function usePosts() {
    const context = useContext(PostContext);
    return context;
}
```

```js
function Header() {
    // context 사용
    const {onClearPosts} = usePosts(); // context value 객체를 반환한다.

    return (
        <header>
            <h1>
                <span>⚛️</span>The Atomic Blog
            </h1>
            <div>
                <Results/>
                <SearchPosts/>
                <button onClick={onClearPosts}>Clear posts</button>
            </div>
        </header>
    );
}
```
- context를 인수로 받아서 context의 value객체를 반환하는 useContext는 **Context Provider 내부**에서만 사용 가능하고, 외부에서 샤용할시 undefined를 반환한다. 

### 3. context provider 외부에서 context value접근하려 했을 때 에러 발생시키기
```js
// Provider 컴포넌트와 동일 파일에 생성 
export function usePosts() {
    const context = useContext(PostContext);
    if(context === undefined) throw new Error("PostContext was used outside of the PostProvider");
    return context;
}

```

# Context API + useReducer 상태 관리
<hr/>

👉 Context API 자체는 value객체를 전역적으로 컴포넌트들에 전달할 뿐, state 관리 기능은 없다. <br/>따라서 state 관리를 위해서 보통 useState, useReducer를 같이 사용한다. 

### 1. initialState & reducer 생성
```js
// reactrouter_worldwise/vite-project/context/CitiesContext.jsx 
import {createContext, useCallback, useContext, useEffect, useReducer} from "react";

const BASE_URL = 'http://localhost:8000';

const CitiesContext = createContext();

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: ""
};

function reducer(state, action) {
  switch (action.type) {
    case 'loading':
      return {...state, isLoading: true};
    case 'city/loaded':
      return {...state, isLoading: false, currentCity: action.payload};
    case 'cities/loaded':
      return {...state, isLoading: false, cities: action.payload};
    case 'city/created':
      return {...state, isLoading: false, currentCity: action.payload, cities: [...state.cities, action.payload]};
    case 'city/deleted':
      return {...state, isLoading: false, cities: state.cities.filter(city => city.id !== action.payload)};
    case 'rejected':
      return {...state, isLoading: false, error: action.payload};
    default:
      throw new Error("Unknown action type");
  }
}


```

- #### reducer함수안에는 가능한 많은 비즈니스 로직을 수행햐게 해야하지만 순수함수여야 한다.
   - 순수함수 : 같은 파라미터에 대해서는 항상 같은 결과를 반환한다. (ex: HTTP통신 등 x)
- #### dispatch action type명은 '이벤트' 중심으로 한다. (ex: setCities -> 'cities/loaded')

<br/>

### 2. useReducer로 useState 대체 
```js
// reactrouter_worldwise/vite-project/context/CitiesContext.jsx
export function CitiesProvider({children}) {
  const [{cities, isLoading, currentCity, error}, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    async function fetchCities() {
      try {
        dispatch({type: 'loading'});
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        dispatch({type: 'cities/loaded', payload: data});
      } catch (e) {
        dispatch({type: 'rejected', payload: "There was an error loading cities..."});
      }
    }

    fetchCities();
  }, []);

  const getCity = useCallback(async function getCity(id) {
    if(Number(id) === currentCity.id) return;
    try {
      dispatch({type: 'loading'});
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      dispatch({type: 'city/loaded', payload: data});
    } catch (e) {
      dispatch({type: 'rejected', payload: "There was an error loading city..."});
    }
  },[currentCity.id]);

  async function createCity(newCity) {
    try {
      dispatch({type: 'loading'});
      const res = await fetch(`${BASE_URL}/cities/`, {
        method: 'POST',
        body: JSON.stringify(newCity),
        headers: {'Content-Type': 'application/json'}
      });
      const data = await res.json();
      dispatch({type: 'city/created', payload: data});
    } catch (e) {
      dispatch({type: 'rejected', payload: "There was an error creating city..."});
    }
  }

  async function deleteCity(id) {
    try {
      dispatch({type: 'loading'});
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: 'DELETE'
      });
      dispatch({type: 'city/deleted', payload: id});
    } catch (e) {
      dispatch({type: 'rejected', payload: "There was an error deleting city..."});
    }
  }

  return (
          <CitiesContext.Provider value={{
            cities,
            isLoading,
            currentCity,
            getCity,
            createCity,
            deleteCity,
            error
          }}>
            {children}
          </CitiesContext.Provider>
  )
}
```

- **reducer함수 안에서는 순수하게 비즈니스 로직만 포함되도록, 초기 데이터는 useEffect로 fetch해서 dispatch로 넘긴다.**
- getCity, createCity, deleteCity : dispatch 사용하는 상태관리 메서드들. 전역에서 사용 가능하도록 context value에 넘긴다. 