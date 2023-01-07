// loading 
window.addEventListener('load' , ()=>{
    setTimeout(()=>{
        document.getElementById('loading').classList.add('dis');
    },700)
});
// closing and open navbar
const navbar = document.getElementById('navbar');
const close = document.getElementsByClassName('close').item(0);
const bar = document.getElementById('bar');
if(bar){
    bar.addEventListener('click',()=>{
        navbar.classList.add('active');
    });
}
if(close){
    close.addEventListener('click',()=>{
        navbar.classList.remove('active');
    });
}
// show prfile image
let imageProfile = document.getElementById('ImageProfile');
let current_user = window.localStorage.getItem('currentUser');
let Name = document.querySelector('#navbar li div .info .name');
let Email = document.querySelector('#navbar li div .info .email');;
let userImage = document.getElementById('ImageProfile');
if(current_user){
    current_user = JSON.parse(current_user);
    Name.innerHTML += current_user.name;
    Email.innerHTML += current_user.email;
    userImage.setAttribute('src',current_user.src);
}

let all = window.localStorage.getItem('allitems');
// Cart 
if(all){
    let anchor = document.querySelector('#header div #navbar li:last-of-type a');
    let anchor2 = document.querySelector('#header #mobile a');
    anchor.classList.add('actiev')
    anchor2.classList.add('actiev')
}




