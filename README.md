# To-Do List 애플리케이션 (Vanilla JavaScript)

이 애플리케이션은 **Vanilla JavaScript**를 사용하여 만든 간단한 할 일 목록(To-Do List) 앱입니다. 사용자는 할 일을 추가하고, 완료 여부를 체크하며, 삭제하고, 완료된 항목을 필터링할 수 있습니다. 추가적으로 할 일의 전체 완료 상태를 처리하고, 완료된 할 일을 삭제하는 기능도 제공합니다.

## 기술 스택

- **Vanilla JavaScript**: 사용자 인터페이스 구축 및 상태 관리
- **HTML**: 구조 정의
- **CSS**: 애플리케이션 스타일링

## 핵심 기능

### 기능 설명

- 할 일 추가: 입력창에 텍스트를 입력 후 Enter 키를 누르면 할 일이 추가됩니다.
- 할 일 완료 체크: 체크박스를 클릭하여 완료 여부를 변경할 수 있습니다.
- 할 일 삭제: 삭제 버튼(X)을 클릭하면 해당 할 일이 목록에서 삭제됩니다.
- 할 일 수정: 더블 클릭하면 수정 모드로 변경되며, Enter 키를 눌러 수정할 수 있습니다.
- 전체 할 일 완료/미완료: 상단의 체크 버튼을 클릭하여 모든 할 일을 완료 또는 미완료 상태로 변경할 수 있습니다.
- 필터링: '전체', '남은 할 일', '완료된 할 일' 버튼을 클릭하여 필터링할 수 있습니다.
- 완료된 할 일 삭제: '완료된 할 일 삭제' 버튼을 클릭하여 완료된 항목을 한 번에 삭제할 수 있습니다.

### 상태 관리

- **todos**: 할 일 항목들을 저장하는 배열
- **id**: 각 할 일 항목을 유니크하게 구별하는 ID 값
- **currentShowType**: 현재 필터링된 할 일의 타입 (all, active, completed)
- **isAllCompleted**: 전체 할 일 완료 여부

### 주요 함수

- **appendTodos(text)**: 새로운 할 일을 추가
- **paintTodos()**: 화면에 할 일 목록을 렌더링
- **paintTodo(todo)**: 개별 할 일 항목을 화면에 렌더링
- **deleteTodo(todoId)**: 특정 할 일을 삭제
- **completeTodo(todoId)**: 할 일을 완료/미완료 상태로 변경경
- **onDbclickTodo(event, todoId)**: 더블 클릭하여 할 일 내용을 수정
- **updateTodo(text, todoId)**: 수정된 할 일 내용을 반영
- **completeAll()**: 모든 할 일을 완료 상태로 변경
- **incompleteAll()**: 모든 할 일을 미완료 상태로 변경
- **checkIsAllCompleted()**: 전체 완료 상태를 확인하고 버튼 스타일 변경
- **setLeftItems()**: 남은 할 일 개수를 업데이트
- **onClickShowTodosType(event)**: 필터 버튼 클릭 시 할 일 목록 필터링
- **clearCompletedTodos()**: 완료된 할 일을 삭제
- **init()**: 초기화 및 이벤트 리스너 등록

## 파일 구조

src/  
 ├── index.html # 기본 HTML 파일  
 ├── reset.css # 웹 표준화를 위한 초기화 CSS 파일  
 ├── style.css # 스타일링을 위한 CSS 파일  
 └── todo.js # JavaScript 로직 
 


## 설치 방법

1. 레포지토리를 클론합니다:

   ```bash
   git clone https://github.com/frontend-leejeongeun/Todos-Vanilla.git
   ```

2. 애플리케이션을 실행합니다:
   ```bash
   index.html 더블클릭
   ```

애플리케이션은 브라우저에서 로컬로 열립니다.
