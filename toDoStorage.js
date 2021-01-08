const todoForm = document.querySelector('.todo-form');
const todoInput = document.querySelector('.todo-input');
const completedItemList = document.querySelector('.todo-items');
const notCompletedItemList = document.querySelector('.leftTodo-items');

const currentTaskText = document.getElementById("taskText");

const leftToDoText = document.querySelector(".leftToDoText");
const completedText = document.querySelector(".completedText");

// array which stores every todos
let todos = [];

todoForm.addEventListener('submit', function (event) {
    event.preventDefault();
    addTodo(todoInput.value);
});

function addTodo(item) {
    if (item !== '') {
        // make a todo object, which has id, name, and completed properties
        const todo = {
            id: Date.now(),
            name: item,
            pomCycles: 1,
            completed: false
        };

        todos.push(todo);
        addToLocalStorage(todos); // then store it in localStorage
        todoInput.value = '';
        updateLeftandCompl();
    }
}

// function to render given todos to screen
function renderTodos(todos) {
    completedItemList.innerHTML = '';
    notCompletedItemList.innerHTML = '';

    todos.forEach(function (item) {
        // check if the item is completed
        const checked = item.completed ? 'checked' : null;

        // make a <li> element and fill it
        // <li> </li>
        const li = document.createElement('li');
        // <li class="item"> </li>
        li.setAttribute('class', 'item');
        // <li class="item" data-key="20200708"> </li>
        li.setAttribute('data-key', item.id);
        /* <li class="item" data-key="20200708"> 
              <input type="checkbox" class="checkbox">
              Go to Gym
              <button class="delete-button">X</button>
            </li> */

        if (item.completed) {
            li.innerHTML = `
            ${item.name} <button class="fa fa-trash"></button>`;

            completedItemList.append(li);
        } else {

            li.innerHTML = `
            ${item.name} <button class="fa fa-trash"></button>
            <button class="fas fa-check" id="checkBoo"></button>
            <button class="counter">${item.pomCycles}</button>
            <button class="icon-plus-sign" id="pliusas"></button>
            <button class="icon-minus-sign" id="minusas"></button>
          `;

            notCompletedItemList.append(li);
        }
    });

    updateLeftandCompl();

}

function addToLocalStorage(todos) {
    localStorage.setItem('todos', JSON.stringify(todos));
    renderTodos(todos);
    updateCurrentTask();
}

function getFromLocalStorage() {
    const reference = localStorage.getItem('todos');
    if (reference) {
        todos = JSON.parse(reference);
        renderTodos(todos);
    }
}

function toggle(id) {
    todos.forEach(function (item) {
        if (item.id == id) {
            item.completed = !item.completed;
        }
    });
    updateLeftandCompl();
    addToLocalStorage(todos);
}

function increaseCycleCount(id) {
    todos.forEach(function (item) {
        if (item.id == id) {
            item.pomCycles++;
        }
    });
    addToLocalStorage(todos);
}

function decreaseCycleCount(id) {
    todos.forEach(function (item) {
        if (item.id == id) {
            item.pomCycles--;
        }
    });
    addToLocalStorage(todos);
}

function deleteTodo(id) {
    todos = todos.filter(function (item) {
        return item.id != id;
    });

    addToLocalStorage(todos);
}


getFromLocalStorage();


completedItemList.addEventListener('click', function (event) {
    //Spausta varnele
    if (event.target.type === 'checkbox') {
        toggle(event.target.parentElement.getAttribute('data-key'));
    }

    //Spausta siuksline
    if (event.target.classList.contains('fa-trash')) {
        deleteTodo(event.target.parentElement.getAttribute('data-key'));
    }
    updateCurrentTask();
    updateLeftandCompl();
});

notCompletedItemList.addEventListener('click', function (event) {

    //Spausta varnele
    if (event.target.id === 'checkBoo') {
        toggle(event.target.parentElement.getAttribute('data-key'));
    }

    //Spaustas pliusas
    if (event.target.id == "pliusas") {
        console.log(event.target.parentElement.getAttribute('data-key'));
        increaseCycleCount(event.target.parentElement.getAttribute('data-key'));
    }

    //Spaustas minusas
    if (event.target.id == "minusas") {
        console.log(event.target.parentElement.getAttribute('data-key'));
        decreaseCycleCount(event.target.parentElement.getAttribute('data-key'));
    }

    //Spausta siuksline
    if (event.target.classList.contains('fa-trash')) {
        deleteTodo(event.target.parentElement.getAttribute('data-key'));
    }
    updateLeftandCompl();
    updateCurrentTask();
});


function decrimentPomCycles() {
    for (i = 0; i < todos.length; i++) {
        if (!todos[i].completed) {
            if (todos[i].pomCycles > 1) {
                todos[i].pomCycles--;
                addToLocalStorage(todos);
                updateLeftandCompl();
            } else if (todos[i].pomCycles == 1) {
                todos[i].pomCycles--;
                toggle(todos[i].id);
                updateLeftandCompl();
            }
            break;
        }
    }
}

function updateCurrentTask() {
    for (i = 0; i < todos.length; i++) {
        if (!todos[i].completed) {
            taskText.innerText = todos[i].name;
            break;
        } else {
            taskText.innerText = "";
        }
    }
}

function updateLeftandCompl() {
    if (notCompletedItemList.childElementCount == 0) {
        leftToDoText.style.display = 'none';
    } else {
        leftToDoText.style.display = 'block';
    }


    if (completedItemList.childElementCount == 0) {
        completedText.style.display = 'none';
    } else {
        completedText.style.display = 'block';
    }

}