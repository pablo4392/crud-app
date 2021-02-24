import axios from 'axios'
import {useEffect, useState} from 'react'
import TodoItem from './TodoItem.js'

const TodoContainer = () => {
    const [toDo, setToDo] = useState([]);

    useEffect(() => {
        const promise = axios({
            url:'https://todos-academlo.herokuapp.com/api/todos',
            method: 'GET',
        });

        promise.then((response) => {
            console.log(response.data)
            // setStudent(response.data.todos[0].student);
            // setTask(response.data.todos[0].task);
            setToDo(response.data.todos)
        })
    }, []);

    const todoArray = toDo.map((value) => (
        <TodoItem key={value._id} student={value.student} task= {value.task} />
    ));

    // useEffect( () => {
    //     const promise = axios({
    //         url:'https://todos-academlo.herokuapp.com/api/todo/:id',
    //         method: 'POST'
    //     });
    // })

    // useEffect( () => {
    //     const promise = axios({
    //         url:'https://todos-academlo.herokuapp.com/api/todo/:id',
    //         method: 'DELETE'
    //     });
    // })

    // useEffect( () => {
    //     const promise = axios({
    //         url:'https://todos-academlo.herokuapp.com/api/todo',
    //         method: 'PUT'
    //     });
    // })

    return (
        <div>
            {toDo.length >0 && todoArray}
        </div>
    )
}

export default TodoContainer