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
            <label>
                Student:
                <input name='student' ref={register} />
            </label>
            <br />
            <label>
                Task:
                <input name='task' ref={register}/>
            </label>
            <br />
            <button>Submit</button>
        </form>
    )
}

export default CreateTodo