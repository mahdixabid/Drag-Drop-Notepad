let data = document.getElementById('data')
let add = document.getElementById('add')
let box = document.querySelectorAll('.box')
let drag = null;

add.addEventListener('click', function() {
    if (data.value != '') {
        box[0].innerHTML += `
        <p draggable="true" class="incoming_data" >${data.value}</p>`
        data.value = ''
    }
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
            box.addEventListener('drop', function() {
                this.append(drag);
                this.style.background = 'white';
                this.style.color = 'black';
            })
        })
    })
}