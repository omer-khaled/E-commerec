let cart = window.localStorage.getItem('cart');
let cartDom = document.querySelector('#cart table tbody');
let total_price = 0;
let applay = document.getElementById('Apllay_copon');
let applay_vale = document.getElementById('Apllay_copon_value');
const totBefort = document.querySelector('#cart-add #subtotal table #Total_price_before_cop');
const totAfter = document.querySelector('#cart-add #subtotal table #Total_price_after_cop');
if(cart){
    cart = JSON.parse(cart);
    cart.forEach((element,index) => {
        cartDom.innerHTML += `<tr number=${index}>
        <td><i class="far fa-times-circle"></i></td>
        <td><img src="${element.image}" alt=""></td>
        <td>${element.product}</td>
        <td>${element.size}</td>
        <td>${element.price}</td>
        <td><input type="number" value="${element.quantity}" disabled></td>
        <td>$${(Number.parseInt(element.subtotal)).toFixed(2)}</td>
        </tr>`;
    });
    let allRows = Array.from(document.querySelectorAll('#cart table tbody tr'));
    allRows.forEach((element)=>{
        total_price+= Number((element.lastElementChild.innerHTML).slice(1));
        element.firstElementChild.addEventListener('click',()=>{
            element.remove();
            let cur = cart.slice(0,Number(element.getAttribute('number')));
            let cur2 = cart.slice(Number(element.getAttribute('number'))+1);
            cart = Array.from(cur.concat(cur2));
            window.localStorage.setItem('cart',JSON.stringify(cart));
            total_pricinggg();
        });
    });
    totBefort.innerHTML = `$${total_price.toFixed(2)}`;
    totAfter.innerHTML = `$${total_price.toFixed(2)}`;
}
let col = document.getElementById('clo');
col.addEventListener('click',()=>{
    col.parentElement.classList.remove('activa');
});
applay.addEventListener('click',()=>{
    if(applay_vale.value == 'OMER10'){
        totBefort.innerHTML = `$${(total_price - (total_price * 0.10)).toFixed(2)}`;
        totAfter.innerHTML = `$${(total_price - (total_price * 0.10)).toFixed(2)}`;
    }
});
function total_pricinggg(){
    total_price = 0;
    let allTab = Array.from(document.querySelectorAll('#cart table tbody tr'));
    allTab.forEach((el)=>{
        total_price += Number((el.lastElementChild.innerHTML).slice(1));
    });
    totBefort.innerHTML = `$${total_price.toFixed(2)}`;
    totAfter.innerHTML = `$${total_price.toFixed(2)}`;
}
let handel = setTimeout(()=>{
    col.parentElement.classList.add('activa');
},1000);

