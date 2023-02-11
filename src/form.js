export class FormData{
    constructor(){
    }

    get valuesForm(){
        this.title = document.querySelector('#title');
        this.description = document.querySelector('#descr');
        this.date = document.querySelector('#date');
        this.priority = document.querySelector('#priority');
        this.done = false;
        return {title: this.title.value, description: this.description.value, 
        date: this.date.value, priority: this.priority.value, done: this.done};
    }
    
}