import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const App = () => {
    const [tasks, setTasks] = useState(
        JSON.parse(localStorage.getItem("tasks")) || []
    );
    const [taskText, setTaskText] = useState("");

    const addTask = () => {
        if (taskText.trim()) {
            const newTask = { text: taskText, completed: false };
            setTasks([...tasks, newTask]);
            setTaskText("");

            // Update local storage
            localStorage.setItem("tasks", JSON.stringify([...tasks, newTask]));
        }
    };

    const toggleTaskCompletion = (index) => {
        const updatedTasks = [...tasks];
        updatedTasks[index].completed = !updatedTasks[index].completed;
        setTasks(updatedTasks);

        // Update local storage
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    };

    const clearAllTasks = () => {
        setTasks([]);
        localStorage.removeItem("tasks"); // Clear local storage
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            addTask();
        } else if (e.key === 'Delete') {
            clearAllTasks();
        }
    };

    useEffect(() => {
        // Retrieve data from local storage on component mount
        const storedTasks = JSON.parse(localStorage.getItem("tasks"));
        if (storedTasks) {
            setTasks(storedTasks);
        }
    }, []);

    return (
        <div className="container">
            <h1>Reactodo: your to-do list.</h1>
            <input
                type="text"
                placeholder="Enter a task..."
                value={taskText}
                onChange={(e) => setTaskText(e.target.value)}
                onKeyDown={handleKeyDown}
            />
            <button onClick={addTask}>Add Task</button>
            <div id="taskList">
                {tasks.map((task, index) => (
                    <div
                        key={index}
                        className={`task ${task.completed ? 'completed' : ''}`}
                        onClick={() => toggleTaskCompletion(index)}
                    >
                        <span>{task.text}</span>
                    </div>
                ))}
            </div>
            <button onClick={clearAllTasks}>Clear All</button>
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById("root"));