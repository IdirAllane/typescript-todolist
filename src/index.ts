import { v4 as uuidV4 } from 'uuid'
// console.log(uuidV4());

const list = document.querySelector<HTMLLIElement>('#list')
const form = document.querySelector<HTMLFormElement>('#new-task-form')
const input = document.querySelector<HTMLInputElement>('#new-task-title')
const tasks: Task[] = loadTasks()

tasks.forEach(addListItem)

type Task = {
    id: string
    title: string
    completed: boolean
    createdAt: Date
}

form?.addEventListener('submit', (e) => {
    e.preventDefault()

    if (input?.value == '' || input?.value == null) return

    const newTask: Task = {
        id: uuidV4(),
        title: input.value,
        completed: false,
        createdAt: new Date()
    }

    tasks.push(newTask)

    addListItem(newTask)
    input.value = ''
})

function addListItem(task: Task) {
    const item = document.createElement('li')
    const label = document.createElement('label')
    const pTag = document.createElement('p')
    const checkbox = document.createElement('input')
    checkbox.addEventListener('change', () => {
        task.completed = checkbox.checked
        saveTasks()
    })
    checkbox.type = 'checkbox'
    checkbox.id = 'checkbox'
    checkbox.checked = task.completed
    pTag.append(task.title)
    label.append(checkbox, pTag)
    item.append(label)
    list?.append(item)
}

function saveTasks() {
    localStorage.setItem('TASKS', JSON.stringify(tasks))
}

function loadTasks(): Task[] {
    const taskJSON = localStorage.getItem('TASKS')
    if (taskJSON == null) return []

    return JSON.parse(taskJSON)
}
