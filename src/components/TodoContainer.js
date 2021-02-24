import axios from 'axios'
import {useEffect, useState} from 'react'
import TodoItem from './TodoItem.js'

const TodoContainer = () => {
    const [task, setTask] = useState([]); //variable para traer todos los task 
    const [idToDelete, setIdToDelete] = useState(null); //variable para conoverl el id que debemos eliminar
    const [newTask, setNewTask] = useState(null);
    const [resetForm, setResetForm] = useState(false);

    //GET method
    useEffect(() => {
        const promise = axios.get('https://todos-academlo.herokuapp.com/api/todos');

        promise.then((response) => {
            console.log(response.data)            
            setTask(response.data.todos)
        })
    }, []);

    //POST method
    // useEffect( () => {
    //     if (newTask) {
    //         const promise = axios({
    //             url:'https://todos-academlo.herokuapp.com/api/todo',
    //             data: newTask,
    //             method: 'POST'
    //         });

    //         promise.then((response) => {
    //             setTask((miEstate) => [response.data, ...miEstate])
    //             setResetForm(true)
    //         })
    //     }
    // }, [newTask])

    //DELETE method
    useEffect( () => {
        if(idToDelete) { //por default "idToDelete" tiene un valor nulo, si cambia su valor se ejecutara el metodo
            const promise = axios.delete(`https://todos-academlo.herokuapp.com/api/todo/${idToDelete}`);

            promise.then(() => {
                setTask((prevState) =>
                //comparamos el estado que tiene actualmente "set task" que es la variable que trae a la pantalla todos los "task"
                //y solo guardamos los "task que sean diferentes al id que queremos eliminar"
                prevState.filter((value) => value._id !== idToDelete)
                )
            })
        }
    }, [idToDelete])

    const handleDelete = (id) => {
        setIdToDelete(id);
    }

    return (
        <div>
            {task.map((value) => (
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