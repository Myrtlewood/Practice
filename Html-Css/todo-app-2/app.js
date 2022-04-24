//Selector

const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

//Event Listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteComplete);
todoList.addEventListener('dblclick', editTodo);
filterOption.addEventListener('change', filterTodo);

//functions

function addTodo(event) {
  //Prevent form form submitting
  event.preventDefault();

  const todoDiv = document.createElement('div');
  todoDiv.classList.add('todo');

  //Create LI
  const newTodo = document.createElement('li');
  newTodo.innerText = todoInput.value;
  newTodo.classList.add('todo-item');
  todoDiv.appendChild(newTodo);
  //ADD TODO TO LOCALSTORAGE
  const todo = { completed: false, value: todoInput.value };
  saveLocalTodos(todo);

  //Check MARK BUTTON
  const completedButton = document.createElement('button');
  completedButton.innerHTML = '<i class="fas fa-edit"></i>';
  completedButton.classList.add('complete-btn');
  todoDiv.appendChild(completedButton);

  //Check trash BUTTON
  const trashButton = document.createElement('button');
  trashButton.innerHTML = '<i class="fas fa-trash"></i>';
  trashButton.classList.add('trash-btn');
  todoDiv.appendChild(trashButton);

  //APPEND TO LIST
  todoList.appendChild(todoDiv);

  //Clear Todo INPUT VALUE
  todoInput.value = '';
}

function deleteComplete(e) {
  const item = e.target;
  const todo = item.closest('.todo');
  //DELETE TODO
  if (item.closest('.trash-btn')) {
    todo.classList.add('fall');
    removeLocalTodos(todo);
    todo.addEventListener('transitionend', function (e) {
      todo.remove();
    });
  }

  //COMPLETE TODO
  if (item.closest('.complete-btn')) {
    todo.classList.toggle('completed');
    const index = Array.from(todo.parentElement.children).indexOf(todo);
    console.log(index);
    const todos = getLocalStorage();
    todo.classList.contains('completed')
      ? (todos[index].completed = true)
      : (todos[index].completed = false);
    console.log(todos);
    localStorage.setItem('todos', JSON.stringify(todos));
  }
}

function editTodo(e) {
  if (e.target.classList.contains('todo-item')) {
    const item = e.target.innerHTML;
    const itemInput = document.createElement('input');
    itemInput.type = 'text';
    itemInput.value = item;
    itemInput.classList.add('edit');

    let todos;
    if (localStorage.getItem('todos') === null) {
      todos = [];
    } else {
      todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todos.indexOf(itemInput.value);
    console.log(typeof todoIndex);

    itemInput.addEventListener('keypress', saveTodo.bind(+todoIndex));
    itemInput.addEventListener('click', saveTodo.bind(+todoIndex));
    e.target.parentNode.prepend(itemInput);
    e.target.remove();
    itemInput.select();
  }
}

function saveTodo(e) {
  console.log(this.todoIndex);
  const todo = e.target.closest('.todo');
  if (e.target.value.length > 0 && (e.keyCode === 13 || e.type === 'click')) {
    const li = document.createElement('li');
    li.classList.add('todo-item');
    li.textContent = e.target.value;
    e.target.parentNode.prepend(li);
    e.target.remove();
    editLocalTodos(this, e.target.value);
  }
}

function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case 'all':
        todo.style.display = 'flex';
        break;
      case 'completed':
        if (todo.classList.contains('completed')) {
          todo.style.display = 'flex';
        } else {
          todo.style.display = 'none';
        }
        break;
      case 'uncompleted':
        if (!todo.classList.contains('completed')) {
          todo.style.display = 'flex';
        } else {
          todo.style.display = 'none';
        }
        break;
    }
  });
}

function saveLocalTodos(todo) {
  // let todos;
  // if (localStorage.getItem('todos') === null) {
  //   todos = [];
  // } else {
  //   todos = JSON.parse(localStorage.getItem('todos'));
  // }
  const todos = getLocalStorage();
  todos.push(todo);
  console.log(todos);
  localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {
  const todos = getLocalStorage();
  todos.forEach(function (todo) {
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    if (todo.completed) {
      todoDiv.classList.add('completed');
    }

    //Create LI
    const newTodo = document.createElement('li');
    newTodo.innerText = todo.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    //Check MARK BUTTON
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check-square"></i>';
    completedButton.classList.add('complete-btn');
    todoDiv.appendChild(completedButton);

    //Check trash BUTTON
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);

    //APPEND TO LIST
    todoList.appendChild(todoDiv);
  });
}

function removeLocalTodos(todo) {
  const todos = getLocalStorage();
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem('todos', JSON.stringify(todos));
}

function editLocalTodos(index, value) {
  const todos = getLocalStorage();
  todos[index] = value;
  localStorage.setItem('todos', JSON.stringify(todos));
}

function getLocalStorage() {
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  return todos;
}
