export const LocalData = (() =>{
    const storageAvailable = function(type){
        let storage;
        try {
            storage = window[type];
            const x = '__storage_test__';
            storage.setItem(x, x);
            storage.removeItem(x);
            return true;
        }
        catch (e) {
            return e instanceof DOMException && (
                // everything except Firefox
                e.code === 22 ||
                // Firefox
                e.code === 1014 ||
                // test name field too, because code might not be present
                // everything except Firefox
                e.name === 'QuotaExceededError' ||
                // Firefox
                e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
                // acknowledge QuotaExceededError only if there's something already stored
                (storage && storage.length !== 0);
        }
    }

    const saveDataToLocal = function(taskList){
        localStorage.setItem('length', `${taskList.length}`);
        for (let i=0; i < taskList.length; i++){
            localStorage.setItem(`title${i}`, taskList[i].title);
            localStorage.setItem(`description${i}`, taskList[i].description);
            localStorage.setItem(`date${i}`, taskList[i].date);
            localStorage.setItem(`priority${i}`, taskList[i].priority);
            localStorage.setItem(`done${i}`, taskList[i].done);
        }
    }

    const getDataFromLocal = function(){
        let length = localStorage.getItem('length');
        let list = [];
        for (let i=0; i < Number(length); i++){
            const title = localStorage.getItem(`title${i}`);
            const description = localStorage.getItem(`description${i}`);
            const date = localStorage.getItem(`date${i}`);
            const priority = localStorage.getItem(`priority${i}`);
            let done = localStorage.getItem(`done${i}`);
            if (done === 'false'){
                done = false;
            } else{
                done = true;
            }
            list.push({title, description, date, priority, done});
        }
    
        return list
    }

    const removeDataFromLocal = function(index){
        localStorage.removeItem(`title${index}`);
        localStorage.removeItem(`description${index}`);
        localStorage.removeItem(`date${index}`);
        localStorage.removeItem(`priority${index}`)
        localStorage.removeItem(`done${index}`);
    }

    return {storageAvailable, saveDataToLocal, getDataFromLocal, removeDataFromLocal};
})();