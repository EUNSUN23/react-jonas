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