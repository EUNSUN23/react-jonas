## React routing과 Single Page Application(SPA)

👉 SPA란, 서버로부터 최초에 전달받는 단일 파일을 통해 클라이언트(브라우저)측에서 dom업데이트로 페이지 전환을 수행하는 애플리케이션을 말한다. **최초에 단일 파일을 전달 받은 후에는 서버와의 http통신을 통한 페이지 리로딩을 필요로 하지 않는다.**

👉 React-router는 url과 React component를 매칭시키는 3rd-party 리액트 라이브러리로, React의 SPA식 페이지  라우팅을 담당한다.

- URL이 바뀌면 React, React-router는 url에 해당하는 컴포넌트를 렌더링해서 DOM을 업데이트 한다. 

