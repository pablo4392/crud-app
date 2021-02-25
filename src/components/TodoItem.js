import {useForm} from 'react-hook-form'
import './todoItem.css'

const TodoItem = ({student, task, deleteTask, updateTask, id}) => {
    const {register, handleSubmit} = useForm();

    const asd = (check) => {
        console.log(check)
    }

    return(
        <div className='task-box'>
            <p className='student'>{student}</p>
            <p className='task'>Task: {task}</p>
            <div>
                <button onClick={()=>updateTask({
                                        student: student,
                                        task: task,
                                        _id: id
                                   })} className='update-button'>Update</button>
                <button onClick={()=>deleteTask(id)} className='delete-button'>Delete</button>
            </div>
            <form>
                <label className='checkbox'>
                    Task complete
                    <input type="checkbox" onChange={handleSubmit(asd)} name="isCompleted" ref={register} />
                </label>
            </form>
        </div>
    )
}

export default TodoItem