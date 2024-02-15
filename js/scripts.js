// Seleção de elemento
const todoForm = document.querySelector('#todo-form');
const todoInput = document.querySelector('#todo-input');
const todoList = document.querySelector('#todo-list');
const editForm = document.querySelector('#edit-form');
const editInput = document.querySelector('#edit-input');
const cancelEditBtn = document.querySelector('#cancel-edit-btn');

let oldInputValue;

//funções

const saveTodo = (text) => {

const todo = document.createElement("div");
todo.classList.add("todo");

const todoTitle = document.createElement("h3");
todoTitle.innerText = text;
todo.appendChild(todoTitle); // colocando o h3 acabei de criar

const doneBtn = document.createElement('button');
doneBtn.classList.add("finish-todo");
doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>';//aspas simples pq ja tem aspas duplas dentro
todo.appendChild(doneBtn);

const editBtn = document.createElement('button');
editBtn.classList.add("edit-todo");
editBtn.innerHTML = ' <i class="fa-solid fa-pen"></i>';//aspas simples pq ja tem aspas duplas dentro
todo.appendChild(editBtn);

const deleteBtn = document.createElement('button');
deleteBtn.classList.add("remove-todo");
deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';//aspas simples pq ja tem aspas duplas dentro
todo.appendChild(deleteBtn);

todoList.appendChild(todo);

todoInput.value = ""; // limpar a caixa dps de enviar
todoInput.focus(); //quando terminar de enviar nao precisa clicar de novo na caixa de texto pra enviar

};

const toggleForms = () => {
editForm.classList.toggle("hide")
todoForm.classList.toggle("hide")
todoList.classList.toggle("hide")

};

const updateTodo = (text) =>{
const todos = document.querySelectorAll(".todo");//array de todo ´pq selecionou todos

//for each para percorrer o array
todos.forEach((todo) => {

let todoTitle = todo.querySelector("h3");

if(todoTitle.innerText === oldInputValue){
todoTitle.innerText = text;

}

});


}

//eventos

//adicionando evento ao formulario
todoForm.addEventListener("submit", (e) =>{
e.preventDefault(); // impede que ap agina seja recarregada

const inputValue = todoInput.value; // pega o valo de todoInput(input)

if(inputValue){ //se input for valido/true
saveTodo(inputValue);
//save todo
}
});


document.addEventListener("click", (e) => {

const targetEl = e.target;
const parentEl = targetEl.closest("div");//seleciona div mais proxima
let todoTitle;

if(parentEl && parentEl.querySelector("h3")){
todoTitle = parentEl.querySelector("h3").innerText;

}

if(targetEl.classList.contains("finish-todo")){
parentEl.classList.toggle("done"); //pode clicar de novo (alternar)

}

if(targetEl.classList.contains("remove-todo")){
parentEl.remove(); // remove p elemento pai, tarefa
    
}

if(targetEl.classList.contains("edit-todo")){
toggleForms(); //esconde um formulario e mostra outro

editInput.value = todoTitle;
oldInputValue = todoTitle;
}

});


cancelEditBtn.addEventListener("click", (e) =>{
e.preventDefault();

toggleForms();
});

editForm.addEventListener("submit", (e) =>{

e.preventDefault();

const editInputValue = editInput.value;

if(editInputValue){
updateTodo(editInputValue);

}

toggleForms();

});