$(document).ready(function () {
    $("#app").html("Todos")
    let todos = []
    let ui = {
        input: $("#input"),
        btn_add: $("#btn_add"),
        todolist: $("#todolist"),
        todolist_item: "#todolist li",
    }
    let getTodoList = function () {
        let tmp = window.localStorage.getItem("todolist")
        if (tmp !== null){
            return JSON.parse(tmp)
        }
        return []
    }
    let addTodo = function (todo) {
        todos.push(todo)
        window.localStorage.setItem("todolist", JSON.stringify(todos))
        renderTodo(todo)
    }
    let removeTodo = function (id) {
        let tmp = todos.filter(function (todo){
            return todo.id !== id
        })
        window.localStorage.setItem("todolist", JSON.stringify(tmp))
        return tmp
    }
    let getEpoch = function() {
        return (new Date).getTime()
    }

    let renderTodo = function(todo) {
        let li = $("<li></li>")
        li.text(todo.text)
        li.attr("data-id", todo.id)
        li.attr("data-active", todo.active)
        ui.todolist.append(li)
    }
    let renderTodoList = function() {
        if (todos.length > 0){
            ui.todolist.html("")
            todos.forEach(function(todo){
                renderTodo(todo)
            })
        }
    }

    // element events
    ui.btn_add.click(function (){
        if(ui.input.val() !== ""){
            ui.btn_add.fadeOut()

            let todo = {
                id: getEpoch(), // cheating! using time as id, do NOT in real life!
                text: ui.input.val(),
                active: true,
            }
            addTodo(todo)

            ui.input.val("")
            ui.btn_add.fadeIn()
        }
    })
    ui.input.keypress(function(event){
        if(event.which === 13){
            ui.btn_add.click()
        }
    })
    $(document).on("click", ui.todolist_item, function() {
        let item_id = parseInt($(this).attr("data-id"))
        todos = removeTodo(item_id)
        $(this).detach()          
    })

    // init application
    todos = getTodoList() // from localStorage
    renderTodoList(todos) // add to list

    console.log(todos)

})