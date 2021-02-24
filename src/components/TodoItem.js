import {useForm} from 'react-hook-form'
import './todoItem.css'

const TodoItem = ({
    student,
    task,
    deleteTask,
    id,
}) => {
    const {register, handleRegister} = useForm();

    return(
        <div className='task-box'>
            <p className='student'>{student}</p>
            <p className='task'>Task: {task}</p>
            <div>
                <button className='update-button'>Update</button>
                <button onClick={()=>deleteTask(id)} className='delete-button'>Delete</button>
            </div>
            <label className='checkbox'>
                Task complete
                <input type="checkbox" name="check" />
            </label>
        </div>
    )
}

export default TodoItem