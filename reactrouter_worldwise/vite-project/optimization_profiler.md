## 리액트 Profiler tool(Chrome)

<br/>

### 👉 Profiler record 설정

![image.png](assets/profiler2.png)
<br/>

### 👉 state 변화 record (시작🔵 ->  종료🔴)

![image.png](assets/profiler3.png)
<br/>

### 👉 Flamegraph

![image.png](assets/profiler4.png)

- 컴포넌트 tree 구조
- 상단 우측 세로 bar : 각 렌더링 커밋
- 회색 : 렌더링 x
- 색이 노란색에 가까울수록 렌더링 많이 일어난 컴포넌트
- 바 length : 길수록 렌더링에 소요된 시간 많음
- 바 hover시 렌더링 원인 & 시간 팝업
  <br/>

### 👉 Rank

![image.png](assets/profiler5.png)

- 컴포넌트 렌더링 ranking

