import axios from 'axios'
import {useEffect, useState} from 'react'
import './todoContainer.css'
import TodoItem from './TodoItem.js'
import CreateTodo from './CreateTodo.js'

const TodoContainer = () => {
    const [tasks, setTasks] = useState([]); //variable para traer todos los task 
    const [newTask, setNewTask] = useState(null); //variable para crear una nueva tarea
    const [idToDelete, setIdToDelete] = useState(null); //variable para conocer el id que debemos eliminar
    const [taskToUpdate, setTaskToUpdate] = useState(null);
    const [updateTaskDone, setUpdateTaskDone] = useState(null);

    //GET method
    useEffect(() => {
        const promise = axios.get('https://todos-academlo.herokuapp.com/api/todos');

        promise.then((response) => {  
            console.log(response.data)  
            setTasks(response.data.todos);
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

    //PUT method
    useEffect(() => {
        if(updateTaskDone) {
            const promise = axios.put(
                `https://todos-academlo.herokuapp.com/api/todo/${updateTaskDone._id}`,
                updateTaskDone
            );

            promise.then((response) => {
                setTasks((prevState) => {
                    prevState.map((task) => {
                        if(task._id !== response.data._id) {
                            return task;
                        }

                        return {
                            ...response.data,
                        };
                    })
                });
            });       
            setTaskToUpdate(null)
        }
    }, [updateTaskDone])

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

    const handleCreateTask = (data) => { //funcion para llamar nueva tarea
        setNewTask(data);
    };

    const handleUpdateTask = (task) => {
        setTaskToUpdate(task);
    }

    const handleUpdateTaskDone = (task) => {
        console.log(task);
        setUpdateTaskDone(task);
    }

    const handleDelete = (id) => { //funcion para llamar a eliminar
        setIdToDelete(id);
    };

    return (
        <div className='container'>
            {taskToUpdate ? ( 
                <CreateTodo
                    createTask={handleUpdateTaskDone}
                    data={taskToUpdate}
                    buttonText='Update'
                />
            ) : (
                <CreateTodo
                    createTask={handleCreateTask}
                    buttonText='Create'
                />
            )
            }

            {tasks.map((value) => (
                <TodoItem 
                    key={value._id} 
                    id={value._id}
                    student={value.student} 
                    task={value.task}
                    deleteTask={handleDelete}
                    updateTask={handleUpdateTask}
                />))
            }
        </div>
    )
}

export default TodoContainer