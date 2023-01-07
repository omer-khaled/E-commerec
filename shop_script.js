let proholder = document.querySelector('#product1 .pro-container');
let fourItem;
let startPagination = 10;
let pagination = document.getElementById('pagination');
getData().then((data)=>{
    makePagination(pagination.lastElementChild , data.length , data);
    showDatainHtml(data.slice(0,12));
    startPagination = 12;
    return data;
}).then((data)=>{
    oncl(data);
});
async function getData(){
    const answer = await fetch('https://api.escuelajs.co/api/v1/products');
    const data = await answer.json();
    return Array.from(new Set([...data]));
}
function showDatainHtml(data){
    proholder.innerHTML = "";
    data.forEach((element , index) => {
        // pro div
        let pro = document.createElement('div');
        pro.className = 'pro';
        pro.dataset.identify = index;
        // image
        let imag = document.createElement('img');
        let cutImage = element.images[1];
        if(cutImage == undefined){
            cutImage = 'https://cdn.lorem.space/images/shoes/.cache/640x480/irene-kredenets-dwKiHoqqxk8-unsplash.jpg';
        }
        imag.setAttribute('src',cutImage);
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
function makePagination(pagination , number , data){
    let num = parseInt(number / 12);
    for(let i=0; i<num ; i++){
        let a = document.createElement('button');
        a.dataset.numberrr = `${i+1}`;
        let a_text = document.createTextNode(`${i+1}`);
        a.appendChild(a_text);
        pagination.before(a);
        let element = pagination.previousElementSibling;
        element.addEventListener('click',()=>{
            let rkm= Number(element.dataset.numberrr);
            console.log(rkm);
            startPagination = 12 * rkm;
            console.log(startPagination);
            console.log(data.slice(startPagination,(startPagination + 12)));
            showDatainHtml(data.slice(startPagination,(startPagination + 12)));
            oncl(data.slice(startPagination,(startPagination + 12)));
        });
    }

}
function oncl(data){
    let pros = [...proholder.children];
    pros.forEach((element)=>{
        element.addEventListener('click',()=>{
            let number = (element.dataset.identify);
            window.localStorage.setItem('item',JSON.stringify(data[number]));
            fourItem = [...data];
            fourItem.length = 4;
            window.localStorage.setItem('allitems',JSON.stringify(fourItem));
            window.location.href = 'sproduct.html';
        });
    });
}