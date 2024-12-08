const todoInputEl = document.querySelector(".todo-input");
const todoListEl = document.querySelector(".todo-list");
const completeAllBtnEl = document.querySelector(".complete-all-btn");
const leftItemsEl = document.querySelector(".left-items");
const showAllBtnEl = document.querySelector(".show-all-btn"); // All 버튼
const showActiveBtnEl = document.querySelector(".show-active-btn"); // Active 버튼
const showCompletedBtnEl = document.querySelector(".show-completed-btn"); // Completed 버튼
const clearCompletedBtnEl = document.querySelector(".clear-completed-btn"); // Completed Clear 버튼

let todos = []; // 할 일들을 담을 배열. 초기값은 빈배열
let id = 0; //각각의 할 일들이 유니크하게 구별할 수 있는 키값을 설정. 초기값은 0

const setTodos = (newTodos) => {
  todos = newTodos;
};

const getAllTodos = () => {
  return todos;
};

const appendTodos = (text) => {
  const newId = id++;
  const newTodos = getAllTodos().concat({
    id: newId,
    isCompleted: false,
    content: text,
  });
  //스프레드 연산자를 사용할 경우
  // const newTodos = [...getAllTodos,{
  //   id: newId,
  //   isCompleted: false,
  //   content: text,
  // }]
  setTodos(newTodos);
  paintTodos();
  checkIsAllCompleted(); // 전체 완료처리 확인
};

const paintTodos = () => {
  todoListEl.innerHTML = "";

  switch (currentShowType) {
    case "all":
      const allTodos = getAllTodos();
      allTodos.forEach((todo) => {
        paintTodo(todo);
      });
      break;
    case "active":
      const activeTodos = getActiveTodos();
      activeTodos.forEach((todo) => {
        paintTodo(todo);
      });
      break;
    case "completed":
      const completedTodos = getCompletedTodos();
      completedTodos.forEach((todo) => {
        paintTodo(todo);
      });
      break;
    default:
      break;
  }
};

const paintTodo = (todo) => {
  const todoItemEl = document.createElement("li");
  todoItemEl.classList.add("todo-item");

  todoItemEl.setAttribute("data-id", todo.id);

  const checkboxEl = document.createElement("div");
  checkboxEl.classList.add("checkbox");
  checkboxEl.addEventListener("click", () => completeTodo(todo.id));

  const todoEl = document.createElement("div");
  todoEl.classList.add("todo");
  todoEl.addEventListener("dblclick", (event) => onDbclickTodo(event, todo.id));
  todoEl.innerText = todo.content;

  const delBtnEl = document.createElement("button");
  delBtnEl.classList.add("delBtn");
  delBtnEl.addEventListener("click", () => deleteTodo(todo.id));
  delBtnEl.innerHTML = "X";

  if (todo.isCompleted) {
    todoItemEl.classList.add("checked");
    checkboxEl.innerText = "✔";
  }

  todoItemEl.appendChild(checkboxEl);
  todoItemEl.appendChild(todoEl);
  todoItemEl.appendChild(delBtnEl);

  todoListEl.appendChild(todoItemEl);
};

const deleteTodo = (todoId) => {
  const newTodos = getAllTodos().filter((todo) => todo.id !== todoId);
  setTodos(newTodos);
  paintTodos();
  setLeftItems(); // 남은 할 일 개수 표시
};

const completeTodo = (todoId) => {
  const newTodos = getAllTodos().map((todo) =>
    todo.id === todoId ? { ...todo, isCompleted: !todo.isCompleted } : todo
  );
  setTodos(newTodos);
  paintTodos();
  checkIsAllCompleted(); // 전체 todos의 완료 상태를 파악하여 전체 완료 처리 버튼 CSS 반영
  setLeftItems(); // 남은 할 일 개수 표시
};

