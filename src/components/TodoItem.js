import './todoItem.css'

const TodoItem = ({student, task, deleteTask, updateTask, id}) => {

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
            <label className='checkbox'>
                Task complete
                <input type="checkbox" name="check" />
            </label>
        </div>
    )
}

export default TodoItem