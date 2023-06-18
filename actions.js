let cart = document.getElementsByClassName('cart')[0];
let cart_items = cart.getElementsByClassName('product-item');
let edited_item_name = ""
let edited_item_quantity = 1;
function remember(event){
    let form = event.target.closest(".item");
    edited_item_name = form.getElementsByTagName('div')[0].getElementsByTagName('p')[0].textContent.trim();
    edited_item_quantity= parseInt(form.getElementsByTagName('div')[1].getElementsByClassName('number')[0].textContent.trim());
}
function rename(event){
    let form = event.target.closest(".item");
    let name = form.getElementsByTagName('div')[0].getElementsByTagName('p')[0].textContent.trim();
    name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
    for(let i = 0; i<cart_items.length; i++){
        let temp = cart_items[i];
        if(temp.textContent.split("\n")[0].trim().toLowerCase()===name.toLowerCase().trim()){
            form.getElementsByTagName('div')[0].getElementsByTagName('p')[0].textContent= edited_item_name.trim();
            return;
        }
    }
    for(let i = 0; i<cart_items.length; i++){
        let temp = cart_items[i];
        if(temp.textContent.split("\n")[0].trim()===edited_item_name.trim()){
           temp.innerHTML = `${name}
<span class="amount">${edited_item_quantity}</span>`;
            form.getElementsByTagName('div')[0].getElementsByTagName('p')[0].textContent = name;
            break;
        }
    }

}

function deleting(event){
    let form = event.target.closest(".item");
    let name = form.getElementsByTagName('div')[0].getElementsByTagName('p')[0].textContent;
    form.remove();
    for(let i = 0; i<cart_items.length; i++){
        let temp = cart_items[i];
        if(temp.textContent.split("\n")[0].trim()===name.trim()){
            temp.remove();
            break;
        }
    }
    const section = document.getElementsByClassName('active_box');
    let lines = document.getElementsByTagName('form');
    for(let i=0;i<lines.length;i++){
        lines[i].classList.remove('last')
    }
    const lastLineIndex = lines.length - 1;
    if(lines.length!==0){
        lines[lastLineIndex].classList.add('last');
    }
    const currentHeight = section[0].offsetHeight;
    const newHeight = currentHeight - 58;
    section[0].style.height = newHeight + 'px';
}
function makeBought(event){
    let button = event.target.closest(".bought");
    let form = event.target.closest(".item");
    let name = form.getElementsByTagName('div')[0].getElementsByTagName('p')[0].textContent;
    let bought = document.getElementsByClassName('cart')[0].getElementsByClassName('first')[0];
    let available = document.getElementsByClassName('cart')[0].getElementsByClassName('remaining')[0];
    if (button.textContent==="Куплено") {
        form.classList.add('item_bought');
        form.getElementsByClassName('name')[0].setAttribute("contenteditable", 'false')
        button.textContent = "Не куплено";
        for(let i = 0; i<cart_items.length; i++){
            let temp = cart_items[i];
            if(temp.textContent.split("\n")[0].trim()===name.trim()){
                temp.remove();
                bought.appendChild(temp);
                break;
            }
        }
    }
    else if (button.textContent==="Не куплено") {
        form.classList.remove('item_bought');
        form.getElementsByClassName('name')[0].setAttribute("contenteditable", 'true')
        button.textContent = "Куплено";
        for(let i = 0; i<cart_items.length; i++){
            let temp = cart_items[i];
            if(temp.textContent.split("\n")[0].trim()===name.trim()){
                temp.remove();
                available.appendChild(temp);
                break;
            }
        }
    }
}
function decreaseNumber(event) {
    let form = event.target.closest(".item");
    let name = form.getElementsByTagName('div')[0].getElementsByTagName('p')[0].textContent;
    let numberButton = event.target.closest('.quantity').querySelector('.number');
    let currentNumber = parseInt(numberButton.textContent);
    let minusButton = event.target.closest('.quantity').querySelector('.minus');
    if (currentNumber > 1) {
        for(let i = 0; i<cart_items.length; i++){
            let temp = cart_items[i];
            if(temp.textContent.split("\n")[0].trim()===name){
                temp.getElementsByClassName('amount')[0].textContent = currentNumber-1;
                break;
            }
        }
        numberButton.textContent = currentNumber - 1;
        if(currentNumber===2){
            minusButton.classList.add('inactive');
        }
    }

}
function increaseNumber(event) {
    let form = event.target.closest(".item");
    let name = form.getElementsByTagName('div')[0].getElementsByTagName('p')[0].textContent;
    let numberButton = event.target.closest('.quantity').querySelector('.number');
    let currentNumber = parseInt(numberButton.textContent);
    let minusButton = event.target.closest('.quantity').querySelector('.minus');
    for(let i = 0; i<cart_items.length; i++){
        let temp = cart_items[i];
        if(temp.textContent.split("\n")[0].trim()===name.trim()){
            temp.getElementsByClassName('amount')[0].textContent = currentNumber+1;
            break;
        }
    }
    numberButton.textContent = currentNumber + 1;
    minusButton.classList.remove('inactive');
}

function adding(){
    let inputElement = document.querySelector('.input');
    let inputValue = inputElement.value.trim();
    if(inputValue === "") return;
    inputElement.value = "";
    inputValue = inputValue.charAt(0).toUpperCase() + inputValue.slice(1).toLowerCase()
    let existing = false;
    for(let i = 0; i<cart_items.length; i++){
        let temp = cart_items[i];
        if(temp.textContent.split("\n")[0].trim().toLowerCase()===inputValue.trim().toLowerCase()){
            existing = true;
            break;
        }
    }
    if(existing) return;
    let newElement = document.createElement('form');
    const section = document.getElementsByClassName('active_box');
    const currentHeight = section[0].offsetHeight;
    const newHeight = currentHeight + 58.5;
    let lines = document.getElementsByTagName('form');
    lines[lines.length-1].classList.remove('last');
    newElement.classList.add('item');
    newElement.classList.add('last');
    newElement.innerHTML = `
    <div class="name" contenteditable="true" onfocus="remember(event)" onblur="rename(event)">
        <p>${inputValue}</p>
    </div>
    <div class="quantity">
        <button class="minus inactive" onclick="decreaseNumber(event)" type="button" data-tooltip="Зменшити">-</button>
        <button class="number" disabled="disabled">1</button>
        <button class="plus" onclick="increaseNumber(event)" type="button" data-tooltip="Збільшити">+</button>
    </div>
    <div class="status">
        <button class="bought" onclick="makeBought(event)" type="button" data-tooltip="Підтвердити покупку">Куплено</button>
        <button class="cancel" onclick="deleting(event)" type="button" data-tooltip="Скасувати">x</button>
    </div>
`;
     let secondElement = document.createElement('span');
     secondElement.classList.add('product-item')
    secondElement.innerHTML = `${inputValue}
<span class="amount">1</span>`
   let remaining = cart.getElementsByClassName('remaining');
     remaining[0].appendChild(secondElement);
    section[0].style.height = newHeight + 'px';
    section[0].appendChild(newElement);

}
function handleKeyDown(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        let addButton = document.querySelector('.adding');
        addButton.click();
    }
}