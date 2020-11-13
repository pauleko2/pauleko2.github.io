const input = document.querySelector('input');
const btn = document.querySelector('.addTask > button');

const notCompleted = document.querySelector('.notCompleted');
const Completed = document.querySelector('.Completed');


btn.addEventListener('click', addList);
var completedTasks = [];
var notCompletedTasks = [];

var compLength;
var notCompLength;

window.onload = function () {
    var str = localStorage.getItem('comp');
    if (str) {
        completedTasks = JSON.parse(str);
    }

    var str2 = localStorage.getItem('unComp');
    if (str2) {
        notCompletedTasks = JSON.parse(str2);
    }

    compLength = completedTasks.length;
    notCompLength = notCompletedTasks.length;

    for (i = 0; i < compLength; i++) {
        addList(completedTasks[i]);
    }

    for (i = 0; i < notCompLength; i++) {
        addList(notCompletedTasks[i]);
    }
}

function addToCompleted(item) {
    const newLi = document.createElement('li');
    const checkBtn = document.createElement('button');
    const delBtn = document.createElement('button');
    checkBtn.innerHTML = '<i class="fa fa-check"></i>';
    delBtn.innerHTML = '<i class="fa fa-trash"></i>';
    checkBtn.style.color = "white";
    delBtn.style.color = "white";

    newLi.textContent = item;
    Completed.appendChild(newLi);
    newLi.appendChild(checkBtn);
    newLi.appendChild(delBtn);
}

function addToUnCompleted(item) {
    const newLi = document.createElement('li');
    const checkBtn = document.createElement('button');
    const delBtn = document.createElement('button');

    checkBtn.innerHTML = '<i class="fa fa-check"></i>';
    delBtn.innerHTML = '<i class="fa fa-trash"></i>';
    checkBtn.style.color = "white";
    delBtn.style.color = "white";

    newLi.textContent = item;
    notCompleted.appendChild(newLi);
    newLi.appendChild(checkBtn);
    newLi.appendChild(delBtn);
}


function addList(e) {
    const newLi = document.createElement('li');
    const checkBtn = document.createElement('button');
    const delBtn = document.createElement('button');

    checkBtn.innerHTML = '<i class="fa fa-check"></i>';
    delBtn.innerHTML = '<i class="fa fa-trash"></i>';
    checkBtn.style.color = "white";
    delBtn.style.color = "white";

    newLi.textContent = e;
    notCompleted.appendChild(newLi);
    newLi.appendChild(checkBtn);
    newLi.appendChild(delBtn);

    if (input.value !== '') {
        newLi.textContent = input.value;
        input.value = '';
        notCompleted.appendChild(newLi);

        notCompletedTasks.push(newLi.textContent);
        localStorage.setItem("unComp", JSON.stringify(notCompletedTasks));
        newLi.appendChild(checkBtn);
        newLi.appendChild(delBtn);
    }

    checkBtn.addEventListener('click', function () {
        const parent = this.parentNode;
        parent.remove();
        Completed.appendChild(parent);

        completedTasks.push(parent.value);
        localStorage.setItem("comp", JSON.stringify(completedTasks));


        checkBtn.style.display = 'none';

        if (Completed.childElementCount == 1) {
            Completed.style.display = 'none';
        } else {
            Completed.style.display = 'inline';
        }

        if (notCompleted.childElementCount == 1) {
            notCompleted.style.display = 'none';
        } else {
            notCompleted.style.display = 'inline';
        }
    });

    delBtn.addEventListener('click', function () {
        const parent = this.parentNode;
        parent.remove();

        if (Completed.childElementCount == 1) {
            Completed.style.display = 'none';
        } else {
            Completed.style.display = 'inline';
        }

        if (notCompleted.childElementCount == 1) {
            notCompleted.style.display = 'none';
        } else {
            notCompleted.style.display = 'inline';
        }
    });

    if (Completed.childElementCount == 1) {
        Completed.style.display = 'none';
    } else {
        Completed.style.display = 'inline';
    }

    if (notCompleted.childElementCount == 1) {
        notCompleted.style.display = 'none';
    } else {
        notCompleted.style.display = 'inline';
    }
}