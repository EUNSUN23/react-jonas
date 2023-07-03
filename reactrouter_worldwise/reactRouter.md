## React routing과 Single Page Application(SPA)

👉 SPA란, 서버로부터 최초에 전달받는 단일 파일을 통해 클라이언트(브라우저)측에서 dom업데이트로 페이지 전환을 수행하는 애플리케이션을 말한다. **최초에 단일 파일을 전달 받은 후에는 서버와의 http통신을 통한 페이지 리로딩을 필요로 하지 않는다.**
<br/>

👉 React-router는 url과 React component를 매칭시키는 3rd-party 리액트 라이브러리로, React의 SPA식 페이지  라우팅을 담당한다.

- URL이 바뀌면 React, React-router는 url에 해당하는 컴포넌트를 렌더링해서 DOM을 업데이트 한다.
  <br/>

### 컴포넌트 & url & Link/NavLink 매칭

```
import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
// [나머지 import 생략]

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="product" element={<Product/>}/>
                <Route path="pricing" element={<Pricing/>}/>
                <Route path="*" element={<PageNotFound/>}/> {/* 위 path에 모두 해당하지 않는 url에 매칭 */}
            </Routes>
        </BrowserRouter>
    );
}
```

<br/>

```
import React from 'react';
import {Link, NavLink} from "react-router-dom";

function PageNav() {
    return (
        <nav>
            <ul>
                <li><NavLink to="/">Home</NavLink></li> {/* Link와 차이 : NavLink는 활성화 상태의 className을 제공한다. */}
                <li><NavLink to="/pricing">Pricing</NavLink></li>
                <li><NavLink to="/product">Product</NavLink></li>
            </ul>
        </nav>
    );
}
```

<br/>

### Nested Routes

<br/>

- **AppLayout(/app)의 하위 Route**

```js
<Route path="app" element={<AppLayout/>}> {/* nested routes */}
         <Route index  element={<Navigate to='cities' replace/>}/>       
         <Route path='cities' element={<CityList cities={cities} isLoading={isLoading}/>}/>
         <Route path='cities/:id' element={<City/>}/> 
         <Route path='countries' element={<CountryList cities={cities} isLoading={isLoading}/>}/>
         <Route path='form' element={<Form/>}/>
     </Route>
```

<br/>

- **Outlet - 컴포넌트 연결**

```js
function Sidebar() {
    return (
        <div className={styles.sidebar}>
            <Logo/>
            <AppNav/>
            <Outlet/> {/* AppLayout컴포넌트의 nested route와 매치되는 컴포넌트 표시 */}
            <footer className={styles.footer}>
                <p className={styles.copyright}>
                    &copy; Copyright {new Date().getFullYear()}
                     by WorldWise Inc.
                </p>
            </footer>
        </div>
    );
}
```



<br/>

### URL에 state 저장하기


#### URL은 UI에 관한 state를 저장하기에 좋다.

- 👉 어느 컴포넌트에서나 접근해서 사용할 수 있다.
- 👉 데이터를 한 페이지에서 다음 페이지로 쉽게 전달 할 수 있다.
- 👉 url에 state를 저장함으로써 해당 url을 공유한 다른 사람에게 같은 page UI를 공유할 수 있다.(북마크 등)

<br/>

**/app/cities에 파라미터('id')연결 -> City 컴포넌트 렌더링**

```js
return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="product" element={<Product/>}/>
                <Route path="pricing" element={<Pricing/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="app" element={<AppLayout/>}> {/* nested routes */}
                    <Route index
                           element={<Navigate to='cities' replace/>}/> {/* root path (/app)에 대한 매칭 */} {/* Navigate : cities로 리다이렉팅 replace : history 대체 */}
                    <Route path='cities' element={<CityList cities={cities} isLoading={isLoading}/>}/>
                    <Route path='cities/:id' element={<City/>}/> {/* :id -> parameter와 매칭되는 key가 된다. */}
                    <Route path='countries' element={<CountryList cities={cities} isLoading={isLoading}/>}/>
                    <Route path='form' element={<Form/>}/>
                </Route>
                <Route path="*" element={<PageNotFound/>}/> {/* 위 path에 모두 해당하지 않는 url에 매칭 */}
            </Routes>
        </BrowserRouter>
    );
```

<br/>

**CityItem 클릭시 /app/cities:id로 라우팅 (쿼리스트링으로 lng, lat추가)**

```js
function CityItem({city}) {
    const {cityName, emoji, date, id, position} = city;
    return (
        <li>
            <Link className={styles.cityItem} to={`${id}?lat=${position.lat}&?lng=${position.lng}`}>
                <span className={styles.emoji}>{emoji}</span>
                <h3 className={styles.name}>{cityName}</h3>
                <time className={styles.date}>{formatDate(date)}</time>
                <button className={styles.deleteBtn}>&times;</button>
            </Link>
        </li>
    );
}
```

<br/>

**useParams, useSearchParams로 url parameter 사용**

```js
function City() {
    // * City컴포넌트와 매칭되는 라우터 url의 parameter 사용하기 *
    const {id} = useParams(); 
    const [searchParams, setSearchParams] = useSearchParams(); 
    const lat = searchParams.get('lat');
    const lng = searchParams.get('lng');
    
    // 나머지 코드 생략

}
```

<br/>

**url에 저장된 state는 모든 컴포넌트에서 접근 가능하다**

```js
function Map() {
    // ** 현재 url parameter 사용하기 - url에 저장된 state는 모든 컴포넌트에서 접근 가능하다.
    // * setSearchParams : 현재 url parameter 변경 메서드. url뿐 아니라 전체 컴포넌트에서 사용하는 해당 param값이 업데이트된다.
    const [searchParams, setSearchParams] = useSearchParams();
    const lat = searchParams.get('lat');
    const lng = searchParams.get('lng');


    return (
        <div className={styles.mapContainer} onClick={()=>{navigate('form')}}>

        </div>
    );
}
```

<br/>

### 프로그래밍적으로 URL 라우팅 하기

👉 form submit시 특정 URL로 라우팅하는 기능 등에 사용

#### useNavigate

- 일반 navigate

```js
function Map() {
 // ** Link, NavLink통하지 않고 navigate하기 - useNavigate
 const navigate = useNavigate();

 return (
     <div className={styles.mapContainer} onClick={()=>{navigate('form')}}>

     </div>
 );
}
```

<br/>


- 뒤로 가기

```js
function Form() {
    const navigate = useNavigate();
    const [cityName, setCityName] = useState("");
    const [country, setCountry] = useState("");
    const [date, setDate] = useState(new Date());
    const [notes, setNotes] = useState("");

    return (
       {/* 나머지 코드 생략 */}
            <div className={styles.buttons}>
                <Button type='primary'>Add</Button>
                <Button type='back' onClick={(e) => {
                    e.preventDefault();
                    navigate(-1); {/* 바로 전 url로 route */}
                }}>&larr; Back</Button>
            </div>
        </form>
    );
}
```

<br/>

#### Navigate 컴포넌트

- 거의 사라졌지만 nested route에서 다음처럼 리다이렉션할때 사용한다. 

```js
return (
        <BrowserRouter>
            <Routes>
               {/* 나머지 코드 생략 */}
                    <Route index
                           element={<Navigate to='cities' replace/>}/> {/* Navigate : cities로 리다이렉팅 replace : history 대체 */}
               {/* 나머지 코드 생략 */}    
            </Routes>
        </BrowserRouter>
    );
```





