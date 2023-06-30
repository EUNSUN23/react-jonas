## React routing과 Single Page Application(SPA)

👉 SPA란, 서버로부터 최초에 전달받는 단일 파일을 통해 클라이언트(브라우저)측에서 dom업데이트로 페이지 전환을 수행하는 애플리케이션을 말한다. **최초에 단일 파일을 전달 받은 후에는 서버와의 http통신을 통한 페이지 리로딩을 필요로 하지 않는다.**
<br/>

👉 React-router는 url과 React component를 매칭시키는 3rd-party 리액트 라이브러리로, React의 SPA식 페이지  라우팅을 담당한다.

- URL이 바뀌면 React, React-router는 url에 해당하는 컴포넌트를 렌더링해서 DOM을 업데이트 한다.
  <br/>

**👉 컴포넌트와 url 매칭**

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

**👉 url link(NavLink or Link)**

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

