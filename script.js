let expenses = [];
document.getElementById("expenseForm").addEventListener("submit", function(e) {
    e.preventDefault();
    addExpense();
});
document.getElementById("filterCategory").addEventListener("change", filterCategory);

function validateInput(title, amount, category) {
    const amountRegex = /^[0-9]+(\.[0-9]{1,2})?$/;
    if (title === "" || amount === "" || category === "") {
        return "All fields are required!";
    }
    if (!amountRegex.test(amount)) {
        return "Enter valid amount!";
    }
    return "";
}

function addExpense() {
    let title = document.getElementById("title").value.trim();
    let amount = document.getElementById("amount").value.trim();
    let category = document.getElementById("category").value;
    let errorMsg = document.getElementById("errorMsg");
    let error = validateInput(title, amount, category);
    if (error !== "") {
        errorMsg.textContent = error;
        return;
    }
    errorMsg.textContent = "";
    let expense = {
        title: title,
        amount: parseFloat(amount),
        category: category
    };
    expenses.push(expense);
    displayExpenses(expenses);
    calculateTotal();
    document.getElementById("expenseForm").reset();
}

function displayExpenses(list) {
    let table = document.getElementById("expenseTable");
    table.innerHTML = "";
    list.forEach(function(expense, index) {
        table.innerHTML += `
            <tr>
                <td>${expense.title}</td>
                <td>${expense.amount}</td>
                <td>${expense.category}</td>
                <td><button class="delete-btn" onclick="deleteExpense(${index})">Delete</button></td>
            </tr>
        `;
    });
}

function deleteExpense(index) {
    expenses.splice(index, 1);
    displayExpenses(expenses);
    calculateTotal();
}

function calculateTotal() {
    let total = 0;
    expenses.forEach(function(expense) {
        total += expense.amount;
    });
    document.getElementById("totalAmount").textContent = total.toFixed(2);
}

function filterCategory() {
    let selected = document.getElementById("filterCategory").value;
    if (selected === "All") {
        displayExpenses(expenses);
    } else {
        let filtered = expenses.filter(function(expense) {
            return expense.category === selected;
        });
        displayExpenses(filtered);
    }
}