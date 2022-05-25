document.getElementById('expForm').addEventListener('submit', addExpense);

// initial array of expenses, reading from localStorage
const expenses = JSON.parse(localStorage.getItem('expenses')) || [];

function addExpense(e){
    e.preventDefault();

    // get type, name, date, and amount
    let amount = document.getElementById('amount').value;
    let description = document.getElementById('description').value;
    let category = document.getElementById('category').value;

    if(category != 'chooseOne' 
        && description.length > 0 
        && amount > 0){
        const expense = {
            amount, 
            description,
            category,
            id: expenses.length > 0 ? expenses[expenses.length - 1].id + 1 : 1,
        }

        expenses.push(expense);
        // localStorage 
        localStorage.setItem('expenses', JSON.stringify(expenses));
    }

    document.getElementById('expForm').reset();
    showExpenses();
}

const showExpenses = () => {

    const expenseTable = document.getElementById('expenseTable');

    expenseTable.innerHTML = '';

    for(let i = 0; i < expenses.length; i++){
        expenseTable.innerHTML += `
            <tr>
                <td>${expenses[i].amount}</td>
                <td>${expenses[i].description}</td>
                <td>${expenses[i].category}</td>
                <td><a class="EditButton" onclick="editExpense(${expenses[i].id})">
                    Edit</td>
                <td><a class="deleteButton" onclick="deleteExpense(${expenses[i].id})">
                    Delete</td>
            </tr>
        `;
    }
}

const deleteExpense = (id) => {
    for(let i = 0; i < expenses.length; i++){
        if(expenses[i].id == id){
            expenses.splice(i, 1);
        }
    }

    // localStorage
    localStorage.setItem('expenses', JSON.stringify(expenses));
    showExpenses();
}

const editExpense = (id) => {
    for(let i = 0; i < expenses.length; i++){
        if(expenses[i].id == id){
            let addexpensebtn = document.getElementById("submit");
            let savetask = document.getElementById("savetask");
            document.getElementById('amount').value = expenses[0].amount;
            document.getElementById('description').value = expenses[0].description;
            document.getElementById('category').value = expenses[0].category;
            amount.focus();
            addexpensebtn.style.display="none";
            savetask.style.display="block";
            deleteExpense(i);
            document.getElementById('expForm').addEventListener('savetask', addExpense);
        }
    }
    


    // localStorage
    localStorage.setItem('expenses', JSON.stringify(expenses));
    showExpenses();
}


showExpenses();