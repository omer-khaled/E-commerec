let fourItem = JSON.parse(window.localStorage.getItem('allitems'));
let proholder = document.querySelector('#product1 .pro-container');
const mainImg = document.getElementById('MainImg');
const Smal_images  = document.querySelectorAll('#prodetails .single-pro-image .small-img-group .small-img-col img');
const h6 = document.querySelector('#prodetails .single-pro-details h6');
const h4 = document.querySelector('#prodetails .single-pro-details h4');
const h2 = document.querySelector('#prodetails .single-pro-details h2');
const span = document.querySelector('#prodetails .single-pro-details span');
const input = document.querySelector('#prodetails .single-pro-details input');
const select = document.querySelector('#prodetails .single-pro-details select');
const addCart = document.getElementById('Add_Cart');
let getItem = window.localStorage.getItem('item');
if(getItem){
    getItem = JSON.parse(getItem);
    mainImg.src = getItem.images[0];
    Smal_images[0].src = getItem.images[0];
    Smal_images[1].src = getItem.images[1];
    Smal_images[2].src = getItem.images[2];
    Smal_images[3].src = getItem.category.image;
    h6.innerHTML = `Home / ${getItem.category.name}`;
    h4.innerHTML  = getItem.title;
    h2.innerHTML  = `$${getItem.price}.00`;
    span.innerHTML = getItem.description +" "+ span.innerHTML;
}
Smal_images.forEach((element)=>{
    element.addEventListener('click',()=>{
        let new_source = element.getAttribute('src');
        mainImg.setAttribute('src',new_source);
    });
});
showDatainHtml(Array.from(fourItem));
function showDatainHtml(data){
    data.forEach((element,index) => {
        // pro div
        let pro = document.createElement('div');
        pro.className = 'pro';
        pro.dataset.identify = index;
        // image
        let imag = document.createElement('img');
        imag.setAttribute('src',element.images[1]);
        //des
        let des = document.createElement('div');
        des.className = 'des';
        let span = document.createElement('span');
        let span_text = document.createTextNode(element.category.name);
        span.appendChild(span_text);
        let h5 = document.createElement('h5');
        let h5_text = document.createTextNode(element.title);
        h5.appendChild(h5_text);
        //star
        let star = document.createElement('div');
        star.className = 'star';
        star.innerHTML = `<i class="fas fa-star"></i>
        <i class="fas fa-star"></i>
        <i class="fas fa-star"></i>
        <i class="fas fa-star"></i>
        <i class="fas fa-star"></i>`;
        let h4 = document.createElement('h4');
        let h4_text = document.createTextNode(`$${element.price}.00`);
        h4.appendChild(h4_text);
        des.appendChild(span);
        des.appendChild(h5);
        des.appendChild(star);
        des.appendChild(h4);
        let a = document.createElement('a');
        a.href = "#";
        a.innerHTML = `<i class="fal fa-shopping-cart cart"></i>`;
        pro.appendChild(imag);
        pro.appendChild(des);
        pro.appendChild(a);
        proholder.appendChild(pro);
    });
}
let pros = [...proholder.children];
pros.forEach((element)=>{
    element.addEventListener('click',()=>{
        let number = (element.dataset.identify);
        console.log(number);
        window.localStorage.setItem('item',JSON.stringify(fourItem[number]));
        location.href = 'sproduct.html';
    });
});
addCart.addEventListener('click',()=>{
    let cart = window.localStorage.getItem('cart');
    let obj = {};
    obj.image = mainImg.src;
    obj.product = h4.innerHTML;
    obj.size = select.value;
    obj.price = h2.innerHTML;
    obj.quantity = input.value;
    obj.subtotal =  Number((obj.price).slice(1)) * Number(obj.quantity);
    console.log(obj.subtotal);
    if(cart){
        cart = JSON.parse(cart);
        cart.push(obj);
        window.localStorage.setItem('cart',JSON.stringify(cart));
    }else{
        cart = new Array();
        cart.push(obj);
        window.localStorage.setItem('cart',JSON.stringify(cart));
    }
    window.location.href = 'shop.html';
});

