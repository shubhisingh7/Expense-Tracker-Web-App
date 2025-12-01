// SIGNUP
function signup() {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  auth.createUserWithEmailAndPassword(email, password)
    .then(() => {
      alert("Account Created!");
      window.location.href = "login.html";
    })
    .catch(e => alert(e.message));
}

// LOGIN
function login() {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      window.location.href = "dashboard.html";
    })
    .catch(e => alert(e.message));
}

// LOGOUT
function logout() {
  auth.signOut().then(() => {
    window.location.href = "login.html";
  });
}

// FIRESTORE LISTENER
auth.onAuthStateChanged(user => {
  if (user && document.getElementById("expense-list")) {
    loadExpenses();
  }
});

// ADD EXPENSE
function addExpense() {
  const user = auth.currentUser;
  const data = {
    title: document.getElementById("title").value,
    amount: Number(document.getElementById("amount").value),
    category: document.getElementById("category").value,
    createdAt: Date.now()
  };

  db.collection("users").doc(user.uid).collection("expenses")
    .add(data);
}

// LOAD EXPENSES
function loadExpenses() {
  const user = auth.currentUser;

  db.collection("users").doc(user.uid).collection("expenses")
    .orderBy("createdAt", "desc")
    .onSnapshot(snapshot => {
      let list = "";
      snapshot.forEach(doc => {
        let e = doc.data();
        list += `
          <li>
            ${e.title} - ₹${e.amount} (${e.category})
            <button onclick="deleteExpense('${doc.id}')">X</button>
          </li>
        `;
      });
      document.getElementById("expense-list").innerHTML = list;
    });
}

// DELETE
function deleteExpense(id) {
  const user = auth.currentUser;
  db.collection("users").doc(user.uid)
    .collection("expenses").doc(id).delete();
}
