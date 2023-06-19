let cart = document.getElementsByClassName('pasiv_container')[0];
let cart_items = cart.getElementsByClassName('product-item');
let edited_item_name = "";
let edited_item_quantity = 1;

/*  Отримує значення імені та кількості елемента з форми, яка містить клас "item",
 і зберігає ці значення у відповідних змінних edited_item_name та edited_item_quantity
*/
function remembering(event){
    let form = event.target.closest(".item");
    edited_item_name = form.getElementsByTagName('div')[0].getElementsByTagName('p')[0].textContent.trim();
    edited_item_quantity= parseInt(form.getElementsByTagName('div')[1].getElementsByClassName('number')[0].textContent.trim());
}

// Виконує перейменування поточної назви елемента на граматично правильну 
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

/* Відповідає за видалення елементів зі сторінки, включаючи відповідні елементи кошика, 
а також за зміну класів та висоти відповідних елементів на сторінці */
function makeDeleted(event){
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
    const section = document.getElementsByClassName('actions_container');
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

// Обробляє подію, яка виникає при натисканні на кнопку купівлі товару
function makeBought(event){
    let button = event.target.closest(".bought");
    let form = event.target.closest(".item");
    let name = form.getElementsByTagName('div')[0].getElementsByTagName('p')[0].textContent;
    let bought = document.getElementsByClassName('pasiv_container')[0].getElementsByClassName('bought-item')[0];
    let available = document.getElementsByClassName('pasiv_container')[0].getElementsByClassName('remained')[0];
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

// Здійснює зменшення числа, пов'язаного з товаром у кошику, і оновлює відповідні значення відображення на сторінці
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

// Здійснює збільшення числа, пов'язаного з товаром у кошику, і оновлює відповідні значення відображення на сторінці
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

// Відповідає за створення нового елемента з продуктом або товаром і додавання його до кошика покупок
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
    const section = document.getElementsByClassName('actions_container');
    const currentHeight = section[0].offsetHeight;
    const newHeight = currentHeight + 58.5;
    let lines = document.getElementsByTagName('form');
    lines[lines.length-1].classList.remove('last');
    newElement.classList.add('item');
    newElement.classList.add('last');
    newElement.innerHTML = `
    <div class="name" contenteditable="true" onfocus="remembering(event)" onblur="rename(event)">
        <p>${inputValue}</p>
    </div>
    <div class="quantity">
        <button class="minus inactive" onclick="decreaseNumber(event)" type="button" data-tooltip="Зменшити">-</button>
        <button class="number" disabled="disabled">1</button>
        <button class="plus" onclick="increaseNumber(event)" type="button" data-tooltip="Збільшити">+</button>
    </div>
    <div class="buying">
        <button class="bought" onclick="makeBought(event)" type="button" data-tooltip="Покупка">Куплено</button>
        <button class="cancel" onclick="makeDeleted(event)" type="button" data-tooltip="скасувати">x</button>
    </div>`;
     let secondElement = document.createElement('span');
     secondElement.classList.add('product-item')
    secondElement.innerHTML = `${inputValue}
<span class="amount">1</span>`
   let remaining = cart.getElementsByClassName('remained');
     remaining[0].appendChild(secondElement);
    section[0].style.height = newHeight + 'px';
    section[0].appendChild(newElement);
}

// Перевіряє, чи натиснута клавіша Enter (event.key === "Enter")
function pressKeyDown(event) {
    if (event.key === "Enter") {
        event.preventDefault(); // Запобігання подачі форми
        let addButton = document.querySelector('.adding');
        addButton.click(); // Подія натискання кнопки
    }
}