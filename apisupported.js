const url = "https://crudcrud.com/api/2707f9d72e8e46f496ac0d000cc1bcce/expensetracker";

const tableBody = document.querySelector('.table');
tableBody.innerHTML += ` <tr>
<th>Amount</th>
<th>Description</th>
<th>Category</th>
<th>Edit</th>
<th>Delete</th>
</tr>`;


const btn = document.getElementById('submit')

const amt = document.getElementById('amount')
const des = document.getElementById('description')
const cate = document.getElementById('category')


function renderContenet(data) {
    
    data.forEach(element => {
        tableBody.innerHTML += `
    <tr data-id="${element._id}">
        <td class="amount">${element.amount}</td>
        <td class="description">${element.des}</td>
        <td class="category">${element.category}</td>
        <td><a class="EditButton" id="edit-exp">Edit</td>
        <td><a class="DeleteButton" id="delete-exp">Delete</td>
    </tr>
    `;
    });
    
}


//GET method
axios.get(url)
    .then(res => renderContenet(res.data))



//PUT and DELETE
tableBody.addEventListener('click', e=> {
    e.preventDefault();
    let deleteexp = e.target.id == 'delete-exp';
    let editexp = e.target.id == 'edit-exp';
    let id = e.target.parentNode.parentNode.dataset.id;

    if(deleteexp) {
        axios.delete(`${url}/${id}`)
            .then(() => location.reload())
    }

    if(editexp) {
        const parent = e.target.parentNode.parentNode;
        amt.value = parent.querySelector('.amount').textContent;
        des.value = parent.querySelector('.description').textContent;
        cate.value = parent.querySelector('.category').textContent;
    }

    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const obj = {
            amount: amt.value,
            des: des.value,
            category:cate.value
        }
        axios.put(`${url}/${id}`, obj)
            .then(() => location.reload())
            .catch((err) => console.log(err))
    })

})




//POST method
document.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log("clicked")

    const obj = {
        amount: amt.value,
        des: des.value,
        category:cate.value
    }

    axios.post(url,obj)
        .then(() => location.reload())
        .catch(err => console.log(err))
})