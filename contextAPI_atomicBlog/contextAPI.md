## Context API

👉 전체 애플리케이션 컴포넌트에서 접근 가능한 전역 데이터를 관리한다
👉 props를 내려주는 방식으로 data를 전달하지 않고 직접 하위 컴포넌트가 전역 데이터를 접근 할 수 있게 한다.

### Provider

: 자식 컴포넌트들에게 data 접근을 제공한다.

#### Consumers

: Provider가 제공하는  context value에 접근하는 컴포넌트들

#### Context Value Update

: context value가 업데이트 되면 Provider는 context를 구독하고 있는 Consumer들이 재렌더링 되도록 한다.



