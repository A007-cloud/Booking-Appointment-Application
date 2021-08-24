const nameInput=document.querySelector('#username');
const emailInput=document.querySelector('#email');
const submitBtn = document.getElementById("submit");
submitBtn.addEventListener('click',onsubmit);

// const dt=axios.get(
//     "https://crudcrud.com/api/f906d53565df4af68d1d25dd6855bdfb/unicorns"
//     //     {"name":"alipta",
//     // "emailId":"alipta@345.com"
//     //     }
    
//     ).then(data=>console.log(data));
    

document.addEventListener("DOMContentLoaded", () => {
axios.get("https://crudcrud.com/api/25aca4e1dad6449f8b22e96ce9680b2e/appointmentData")
.then((response)=>{
    console.log(response)

    for(var i=0;i<response.data.length;i++){
        showUserOnScreen(response.data[i])
    }
})
.catch((error)=>{
    console.log(error)
})

// const localStorageObj=localStorage;
// const localStorageKeys=Object.keys(localStorageObj);
// for(var i=0;i<localStorageKeys.length;i++){
//     const key=localStorageKeys[i];
//     const userDetailsString=localStorageObj[key];
//     const userDetailsObj=JSON.parse(userDetailsString);
//     showUserOnScreen(userDetailsObj);
// }
});

function onsubmit(e){
    e.preventDefault();
    const obj={
                name:nameInput.value,
               email:emailInput.value
            };
axios.post("https://crudcrud.com/api/25aca4e1dad6449f8b22e96ce9680b2e/appointmentData",obj)
.then((response)=>{
    showUserOnScreen(response.data);
    console.log(response)
})
.catch((err)=>{
    document.body.innerHTML=document.body.innerHTML+"<h4>Something went wrong</h4>"
    console.log(err)
})
            //localStorage.setItem(myObj.email,JSON.stringify(myObj));
       
            // showUserOnScreen(myObj);
}
function showUserOnScreen(user){
// user={
//     _id:'',
//     name:'',
//     email:''
// }

    if(localStorage.getItem((user.email)!=null)){
        removeUserFromScreen(user.email);
    }
    const parentNode=document.getElementById('listOfPeople');
    const childHTML=`<li id=${user._id}> ${user.name} - ${user.email}
    <button onclick=deleteUser('${user._id}')> Delete User </button>
    <button onclick="editUserDetails('${user.email}','${user.name}','${user._id}')"> Edit </button>
    </li>`

    parentNode.innerHTML=parentNode.innerHTML+childHTML;
}
function removeUserFromScreen(userId){
    const parentNode=document.getElementById('listOfPeople');
    const childNodeDeleted=document.getElementById(userId);
    if(childNodeDeleted){
        parentNode.removeChild(childNodeDeleted);
    }
}
function deleteUser(userId){
    axios.delete(`https://crudcrud.com/api/25aca4e1dad6449f8b22e96ce9680b2e/appointmentData/${userId}`)
        .then((response) => {
            removeUserFromScreen(userId)
        })
        .catch((err) => {
            console.log(err)
        })
    // console.log(emailId)
    // localStorage.removeItem(emailId);
    // removeUserFromScreen(emailId);
}
function editUserDetails(emailId,name,userId){
  
emailInput.value=emailId;
nameInput.value=name;


deleteUser(userId);
}
