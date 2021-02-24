import {useForm} from 'react-hook-form'
import './todoItem.css'

const TodoItem = ({
    student,
    task,
}) => {
    const {register, handleRegister} = useForm();

    return(
        <div className='task-box'>
            <p className='student'>Student: {student}</p>
            <p className='task'>Task: {task}</p>
            <div>
                <button className='update-button'>Update</button>
                <button className='delete-button'>Delete</button>
            </div>
            <label className='checkbox'>
                Task complete
                <input type="checkbox" name="check" ref={register}/>
            </label>
        </div>
    )
}

export default TodoItem