const onDbclickTodo = (e, todoId) => {
  const todoEl = e.target;
  const inputText = e.target.innerText;
  const todoItemEl = todoEl.parentNode;
  const inputEl = document.createElement("input");
  inputEl.value = inputText;
  inputEl.classList.add("edit-input");
  todoItemEl.appendChild(inputEl);

  inputEl.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      updateTodo(e.target.value, todoId);
      document.body.removeEventListener("click", onClickBody);
    }
  });

  // body에 클릭에 대한 이벤트 리스너 등록
  document.body.addEventListener("click", onClickBody);

  // todoItemElem 요소를 제외한 영역을 클릭 시, 수정모드 종료
  const onClickBody = (e) => {
    if (e.target !== inputEl) {
      todoItemEl.removeChild(inputEl);
      document.body.removeEventListener("click", onClickBody);
    }
  };
};

const updateTodo = (text, todoId) => {
  const newTodos = getAllTodos().map((todo) =>
    todo.id === todoId ? { ...todo, content: text } : todo
  );
  setTodos(newTodos);
  paintTodos();
};

let isAllCompleted = false; // 전체 todos 체크 여부

const setIsAllCompleted = (bool) => {
  isAllCompleted = bool;
};

const completeAll = () => {
  completeAllBtnEl.classList.add("checked");
  const newTodos = getAllTodos().map((todo) => ({
    ...todo,
    isCompleted: true,
  }));
  setTodos(newTodos);
};

const incompleteAll = () => {
  completeAllBtnEl.classList.remove("checked");
  const newTodos = getAllTodos().map((todo) => ({
    ...todo,
    isCompleted: false,
  }));
  setTodos(newTodos);
};

// 전체 todos의 check 여부 (isCompleted)
const checkIsAllCompleted = () => {
  if (getAllTodos().length === getCompletedTodos().length) {
    setIsAllCompleted(true);
    completeAllBtnEl.classList.add("checked");
  } else {
    setIsAllCompleted(false);
    completeAllBtnEl.classList.remove("checked");
  }
};

const onClickCompleteAll = () => {
  if (!getAllTodos().length) return; // todos배열의 길이가 0이면 return;

  if (isAllCompleted)
    incompleteAll(); // isAllCompleted가 true이면 todos를 전체 미완료 처리
  else completeAll(); // isAllCompleted가 false이면 todos를 전체 완료 처리
  setIsAllCompleted(!isAllCompleted); // isAllCompleted 토글
  paintTodos(); // 새로운 todos를 렌더링
  setLeftItems(); // 남은 할 일 개수 표시
};

const getCompletedTodos = () => {
  return todos.filter((todo) => todo.isCompleted === true);
};

// 현재 완료되지 않은 할 일 리스트를 반환한다.
const getActiveTodos = () => {
  return todos.filter((todo) => todo.isCompleted === false);
};

const setLeftItems = () => {
  const leftTodos = getActiveTodos();
  leftItemsEl.innerHTML = `남은 할 일 ${leftTodos.length}`;
};

let currentShowType = "all"; // all  | active | complete
const setCurrentShowType = (newShowType) => (currentShowType = newShowType);

const onClickShowTodosType = (e) => {
  const currentBtnEl = e.target;
  const newShowType = currentBtnEl.dataset.type;

  if (currentShowType === newShowType) return;

  const preBtnEl = document.querySelector(`.show-${currentShowType}-btn`);
  preBtnEl.classList.remove("selected");

  currentBtnEl.classList.add("selected");
  setCurrentShowType(newShowType);

  paintTodos();
};

const clearCompletedTodos = () => {
  const newTodos = getActiveTodos();
  setTodos(newTodos);
  paintTodos();
};

const init = () => {
  todoInputEl.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      appendTodos(e.target.value);
      todoInputEl.value = "";
      setLeftItems(); // 남은 할 일 개수 표시
    }
  });

  showAllBtnEl.addEventListener("click", onClickShowTodosType);
  showActiveBtnEl.addEventListener("click", onClickShowTodosType);
  showCompletedBtnEl.addEventListener("click", onClickShowTodosType);
  clearCompletedBtnEl.addEventListener("click", clearCompletedTodos);

  completeAllBtnEl.addEventListener("click", onClickCompleteAll); // 전체 완료 처리 버튼에 클릭 이벤트 리스너
  setLeftItems(); // 남은 할 일 개수 표시
};
init();
