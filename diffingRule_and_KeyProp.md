# Diffing rule
  > 리액트의 rendering phase에서 기존 Fiber Tree(실제 DOM에 반영되는 tree구조 객체)와 새롭게 생성된 React Element Tree(이른바 가상돔)를 비교해서 Fiber Tree를 업데이트 할 때 
  > 적용되는 규칙. *Fiber Tree와 가상돔 tree의 같은 위치의 요소들을 비교한다.*
  >

### Rule 1. 
(같은 위치의) dom/react요소가 다르면 이 요소의 tree는 완전히 새롭게 rebuild 한다.

~~~js
// Fiber Tree (tree구조가 아니라 jsx지만 이해를 위해 편의상..
<div>
    <SearchBar/>
</div>

// React element tree
<header>
  <SearchBar/>
</header>

// DOM에 적용될 결과물
<header> --> div는 dom에서 완전히 제거되고 header로 대체된다.
  <SearchBar/> --> div의 트리에 속해 있기 때문에, 마찬가지로 *완전히 제거되고(state도 당연히 제거됨)* 새로운 SearchBar인스턴스로 대체됨.
</header>
~~~

### Rule 2.
재렌더링시에도 동일한 key prop(**stable key prop**)을 가지는 dom/react 요소들은 제렌더링 시에도 rebuild되지 않고 기존 상태를 유지한다.

--> 재렌더링시에 변하는 key prop(**changing key prop**)을 가지는 dom/react 요소들은 같은 위치, 같은 타입이더라도 재렌더링 때마다 초기화된다.
~~~js
/**
 * stable key를 사용해야 하는 경우 
 */ 

// Fiber Tree
<ul>
  <Question key='q1' question={q[1]}/>
  <Question key='q2' question={q[2]}/>
</ul>

// React Element Tree
<ul>
  <Question key='q0' question={q[0]}/>
  <Question key='q1' question={q[1]}/>
  <Question key='q2' question={q[2]}/>
</ul>

// 실제 DOM에 적용
<ul>
  <Question key='q0' question={q[0]}/> 
  <Question key='q1' question={q[1]}/> 
  <Question key='q2' question={q[2]}/>
</ul>
    // --> key prop이 0인 새로운 요소가 위에 추가되면서 key prop이 1,2인 요소들은
    // 트리 내에서의 위치가 바뀌었지만 key prop이 동일하기 때문에 재렌더링 되어도 새롭게 생성되지 않고, 
    // 따라서 재렌더링 이전의 state를 가지고 있다. 


/**
 * changing key prop을 사용해야 하는 경우
 */

// Fiber Tree
<QuestionBox>
  <Question key='key1' question={{title:'React vs Js', body:'Why should we use React?'}}/>
</QuestionBox>

// Question의 answer state (사용자가 입력하는 input state라고 치자) :
// 'React allows us to build apps faster'

// React Element Tree (부모 컴포넌트의 question state를 props로 받는데 이 state가 변했음)
<QuestionBox>
    <Question 'key2' question={{title:'food', body:'what  is your favorite food?'}}/>
</QuestionBox>

// DOM에 적용
<QuestionBox>
  <Question 'key2' question={{title:'food', body:'what  is your favorite food?'}}/>
</QuestionBox>

// Question의 answer state (사용자가 입력하는 input state라고 치자) :
// '' => 같은 위치, 같은 타입의 요소이지만 key prop이 달라졌으므로 기존 인스턴스는 제거되고 새로운 인스턴스가 build되어서 state도 초기화 된다. 
~~~