let container = document.getElementById('container');
let imageProfile = '';
let button = document.querySelector('#hero form>button');
let imageHolder = document.querySelector('#container img');
let email = document.forms[0].email;
let name = document.forms[0].name;
let pass = document.forms[0].pass;
let nameLogin = document.forms[1].namelogin;
let passLogin = document.forms[1].passlogin;
let massage = document.querySelector('#login form p');
let users = window.localStorage.getItem('users');
let LoginButton = document.getElementById('Login-Button');
let loginForm = document.getElementById('login');
let loginFormClose = document.querySelector('#login i');
let FormTwoButton = document.getElementById('Form-two-button');
let iconHolder = document.querySelector('#hero form #container i');
let parHolder = document.querySelector('#container p');
let BrowseButton = document.getElementById('BrowseButton');
let BrowseButtonFile = document.getElementById('BrowseButtonFile');
let intial = 0;
container.addEventListener('drop' , (event)=>{
    event.preventDefault();
    event.stopPropagation();
    let reader = new FileReader();
    reader.addEventListener('load',()=>{
        console.log(reader.result);
        imageProfile = reader.result;
        imageHolder.src = imageProfile;
        window.localStorage.setItem('user_image',imageProfile);
    });
    reader.readAsDataURL(event.dataTransfer.files[0]);
    imageHolder.classList.add('active');
    iconHolder.classList.add('active');
    parHolder.classList.add('active');
    BrowseButton.classList.add('active');
    container.style.border =  '2px dashed #e1e1e1';
});
BrowseButton.addEventListener('click',()=>{
    BrowseButtonFile.addEventListener('change',()=>{
        let reader = new FileReader();
        reader.addEventListener('load',()=>{
            imageProfile = reader.result;
            imageHolder.src = imageProfile;
            window.localStorage.setItem('user_image',imageProfile);
        });
        reader.readAsDataURL(BrowseButtonFile.files[0]);
        imageHolder.classList.add('active');
        iconHolder.classList.add('active');
        parHolder.classList.add('active');
        BrowseButton.classList.add('active');
        container.style.border =  '2px dashed #e1e1e1';
    });
    BrowseButtonFile.click();
});
window.addEventListener('dragover',(event)=>{
    event.preventDefault();
});
window.addEventListener('drop',(event)=>{
    event.preventDefault();
});
window.addEventListener('dragenter',(event)=>{
    event.preventDefault();
});
document.forms[0].addEventListener('submit',(event)=>{
    event.preventDefault();
    event.stopPropagation();
});
document.forms[1].addEventListener('submit',(event)=>{
    event.preventDefault();
    event.stopPropagation();
});
email.addEventListener('input',()=>{
    email.style.border =  '1px solid #e1e1e1';
});
name.addEventListener('input',()=>{
    name.style.border =  '1px solid #e1e1e1';
});
pass.addEventListener('input',()=>{
    pass.style.border =  '1px solid #e1e1e1';
});
nameLogin.addEventListener('input',()=>{
    nameLogin.style.border =  '1px solid #e1e1e1';
});
passLogin.addEventListener('input',()=>{
    passLogin.style.border =  '1px solid #e1e1e1';
});
button.addEventListener('click',()=>{
    if(email.value == ''){
        email.style.border =  '1px solid red';
    }
    if(name.value == ''){
        name.style.border =  '1px solid red';
    }
    if(pass.value == ''){
        pass.style.border =  '1px solid red';
    }
    if(imageProfile == ''){
        container.style.border =  '2px dashed red';
    }
    if(email.value != '' && name.value != '' && pass.value != '' && imageProfile != ''){
        let obj = {};
        obj['email'] = email.value;
        obj['name'] = name.value;
        obj['pass'] = pass.value;
        obj['src'] = window.localStorage.getItem('user_image');
        users = window.localStorage.getItem('users');
        if(users){
            users = JSON.parse(users);
            users.push(obj);
            window.localStorage.setItem('users',JSON.stringify(users));
        }else{
            users = new Array();
            users.push(obj);
            window.localStorage.setItem('users',JSON.stringify(users));
        }
        email.value = '';
        name.value = '';
        pass.value = '';
        imageHolder.src = '';
        imageHolder.classList.remove('active');
        iconHolder.classList.remove('active');
        parHolder.classList.remove('active');
        BrowseButton.classList.remove('active');
    }
});
LoginButton.addEventListener('click',()=>{
    loginForm.classList.add('active');
});
loginFormClose.addEventListener('click',()=>{
    loginForm.classList.remove('active');
});
FormTwoButton.addEventListener('click',()=>{
    if(nameLogin.value == ''){
        nameLogin.style.border =  '1px solid red';
    }
    if(passLogin.value == ''){
        passLogin.style.border =  '1px solid red';
    }
    if(nameLogin.value != '' && passLogin != ''){
        let checker = true ;
        users = window.localStorage.getItem('users');
        let current_user = {};
        if(users){
            users = JSON.parse(users);
            console.log(users);
            let obj = users.filter((element)=>{
                return element.name == nameLogin.value && element.pass == passLogin.value;
            });
            if(obj.length != 0){
                checker = false;
                current_user['name'] = obj[0].name;
                current_user['pass'] = obj[0].pass;
                current_user['email'] = obj[0].email;
                current_user['src'] = obj[0].src;
                window.localStorage.setItem('currentUser',JSON.stringify(current_user));
                window.location.href = 'home.html';
            }
        }
        if(checker){
            nameLogin.style.border =  '1px solid red';
            nameLogin.value = '';
            passLogin.style.border =  '1px solid red';
            passLogin.value = '';
            console.log(massage);
            massage.innerHTML = 'this account not exist';
        }
    }
});
