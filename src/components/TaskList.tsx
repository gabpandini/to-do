import { useState } from "react"
import { Trash } from 'phosphor-react';
import '../styles/tasklist.scss'

export function TaskList() {
  const [tasks, setTasks] = useState()

  return (
    <section className="task-list container" >
      <header>
        <input placeholder="Adicione uma nova tarefa" type="text" />
        <button>Criar</button>
      </header>
      <main>
        <div>
          <div>
            <span className="createdTasks" >Tarefas criadas</span>
            <span className="numberOfTaks" >10</span>
          </div>
          <div>
            <span className="completedTasks" >Concluídas</span>
            <span className="numberOfTaks" >5 de 10</span>
          </div>
        </div>
        <ul>
          <li>
            <div>
              <label htmlFor="">
                <input type="checkbox" />
                <span className="checkmark"></span>
              </label>
              <p>Nome da task</p>
            </div>
            <button >
              <Trash size={24} />
            </button>
          </li>
        </ul>
      </main>
    </section>
  )
}