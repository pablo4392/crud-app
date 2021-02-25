import {useForm} from 'react-hook-form'
import {useEffect} from 'react'
import './createTodo.css'

const  CreateTodo = ({
    createTask, 
    buttonText,
    data = {
        student: "",
        task: "",
        _id: null
    }}) => {
    const {register, handleSubmit, reset, setValue} = useForm({
        defaultValues: data,
    });

    const saveData = (data) => { //la data que nosotros guardemos en el formulario sera guardada aqui
        createTask(data);
        reset({
            student: '',
            task: ''
        })

    }

    useEffect(() => {
        setValue('_id', data._id);
        setValue('student', data.student);
        setValue('task', data.task);
    }, [data, setValue]);

    return(
        <form className='create-task' onSubmit={handleSubmit(saveData)}> 
            <h1 className="principal-title">To Do App</h1> 
            <div>
                <h3>Instructions</h3>
                <p>Write a name and designate a task to do, your task will appear below, you can delete or update</p>
            </div>
            <label className='input-label'>
                Student:
                <input name='student' className='student-input' ref={register} placeholder='write your name' />
            </label>
            <br />
            <label className='input-label'>
                Task:
                <input name='task' className='task-input' ref={register} placeholder='write a new task'/>
            </label>
            <br />
            <button className='submit-button'>{buttonText}</button>
        </form>
    )
}

export default CreateTodo