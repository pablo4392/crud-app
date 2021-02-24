import {useForm} from 'react-hook-form'
import {useEffect} from 'react'
import './createTodo.css'

const  CreateTodo = (
    onCreateTask,
    resetForm,
    data = {
        task: "",
        student: "",
        _id: null
    }
) => {
    const {register, handleSubmit, reset, setValue} = useForm({
        defaultValues: data
    });

    // useEffect(() => {
    //     if(resetForm){
    //         reset({
    //             task: "",
    //             student: "",
    //         })
    //     }
    // }, [resetForm, reset]);

    useEffect(() => {
        setValue("_id", data._id);
        setValue("student", data.student);
        setValue("task", data.task);
    }, [data, setValue]);
    
    const onSubmit = (data) => {
        // onCreateTask(data);
        console.log(data)
    }

    return(
        <form className='create-task' onSubmit={handleSubmit(onSubmit)}>
            <div>
                <h3>Instructions</h3>
                <p>Write a name and design a task to do, your task appear behind, you can delete or update</p>
            </div>
            <label className='input-label'>
                Student:
                <input name='student' className='student-input' ref={register} />
            </label>
            <br />
            <label className='input-label'>
                Task:
                <input name='task' className='task-input' ref={register}/>
            </label>
            <br />
            <button className='submit-button'>Submit</button>
        </form>
    )
}

export default CreateTodo