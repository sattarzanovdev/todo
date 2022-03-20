const $title = document.querySelector('.title')
const $url = document.querySelector('.url')
const $add = document.querySelector('.add')
const $list = document.querySelector('.list')
const $response = document.querySelector('.response')

window.addEventListener('load', () => {
  if(!localStorage.getItem('todo')){
    localStorage.setItem('todo', JSON.stringify([]))
  }else{
    const todo = JSON.parse(localStorage.getItem('todo'))

    const todoWithID = todo.map((item, index) => {
      return {...item, id: index}
    })

    localStorage.setItem('todo', JSON.stringify([...todoWithID]))

    const base = JSON.parse(localStorage.getItem('todo'))

    cardTemplate(base)
  }
})

$add.addEventListener('click' , e => {
  e.preventDefault()

  if($title.value.length == 0 || $url.value.length == 0){
    if($title.value.length == 0){
      $title.style.borderColor = 'red'
      emptyInput()
      $response.classList.add('active')
    }else{
      $title.style.borderColor = 'green'
    }

    if($url.value.length == 0){
      $url.style.borderColor = 'red'
      emptyInput()
      $response.classList.add('active')
    }else{
      $url.style.borderColor = 'green'
    }
  }else{
    success()
    const base = JSON.parse(localStorage.getItem('todo'))
    localStorage.setItem('todo', JSON.stringify(
      [
        ...base,
        {id: 1, title: $title.value, url: $url.value}
      ]
    ))


    cardTemplate(base)
  }

  window.location.reload( )
})

function cardTemplate(base) {
  const template = base.map(({id, title, url}) => {
    return `
      <div class="card col-xl-3">
        <div class="card-header text-center">
          <i>${title}</i>
        </div>
        <div class="card-img">
          <img src="${url}" style="height: 200px; width: 100%; object-fit: cover">
        </div>
        <div class="card-footer d-flex justify-content-around">
          <button class="btn btn-danger" onclick="Delete(${id})">Delete</button>
          <button class="btn btn-warning" onclick="Edit(${id})">Edit</button>
        </div>
      </div>
    `
  }).join('')

  $list.innerHTML = template
}


function Delete(idOfBase){
  const todo = JSON.parse(localStorage.getItem('todo'))

  const filtered = todo.filter(item => item.id !== idOfBase)

  localStorage.setItem('todo' , JSON.stringify(filtered))
  window.location.reload()
}

function Edit(idOfBase) {
  const todo = JSON.parse(localStorage.getItem('todo'))

  const edited = todo.map(item => {
    if(item.id == idOfBase){
      item.title = prompt('New title', item.title)
      return item
    }else{
      return item
    }
  })

  localStorage.setItem('todo', JSON.stringify(edited))
  window.location.reload()
}


function emptyInput() {
  document.title = 'Fill The Area!'
}


function success() {
  document.title = 'Successfully!'
}