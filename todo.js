  let inputForm = document.getElementById('input-form');
  let input = document.getElementById('input');
  let toDoList = document.getElementById('todo-list');
  let todos = [];  
  
  inputForm.addEventListener('submit', (e)=> {
    e.preventDefault();
    inputTodo(input.value);
  });

  
  function inputTodo(item) {
    if (item !== '') {
      let todo = {
        id: Math.floor(Math.random()*99),
        name: item,
        completed: false
      };
      todos.push(todo);
      addToLocalStorage(todos);
      input.value = '';
    }
  }
 
  
  function displayTodos(todos) {
    toDoList.innerHTML = '';
    todos.forEach((task)=>{
      let checked = task.completed ? 'checked' : '';

      let newTodo= document.createElement('li');
      newTodo.setAttribute('class', 'task');
      newTodo.setAttribute('data-key', task.id);

      if (task.completed==true) {
        newTodo.classList.add('checked');
      }

      newTodo.innerHTML = `
      <input type="checkbox" class="checkbox" ${checked}>
      ${task.name}
      <button class="delete-btn">X</span></button>
    `;    
      // <span class="far fa-trash-alt">      
      toDoList.appendChild(newTodo);
    })    
  }


  function addToLocalStorage(todos) {
    localStorage.setItem('todos', JSON.stringify(todos));
    displayTodos(todos);
  }
  
  function getFromStorage() {
    let storedTodo = localStorage.getItem('todos');
    if (storedTodo) {
      todos = JSON.parse(storedTodo);
      displayTodos(todos);
    }
  }
  
  function toggle(id) {
    todos.forEach((task)=> {
      if (task.id == id) {
        task.completed = !task.completed;
      }
    });  
    addToLocalStorage(todos);
  }
  
  function deleteTodo(id) {
    todos = todos.filter((task)=> {
      return task.id != id;
    });
    addToLocalStorage(todos);
  }
  getFromStorage();
  
  
  toDoList.addEventListener('click', (e)=> {
    if (e.target.type == 'checkbox') {
      toggle(e.target.parentElement.getAttribute('data-key'));
    }
    if (e.target.classList.contains('delete-btn')) {
      deleteTodo(e.target.parentElement.getAttribute('data-key'));
    }
  }); 
  
