'use strict';


class Todo {
    constructor(form, input, todoList, todoCompleted, todoButtons, todoContainer) {
        this.form = document.querySelector(form);
        this.input = document.querySelector(input);
        this.todoList = document.querySelector(todoList);
        this.todoCompleted = document.querySelector(todoCompleted);
        this.todoButtons = document.querySelector(todoButtons);
        this.todoContainer = document.querySelector(todoContainer);
        this.todoData = new Map( JSON.parse(localStorage.getItem('toDoList')));
    
    }

    addToStorage(){
        localStorage.setItem('toDoList', JSON.stringify([...this.todoData]))
    };

    render(){
        this.todoList.textContent = '';
        this.todoCompleted.textContent = '';
        this.todoData.forEach(this.createItem, this);
        this.addToStorage();
    }

    createItem(todo){
        const li = document.createElement('li');
        li.classList.add('todo-item');
        li.key = todo.key;
        li.insertAdjacentHTML('beforeend', `
            <span class="text-todo">${todo.value}</span>
            <div class="todo-buttons">
                <button class="todo-remove" data-key='${todo.key}'></button>
                <button class="todo-complete" data-key='${todo.key}'></button>
            </div>
        `);

        if(todo.completed){
            this.todoCompleted.append(li)
        } else {
            this.todoList.append(li);
            
        }
    }

    addToDo(e){
        e.preventDefault();
        if(this.input.value.trim()){
            const newTodo = {
                value: this.input.value,
                completed: false,
                key: this.generateKey(),
            };
            this.todoData.set(newTodo.key, newTodo); 
            this.render();
            this.input.value = '';
        } else{
            alert('Нельзя добавить пустое дело!')
        };
        

    }


    generateKey(){
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }

    deleteItem(key){
        
        this.todoData.forEach((i) =>{
            if(i.key === key){
                this.todoData.delete(key);
            }

        })
        this.render();
    }

    completedItem(key){

        this.todoData.forEach((i)=>{
            if(i.key === key){
                i.completed = i.completed === true ? false : true;
            }
        });
        this.render();

    }

    handler(){
    

        this.todoContainer.addEventListener('click', (event) =>{
            if(event.target.className === 'todo-remove'){

                this.deleteItem(event.target.dataset.key);
                
            } else if(event.target.className === 'todo-complete') {
                console.log(2)
                this.completedItem(event.target.dataset.key);
            }
        });
        //делегирование
    }

    init() {
        this.form.addEventListener('submit', this.addToDo.bind(this))

        this.render();
    }
}

const todo = new Todo('.todo-control', '.header-input', '.todo-list', '.todo-completed', '.todo-buttons', '.todo-container');

todo.init();
todo.handler();