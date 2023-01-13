update()
let clock = document.querySelector('.time')
updateClock()

document.querySelector('.submit').addEventListener('click', function(e){
    let time = document.querySelector('.notification__form input').value
    let text = document.querySelector('.notification__form textarea').value

    if(!time || !text){
        document.querySelector('.notification__info').innerHTML = 'Введите время и текст'
        setTimeout(()=>{
            document.querySelector('.notification__info').innerHTML = ''
        },4000)
       
        return
    }

    localStorage.setItem(time,  text)
    update()
})


function update(){
    document.querySelector('.notification__form input').value = ''
    document.querySelector('.notification__form textarea').value =''
    
    if(!localStorage.length) {
        document.querySelector('.notification__list .items').innerHTML = ''
    }
    document.querySelector('.notification__list .items').innerHTML = ''
    document.querySelector('.notification__list .items').textContent = ''
    for(let key of Object.keys(localStorage)){
   
        document.querySelector('.notification__list .items').insertAdjacentHTML('beforeend',
        `
        <div class="notification__item">
            <div>${key} - ${localStorage.getItem(key)}</div>
            <button data-item="${key}" >&times;</button>
        </div>
        `
        )
   
    }

    if(document.querySelector('.audioAlert')){
        document.querySelector('.audioAlert').remove()
    }
}


document.querySelector('.notification__list .clear-list').addEventListener('click', function(){
    if(!localStorage || confirm('Удалить уведомления?')){
        localStorage.clear();
        update();
    }
    update();
})

if(localStorage){
    document.querySelector('.notification__list').addEventListener('click', function(e){
       
        if(e.target.dataset.item != undefined){
        localStorage.removeItem(e.target.dataset.item)
        update();
        }
    })
}



setInterval(()=>{
    let currentData = new Date()
    let curentHours = currentData.getHours()
    let currentMinutes = currentData.getMinutes()
    curentHours < 10? curentHours = `0${curentHours}` : curentHours 
    curentHours === '00' ? curentHours ='0':curentHours
    currentMinutes < 10? currentMinutes = `0${currentMinutes}` : currentMinutes
    currentMinutes === '00' ? currentMinutes ='0':currentMinutes

    let currentTime = `${curentHours}:${currentMinutes}`

    for(let key of Object.keys(localStorage)){
        let minutes = key.split(':')[0]
        let hours = key.split(':')[1]
        minutes === '00' ? minutes ='0':minutes
        hours === '00' ? hours ='0':hours
        if((key === currentTime) || (+hours === +curentHours && +currentMinutes > +minutes)){
            document.querySelector(`button[data-item="${key}"]`).closest('.notification__item').classList.add('active')
            if(!document.querySelector('.audioAlert')){

                document.querySelector('body').insertAdjacentHTML("afterbegin", '<audio loop class="audioAlert" autoplay="autoplay" src="./android-notification-sound-effect-_earrape_-copia.mp3"></audio>')
                
            }
        }
        

    }
},1000)




function updateClock(){
    let currentData = new Date()
    let curentHours = currentData.getHours()
    let currentMinutes = currentData.getMinutes()
    curentHours < 10? curentHours = `0${curentHours}` : curentHours
    currentMinutes < 10? currentMinutes = `0${currentMinutes}` : currentMinutes
    clock.textContent= `${curentHours}:${currentMinutes}`
    
}

setInterval(updateClock,6000)



