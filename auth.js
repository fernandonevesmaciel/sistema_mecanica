import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { 
    getAuth, 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword, 
    onAuthStateChanged, 
    signOut 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// --- CONFIGURAÇÃO DO FIREBASE ---
const firebaseConfig = {
  apiKey: "AIzaSyAwBdNKVmujXM-icPXZllCYw4ED6ugSEK0",
  authDomain: "mecanica-699bb.firebaseapp.com",
  projectId: "mecanica-699bb",
  storageBucket: "mecanica-699bb.firebasestorage.app",
  messagingSenderId: "223675812288",
  appId: "1:223675812288:web:f91f3dab6705fa7a2aa025",
  measurementId: "G-G78PR55F9F"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// --- LÓGICA DE PROTEÇÃO DE ROTA E ESTADO ---
onAuthStateChanged(auth, (user) => {
    const path = window.location.pathname;
    const isLoginPage = path.includes("index.html") || path.endsWith("/");
    const isProtectedPage = path.includes("principal.html");

    if (user) {
        // Se logado e tentar acessar o login, vai para a principal
        if (isLoginPage) {
            window.location.href = "principal.html";
        }
        // Exibe o e-mail do usuário se houver o campo 'userEmail' na página
        const display = document.getElementById('userEmail');
        if (display) display.innerText = "Usuário: " + user.email;
    } else {
        // Se deslogado e tentar acessar página protegida, volta para o login
        if (isProtectedPage) {
            window.location.href = "index.html";
        }
    }
});

// --- FUNÇÃO AUXILIAR PARA PEGAR DADOS DOS CAMPOS ---
const getInputs = () => {
    const email = document.getElementById('email')?.value;
    const pass = document.getElementById('password')?.value;
    return { email, pass };
};

// --- BOTÃO DE LOGIN ---
const btnLogin = document.getElementById('btnLogin');
if (btnLogin) {
    btnLogin.onclick = () => {
        const { email, pass } = getInputs();

        if (!email || !pass) return alert("Preencha todos os campos!");

        signInWithEmailAndPassword(auth, email, pass)
            .then(() => {
                console.log("Login realizado!");
                // O redirecionamento é feito pelo onAuthStateChanged acima
            })
            .catch(error => {
                console.error(error.code);
                if (error.code === 'auth/invalid-credential') {
                    alert("E-mail ou senha incorretos.");
                } else if (error.code === 'auth/invalid-email') {
                    alert("E-mail inválido.");
                } else {
                    alert("Erro ao entrar: " + error.message);
                }
            });
    };
}

// --- BOTÃO DE CADASTRO ---
const btnSignup = document.getElementById('btnSignup');
if (btnSignup) {
    btnSignup.onclick = () => {
        const { email, pass } = getInputs();

        if (!email || !pass) return alert("Preencha todos os campos!");

        createUserWithEmailAndPassword(auth, email, pass)
            .then(() => alert("Conta criada com sucesso!"))
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    alert("Este e-mail já está em uso.");
                } else if (error.code === 'auth/weak-password') {
                    alert("A senha deve ter pelo menos 6 caracteres.");
                } else {
                    alert("Erro ao cadastrar: " + error.message);
                }
            });
    };
}

// --- BOTÃO DE SAIR (LOGOUT) ---
const btnLogout = document.getElementById('btnLogout');
if (btnLogout) {
    btnLogout.onclick = () => {
        signOut(auth)
            .then(() => {
                window.location.href = "index.html";
            })
            .catch(error => alert("Erro ao sair: " + error.message));
    };
}