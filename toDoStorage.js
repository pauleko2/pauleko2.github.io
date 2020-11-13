const todoForm = document.querySelector('.todo-form');
const todoInput = document.querySelector('.todo-input');
const completedItemList = document.querySelector('.todo-items');
const notCompletedItemList = document.querySelector('.leftTodo-items');

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
            completed: false
        };

        todos.push(todo);
        addToLocalStorage(todos); // then store it in localStorage
        todoInput.value = '';
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

        li.innerHTML = `
        <input type="checkbox" class="fa fa-check" ${checked}>
        ${item.name}
        <button class="fa fa-trash"></button>
      `;

        if (item.completed) {
            completedItemList.append(li);
        } else {
            notCompletedItemList.append(li);
        }
    });

}

function addToLocalStorage(todos) {
    localStorage.setItem('todos', JSON.stringify(todos));
    renderTodos(todos);
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
        // use == not ===, because here types are different. One is number and other is string
        if (item.id == id) {
            // toggle the value
            item.completed = !item.completed;
        }
    });

    addToLocalStorage(todos);
}

function deleteTodo(id) {
    // filters out the <li> with the id and updates the todos array
    todos = todos.filter(function (item) {
        // use != not !==, because here types are different. One is number and other is string
        return item.id != id;
    });

    addToLocalStorage(todos);
}


getFromLocalStorage();
if (notCompletedItemList.childElementCount == 0) {
    leftToDoText.style.display = 'none';
} else {
    leftToDoText.style.display = 'block';
}


if (completedItemList.childElementCount == 0) {
    leftToDoText.style.display = 'none';
} else {
    leftToDoText.style.display = 'block';
}



// after that addEventListener <ul> with class=todoItems. Because we need to listen for click event in all delete-button and checkbox
completedItemList.addEventListener('click', function (event) {
    // check if the event is on checkbox
    if (event.target.type === 'checkbox') {
        // toggle the state
        toggle(event.target.parentElement.getAttribute('data-key'));
    }

    // check if that is a delete-button
    if (event.target.classList.contains('fa-trash')) {
        // get id from data-key attribute's value of parent <li> where the delete-button is present
        deleteTodo(event.target.parentElement.getAttribute('data-key'));
    }

    if (completedItemList.childElementCount == 0) {
        leftToDoText.style.display = 'none';
    } else {
        leftToDoText.style.display = 'block';
    }



});

notCompletedItemList.addEventListener('click', function (event) {
    // check if the event is on checkbox
    if (event.target.type === 'checkbox') {
        // toggle the state
        toggle(event.target.parentElement.getAttribute('data-key'));
    }

    // check if that is a delete-button
    if (event.target.classList.contains('fa-trash')) {
        // get id from data-key attribute's value of parent <li> where the delete-button is present
        deleteTodo(event.target.parentElement.getAttribute('data-key'));
    }

    if (notCompletedItemList.childElementCount == 0) {
        leftToDoText.style.display = 'none';
    } else {
        leftToDoText.style.display = 'block';
    }
});