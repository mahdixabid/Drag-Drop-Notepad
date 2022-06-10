let data = document.getElementById('data')
let add = document.getElementById('add')
let box = document.querySelectorAll('.box')
let drag = null;
let dataPro = [];
const keyName = 'MyNotes'

document.addEventListener('DOMContentLoaded', () => {
    getItemsFromLS()
})

add.addEventListener('click', function() {
    if (data.value != '') {
        const id = `${Date.now()}`

        box[0].innerHTML += `
        <p draggable="true" class="incoming_data" data-index="0" data-id=${id}>${data.value}</p>`
        let newdata = {
            id,
            text: data.value,
            box: 0
        }
        dataPro.push(newdata)
        localStorage.setItem(keyName, JSON.stringify(dataPro))
    }
    data.value = '';
    dargItem();
})

function dargItem() {
    let items = document.querySelectorAll('.incoming_data')
    items.forEach(item => {
        item.addEventListener('dragstart', function() {
            drag = item;
            item.style.opacity = '0.5'
        })

        item.addEventListener('dragend', function() {
            drag = null;
            item.style.opacity = '1'
        })
        box.forEach(box => {
            box.addEventListener('dragover', function(e) {
                e.preventDefault()
                this.style.background = 'green';
                this.style.color = 'white';
            })

            box.addEventListener('dragleave', function() {
                this.style.background = 'white';
                this.style.color = 'black';
            })
            box.addEventListener('drop', function(event) {
                const boxIndex = event.toElement.dataset.index

                const newDataPro = dataPro.map(el => el.id === drag.dataset.id ? {...el, box: Number(boxIndex) } : el)
                dataPro = newDataPro
                localStorage.setItem(keyName, JSON.stringify(newDataPro))
                this.append(drag);
                this.style.background = 'white';
                this.style.color = 'black';
            })
        })
    })
}

function getItemsFromLS() {
    try {
        const response = localStorage.getItem(keyName);
        const data = JSON.parse(response);

        data.forEach(el => {
            box[el.box].innerHTML += `
            <p draggable="true" class="incoming_data" data-index=${el.box} data-id=${el.id} >${el.text}</p>`
            dataPro.push(el)
        })

        dargItem();
    } catch (err) {
        throw new Error(err.message);
    };
}