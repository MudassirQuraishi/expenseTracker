const amount = document.getElementById("amount");
const description = document.getElementById("description");
const myForm = document.getElementById('my-form');
const userList = document.getElementById('users');
const category =document.getElementById('category');

////creating an li element and adding it to the user list
function listCreation(details,key){
    

    const li = document.createElement('li');
    li.id ='li';
    li.class = 'list-group-item'
    //appending the values to the created li element
    li.appendChild(document.createTextNode(details.amount));
    li.appendChild(document.createTextNode('--'));
    li.appendChild(document.createTextNode(details.description));
    li.appendChild(document.createTextNode('--'));
    li.appendChild(document.createTextNode(details.category));
    li.appendChild(document.createTextNode('--'));
    //appending the created list element to the userList
    userList.appendChild(li);
    const name =key;
    li.name = name;

    //adding a delete button
    const delButton = document.createElement('button');
    delButton.type = 'button';
    delButton.id = 'del';
    delButton.className='delete';
    delButton.appendChild(document.createTextNode('Delete Expense'));
    li.appendChild(delButton);
    li.appendChild(document.createTextNode('--'));

    const editButton = document.createElement('button');
    editButton.type = 'button';
    editButton.id = 'edit';
    editButton.className='edit';
    editButton.appendChild(document.createTextNode('Edit Expense'));
    li.appendChild(editButton);
}


//submit function
myForm.addEventListener('submit', onSubmit);
function onSubmit(e){
    e.preventDefault();

    //creating an object of the data 
    const details={
        amount :amount.value,
        description : description.value,
        category : document.getElementById('category').options[document.getElementById('category').value].text,
        
    }

    //storing the data in the local storage
    let detailsString = JSON.stringify(details);
    let key = description.value + '_' + Date.now();


   
    localStorage.setItem(key,detailsString)
    

    //calling listcreation function
    listCreation(details,key)
    
    //resetting the form inputs to nill
    amount.value='';
    description.value='';
}

//delete and edit functions
userList.addEventListener('click',function(e){
    
    const targetElement = e.target;
    if(targetElement.id==='del'){
        if(e.target.classList.contains('delete')){
            if(confirm('Are You Sure??')){
                var li = e.target.parentElement;
                userList.removeChild(li);
                localStorage.removeItem(li.name);
            }  
        }
    }
    else if(targetElement.id==='edit'){
        if(e.target.classList.contains('edit')){
            if(confirm('Are You Sure??')){
                var li = e.target.parentElement;
                amount.value = li.firstChild.textContent;
                description.value = li.firstChild.nextSibling.nextSibling.textContent
                let categoryText = li.firstChild.nextSibling.nextSibling.nextSibling.nextSibling.nodeValue
                let value;
                for(let i =0;i<document.getElementById('category').options.length;i++){
                    if(document.getElementById('category').options[i].text===categoryText){
                        value = i+1;
                        console.log(value);
                    }
                }
                
                category.value=value;
                
                userList.removeChild(li);
                localStorage.removeItem(li.name);
            }  
        }
    }
});

//to prevent data loss due to page refresh
document.addEventListener('DOMContentLoaded', loadExpenseDetails);

function loadExpenseDetails() {
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const userDetailsString = localStorage.getItem(key);
    const userDetails = JSON.parse(userDetailsString);
    listCreation(userDetails);
  }
}



