import {iconEventListener} from './index';

export const createForm = (() => {
    const form_cont = document.querySelector('#form__container');
    const modal = document.querySelector('.modal');
    const table = document.querySelector('#table');
    const done_table = document.querySelector('#done_table');

    /* Элементы для изменения формы в редактор задания */

    const title = document.querySelector('#title');
    const description = document.querySelector('#descr');
    const dateInp = document.querySelector('#date');
    const priority = document.querySelector('#priority');

    const header = document.querySelector('.cont_title_h3');

    const applyBtn = document.querySelector('.apply_btn');
    const submit_btn = document.querySelector('.submit_btn');

    /* Функция для отображения формы при нажатии кнопки */
    const openTaskForm = function(){
        form_cont.style.transform = 'translateY(-6rem)';
        form_cont.style.opacity = '0';
        setTimeout(() =>{
            form_cont.style.transform = 'translateY(0rem)';
            form_cont.style.opacity = '100';
        }, 100)
        modal.classList.remove('hidden');
        modal.classList.add('show');
    }

    /* Функция закрытия формы */
    const closeTaskForm = function(){
        form_cont.style.transform = 'translateY(-6rem)';
        form_cont.style.opacity = '0';
        setTimeout(() =>{
            modal.classList.remove('show');
            modal.classList.add('hidden');
        }, 500)
    }


    /* Функция создания обортки задания */
    const createTaskWrap = function(task_list){
        for (let i = 0; i < task_list.length; i++){
            let wrap = document.createElement('div');
            wrap.classList.add('task__wrap');
            wrap.classList.add(`${i+1}`);

            let title = document.createElement('p');
            title.classList.add('task__title');
            title.textContent = task_list[i].title;
            wrap.appendChild(title);

            let date = document.createElement('p');
            date.classList.add('task__date');
            let dateText = task_list[i].date.slice(0, 10) +'{' + task_list[i].date.slice(11, 16) + '}';
            date.textContent = dateText;
            wrap.appendChild(date);

            let descr = document.createElement('p');
            descr.classList.add('task__description');
            descr.textContent = task_list[i].description;
            wrap.appendChild(descr);

            let taskBottom = document.createElement('div');
            taskBottom.classList.add('task__changes');
            wrap.appendChild(taskBottom);

            /* Необходимые классы для иконок */
            let iconsClasses = [
            ['complete', 'fa-solid', 'fa-check'], 
            ['change','fa-solid', 'fa-pen-to-square'], 
            ['delete', 'fa-solid', 'fa-trash-can']];
            // Добавляем икнонки к wrap
            for (let j = 0; j < 3; j++){
                let div = document.createElement('div');
                div.classList.add('task__icon');
                let span = document.createElement('span');
                span.classList.add('icon_hover');
                span.classList.add(`${iconsClasses[j][0]}`)
                span.textContent = iconsClasses[j][0];

                let icon = document.createElement('i');
                icon.classList.add(iconsClasses[j][1]);
                icon.classList.add(iconsClasses[j][2]);
                icon.classList.add(`${i+1}`);
                icon.addEventListener('click', (event) =>{
                    iconEventListener(event);
                })
                div.appendChild(icon);
                div.appendChild(span);
                taskBottom.appendChild(div);
            }

            switch (task_list[i].priority){
                case 'High': {
                    wrap.classList.add('task__wrap--red');
                    break
                }
                case 'Medium': {
                    wrap.classList.add('task__wrap--yellow');
                    break
                }
                case 'Low': {
                    wrap.classList.add('task__wrap--blue');
                    break
                }
                case 'Zero': { // Если задание выполненно
                    wrap.classList.add('task__wrap--green');
                    break
                }
            }

            if (task_list[i].done){
                done_table.appendChild(wrap);
            } else{
                table.appendChild(wrap);
            }
        }
    }

    /* Удаление всех заданий из div'a */
    const clearAllChilds = function(){
        while (table.firstChild){
            table.removeChild(table.lastChild);
        }

        while (done_table.firstChild){
            done_table.removeChild(done_table.lastChild);
        }
    }

    /* Открытие формы с измененными элементами */
    const openEditForm = function(task){
        openTaskForm();
        applyBtn.style.display = 'block';
        submit_btn.style.display = 'none';
        header.textContent = 'Editing Task';
        title.value = task.title;
        dateInp.value = task.date;
        description.value = task.description;
        priority.value = task.priority;
    }

    /* Закрытие формы для редактирование, обнуление строк input'ов */
    const closeEditForm = function(){
        applyBtn.style.display = 'none';
        submit_btn.style.display = 'block';
        header.textContent = 'New Task';
        title.value = '';
        dateInp.value = '';
        description.value = '';
        priority.value = 'High';
        closeTaskForm();
    }
    return {openTaskForm, closeTaskForm, createTaskWrap, clearAllChilds, openEditForm, closeEditForm};
})();