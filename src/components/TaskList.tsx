import { useState } from "react";
import { ClipboardText, PlusCircle, Trash } from 'phosphor-react';
import { v4 as uuidv4 } from 'uuid';
import '../styles/tasklist.scss';

interface Task {
  id: string;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [newTaskTitle, setNewTaskTitle] = useState('')
  const completedTasks = tasks.filter(task => task.isComplete)

  function handleCreateNewTask() {
    if(!newTaskTitle) return;

    const newTask = {
      id: uuidv4(),
      title: newTaskTitle,
      isComplete: false
    }

    setTasks(oldTasks => [...oldTasks, newTask])
    setNewTaskTitle('')
  }

  function handleToggleTaskCompletion(id: string) {
    const newTasks = tasks.map(task => task.id === id ? {
      ...task,
      isComplete: !task.isComplete
    } : task)

    setTasks(newTasks)
  }

  function handleRemoveTask(id: string) {
    const filteredTasks = tasks.filter(task => task.id !== id);

    setTasks(filteredTasks);
  }

  return (
    <section className="task-list container" >
      <header>
        <input 
          placeholder="Adicione uma nova tarefa" 
          type="text"
          onChange={(e) => setNewTaskTitle(e.target.value)}
          value={newTaskTitle} 
        />
        <button type="submit" onClick={handleCreateNewTask} >
          Criar
          <PlusCircle size={22} />  
        </button>
      </header>

      <main>
        <div className="tasksCount" >
          <div>
            <span className="createdTasks" >Tarefas criadas</span>
            <span className="numberOfTaks" >{tasks.length}</span>
          </div>
          <div>
            <span className="completedTasks" >Concluídas</span>
            <span className="numberOfTaks" >{completedTasks.length} de {tasks.length}</span>
          </div>
        </div>
        {tasks.length == 0 ? (
          <div className="noTasks" >
            <ClipboardText size={42} />
            <span>Você não tem tarefas cadastradas</span>
            <span>Crie tarefas e organize seus itens a fazer</span>
          </div>
          ) : (
          <ul>
            {tasks.map(task => (
              <li key={task.id} >
                <div className={task.isComplete ? 'completed' : ''} >
                  <label className="checkbox-container" >
                    <input 
                      type="checkbox" 
                      className="checkmark" 
                      readOnly
                      checked={task.isComplete}
                      onClick={() => handleToggleTaskCompletion(task.id)}
                    />
                    <span className="checkmark" ></span>
                  </label>
                  <p>{task.title}</p>
                </div>
                <button onClick={() => handleRemoveTask(task.id)} >
                  <Trash size={24} />
                </button>
              </li>
            ))}
          </ul>
        )}
      </main>
    </section>
  )
}