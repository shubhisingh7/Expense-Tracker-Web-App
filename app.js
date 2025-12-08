import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } 
from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// Your Firebase Config
const firebaseConfig = {
  // paste your config here
};

// Initialize
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const expenseName = document.getElementById("expenseName");
const expenseAmount = document.getElementById("expenseAmount");
const addBtn = document.getElementById("addBtn");
const expenseList = document.getElementById("expenseList");
const totalAmount = document.getElementById("totalAmount");


// -----------------------------
// ADD EXPENSE
// -----------------------------
addBtn.addEventListener("click", async () => {
    const name = expenseName.value;
    const amount = Number(expenseAmount.value);

    if (name === "" || amount === 0) {
        alert("Enter all fields");
        return;
    }

    await addDoc(collection(db, "expenses"), {
        name: name,
        amount: amount
    });

    expenseName.value = "";
    expenseAmount.value = "";

    loadExpenses();
});


// -----------------------------
// LOAD EXPENSES
// -----------------------------
async function loadExpenses() {
    const querySnapshot = await getDocs(collection(db, "expenses"));
    
    expenseList.innerHTML = "";
    let total = 0;

    querySnapshot.forEach((docItem) => {
        const data = docItem.data();

        // Add to list
        const li = document.createElement("li");
        li.innerHTML = `
            ${data.name} - ₹${data.amount}
            <button onclick="deleteExpense('${docItem.id}')">Delete</button>
        `;
        expenseList.appendChild(li);

        // Add to total
        total += data.amount;
    });

    totalAmount.innerText = total;
}

// Make delete function global
window.deleteExpense = async function(id) {
    await deleteDoc(doc(db, "expenses", id));
    loadExpenses();
};

// Initial load
loadExpenses();
