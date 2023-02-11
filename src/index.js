import './style.css';
import {createForm} from './dom';
import {FormData} from './form';
import {LocalData} from './storage';

if (LocalData.storageAvailable('localStorage')) {
  var tasks = LocalData.getDataFromLocal();
  createForm.createTaskWrap(tasks);
}
else {
  alert('Local data services currently not available!');
  tasks = [];
}

let addTaskBtn = document.querySelector('#add_btn');
addTaskBtn.addEventListener('click', () =>{
  createForm.openTaskForm();
});

addBtnListeners();

function createAllTasks(list){
  createForm.clearAllChilds();
  LocalData.saveDataToLocal(list);
  createForm.createTaskWrap(list);
}

function addBtnListeners(){
  let closeBtn = document.querySelector('.close_form');
  let submitBtn = document.querySelector('.submit_btn');

  closeBtn.addEventListener('click', () => {
    createForm.closeTaskForm();
    createForm.closeEditForm(); // Для обнуления строк input
  });

  if (submitBtn){
    submitBtn.addEventListener('click', (event) => {
      event.preventDefault();
      let task = new FormData();
      tasks.push(task.valuesForm);
      createAllTasks(tasks);
    });
  }
}

export function iconEventListener(event){
  let index = Number(event.target.className.slice(-1));
  // Если нажата иконка удаления
  if (event.target.className.includes('fa-solid fa-trash-can')){
    tasks.splice(index-1, 1);
    LocalData.removeDataFromLocal(index-1);
    createAllTasks(tasks);
  // Если нажата иконка завершения
  } else if (event.target.className.includes('fa-solid fa-check') && tasks[index-1].done !== true){
    tasks[index-1].done = true;
    tasks[index-1].priority = 'Zero'; // Для изменения цвета левой границы
    createAllTasks(tasks);
  // Если нажата иконка изменения задания
  } else if (event.target.className.includes('fa-solid fa-pen-to-square')){
    if (tasks[index-1].done === true){
      return alert('Задание выполненно, нельзя отредактировать!');
    }
    createForm.openEditForm(tasks[index-1]);

    let applyBtn = document.querySelector('.apply_btn');

    applyBtn.addEventListener('click', (event) =>{
      event.preventDefault();
      let task = new FormData();
      tasks.splice(index-1, 1, task.valuesForm);
      createForm.closeEditForm();
      createAllTasks(tasks);
    }, {once: true});
  }
  return
}