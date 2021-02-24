import './App.css';
import CreateTodo from './components/CreateTodo.js'
import TodoContainer from './components/TodoContainer.js'

function App() {
  return (
    <div className="App">
      <CreateTodo />
      <TodoContainer />
    </div>
  );
}

export default App;
