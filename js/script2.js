const $title = document.querySelector('.title')
const $url = document.querySelector('.url')
const $add = document.querySelector('.add')

window.addEventListener('load', () => {
  if(!localStorage.getItem('todo')){
    localStorage.setItem('todo', JSON.stringify([]))
  }else{
    const todo = JSON.parse(localStorage.getItem('todo'))
  }
})

