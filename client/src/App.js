import './App.css';
import { useState, useEffect } from 'react';

import { Header } from './components/Header';
import { AddItem } from './components/AddItem';
import { Spiner } from './components/LoadingSpiner';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';

function App() {
    const [todos, setTodos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch(`http://localhost:3030/jsonstore/todos`)
            .then(response => response.json())
            .then(data => {
                setTodos(Object.values(data));
                setIsLoading(false);
            })
    }, []);

    return (
        <div>
            <Header />
            <main className="main">
                <section className="todo-list-container">
                    <h1>Todo List</h1>
                    <div className="add-btn-container">
                        <AddItem />
                    </div>
                    <div className="table-wrapper">
                        {isLoading
                            ? <Spiner />
                            : <TodoList todos={todos} setTodos={setTodos} />}
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}

export default App;
