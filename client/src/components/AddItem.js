import { useState, useEffect } from "react";

export const AddItem = () => {
    const [todoListAdd, setTodoListAdd] = useState({});

    useEffect(() => {
        async function fetchData() {
            await fetch(`http://localhost:3030/jsonstore/todos`)
                .then(response => response.json())
                .then(data => {
                    setTodoListAdd(Object.values(data));
                })
                .catch(err => {
                    console.log(err);
                });
        }
        fetchData();
    }, [todoListAdd]);

    const createUserOpenHendler = (e) => {
        e.preventDefault();
        const text = prompt("Add new task name:")
        let newTodo = {
            "text": text,
            "isCompleted": false
        }

        fetch(`http://localhost:3030/jsonstore/todos`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newTodo),
        })
            .then(res => res.json())
            .then(newTodo => {
                setTodoListAdd(todoListAdd => [...todoListAdd, newTodo]);
            })
    }

    return (
        <button className="btn-add btn"
            onClick={createUserOpenHendler} >+ Add new Todo
        </button>
    );
}