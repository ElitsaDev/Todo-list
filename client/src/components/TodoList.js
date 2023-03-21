import { TodoItem } from './TodoItem'

export const TodoList = ({ todos, setTodos }) => {
    console.log(todos)
    const todoClickHandler = (todo) => {
        fetch(`http://localhost:3030/jsonstore/todos/${todo._id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ...todo, isCompleted: !todo.isCompleted })
        })
            .then(res => res.json())
            .then(modifiedTodo => {

                setTodos(oldTodos => oldTodos.map(x => x._id === modifiedTodo._id
                    ? modifiedTodo
                    : x));
            })
    }

    const deleteTodoHandler = (todo) => {
        fetch(`http://localhost:3030/jsonstore/todos/${todo._id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(todo)
        }).then(res => res.json())
            .then(deletedTodo => {
                console.log(todo)
                setTodos(todos => todos.filter(t => t._id !== deletedTodo._id))
            }

            )
    }

    return (
        <table className="table">
            <thead>
                <tr>
                    <th className="table-header-task">Task</th>
                    <th className="table-header-status">Status</th>
                    <th className="table-header-action">Action</th>
                </tr>
            </thead>

            <tbody>
                {todos.map((todo) =>
                    <TodoItem key={todo._id} {...todo} onClick={todoClickHandler} onDelete={deleteTodoHandler} />
                )}
            </tbody>
        </table>
    );
}