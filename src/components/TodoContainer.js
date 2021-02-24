import axios from 'axios'
import {useEffect, useState} from 'react'
import './todoContainer.css'
import TodoItem from './TodoItem.js'
import CreateTodo from './CreateTodo.js'

const TodoContainer = () => {
    const [tasks, setTasks] = useState([]); //variable para traer todos los task 
    const [idToDelete, setIdToDelete] = useState(null); //variable para conoverl el id que debemos eliminar
    const [newTask, setNewTask] = useState(null);

    //GET method
    useEffect(() => {
        const promise = axios.get('https://todos-academlo.herokuapp.com/api/todos');

        promise.then((response) => {         
            setTasks(response.data.todos)
        });
    }, []);

    //POST method
    useEffect(() => {
        if (newTask) {
            const promise = axios.post('https://todos-academlo.herokuapp.com/api/todo', newTask)

            promise.then((response) => {
                //usamos el valor anterior para calcular uno nuevo 
                setTasks((prevState) => [response.data, ...prevState]);
            })
        };
    }, [newTask]);

    //DELETE method
    useEffect( () => {
        if(idToDelete) { //por default "idToDelete" tiene un valor nulo, si cambia su valor se ejecutara el metodo
            const promise = axios.delete(`https://todos-academlo.herokuapp.com/api/todo/${idToDelete}`);

            promise.then(() => {
                setTasks((prevState) =>
                //comparamos el estado que tiene actualmente "set task" que es la variable que trae a la pantalla todos los "task"
                //y solo guardamos los "task que sean diferentes al id que queremos eliminar"
                prevState.filter((value) => value._id !== idToDelete)
                )
            });
        };

        //nos permite regresar el estado de la variable "idToDelete" a null para veitar bugs
        return () => {
            setIdToDelete(null);
        };
    }, [idToDelete]);

    const handleDelete = (id) => { //funcion para llamar a eliminar
        setIdToDelete(id);
    };

    const handleCreateTask = (data) => {
        console.log(data)
        setNewTask(data);
    };

    return (
        <div className='container'>
            <CreateTodo
                createTask={handleCreateTask}
            />

            {tasks.map((value) => (
                <TodoItem 
                    key={value._id} 
                    id={value._id}
                    student={value.student} 
                    task={value.task}
                    deleteTask={handleDelete}
                />))
            }
        </div>
    )
}

export default TodoContainer