import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut }
    from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// 1. Cole suas configurações aqui
const firebaseConfig = {
    apiKey: "AIzaSyAwBdNKVmujXM-icPXZllCYw4ED6ugSEK0",
    authDomain: "mecanica-699bb.firebaseapp.com",
    projectId: "mecanica-699bb",
    storageBucket: "mecanica-699bb.firebasestorage.app",
    messagingSenderId: "223675812288",
    appId: "1:223675812288:web:f91f3dab6705fa7a2aa025",
    measurementId: "G-G78PR55F9F"
};

// 2. Inicialize o Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Seleção de elementos
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const btnLogin = document.getElementById('btnLogin');
const btnSignup = document.getElementById('btnSignup');
const btnLogout = document.getElementById('btnLogout');
const userStatus = document.getElementById('userStatus');

// 3. Função para Logar
btnLogin.addEventListener('click', () => {
    const email = emailInput.value;
    const password = passwordInput.value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            alert("Bem-vindo!");
        })
        .catch((error) => {
            alert("Erro: " + error.message);
        });
});

// 4. Função para Cadastrar (Opcional, mas útil para testar)
btnSignup.addEventListener('click', () => {
    createUserWithEmailAndPassword(auth, emailInput.value, passwordInput.value)
        .then(() => alert("Usuário criado!"))
        .catch((error) => alert(error.message));
});

// 5. Observador: Verifica em tempo real se o usuário está logado
onAuthStateChanged(auth, (user) => {
    if (user) {
        userStatus.innerText = "Logado como: " + user.email;
        btnLogout.style.display = "block";
        // Aqui você poderia usar: window.location.href = "principal.html";
    } else {
        userStatus.innerText = "Você não está logado.";
        btnLogout.style.display = "none";
    }
});

// 6. Logout
btnLogout.addEventListener('click', () => {
    signOut(auth);
});