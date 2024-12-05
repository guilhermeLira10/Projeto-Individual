function exibirErro(mensagem) {
    const cardErro = document.getElementById("cardErro");
    const mensagem_erro = document.getElementById("mensagem_erro");

    cardErro.style.display = "block";
    mensagem_erro.textContent = mensagem;
    setTimeout(() => {
        cardErro.style.display = "none";
        mensagem_erro.textContent = "";
    }, 5000);
}
function validarFormulario(favorito, nome, username, email, senha, confirmacaoSenha) {
    let mensagemErro;

    mensagemErro = validarNome(nome);
    if (mensagemErro) {
        exibirErro(mensagemErro);
        return false;
    }

    
    mensagemErro = validarNome(username);
    if (mensagemErro) {
        exibirErro(mensagemErro);
        return false;
    }

    mensagemErro = validarEmail(email);
    if (mensagemErro) {
        exibirErro(mensagemErro);
        return false;
    }

    mensagemErro = validarSenha(senha);
    if (mensagemErro) {
        exibirErro(mensagemErro);
        return false;
    }

    mensagemErro = validarConfirmacaoSenha(senha, confirmacaoSenha);
    if (mensagemErro) {
        exibirErro(mensagemErro);
        return false;
    }

    mensagemErro = validarFavorito(favorito);
    if (mensagemErro) {
        exibirErro(mensagemErro);
        return false;
    }

    return true; 
}

function validarFormularioFoto(arquivo) {
    var termina_png = arquivo.endsWith('.png');
    var termina_jpeg = arquivo.endsWith('.jpeg');
    var termina_jpg = arquivo.endsWith('.jpg');
    var termina_svg = arquivo.endsWith('.svg');
    console.log('Validando foto');

    if (!arquivo) {
        exibirErro("Nenhum arquivo selecionado.");
        return false
    }

    console.log(termina_png)
    
    if(!termina_png &&
        !termina_jpeg &&
        !termina_jpg &&
        !termina_svg){        
        let mensagemErro = 'O arquivo deve ser uma imagem nos formatos PNG, JPG ou SVG.';
        exibirErro(mensagemErro);
        return false
    }

    return true; 
}

function validarFormularioLogin(email, senha) {
    let mensagemErro = '';
    mensagemErro = validarEmail(email);
    if (senha.trim() === "") {
        // exibirErro("A senha não pode estar vazia.");

        mensagemErro += "A senha não pode estar vazia. ";
    }
    if (mensagemErro) {
        exibirErro(mensagemErro);
        return false;
    }


    return true; 
}


function validarNome(nome) {
    if (nome.trim() === "") {
        return "Por favor, informe seu nome ou nome de usuário.";
    } else if (nome.length <= 2) {
        return "O nome ou o nome de usuário deve ter mais de 2 caracteres.";
    } 
    return ""; 
}

function validarEmail(email) {
    var termina_com = email.endsWith('.com');
    var termina_br = email.endsWith('.br');
    var termina_school = email.endsWith('.school');
    if (email.trim() === "") {
        return "Por favor, informe seu e-mail para podermos continuar.";
    } else if (!email.includes("@") || !email.includes(".")) {
        return "Parece que o e-mail está incorreto. Certifique-se de incluir '@' e '.' (ponto).";
    } else if(!termina_com && termina_br == false && termina_school == false){
        return "O e-mail precisa terminar com '.com' ou '.br'.";
    }
    return "";
}

function validarSenha(senha) {
    if (senha.trim() === "") {
        return "A senha não pode ficar vazia. Por favor, crie uma senha.";
    }

    if (senha.length < 6) {
        return "A senha precisa ter pelo menos 6 caracteres. Tente uma senha um pouco mais longa.";
    }

    let possuiNumero = false;
    let possuiMaiusculo = false;
    let possuiMinusculo = false;
    let possuiEspecial = false;

    for (let i = 0; i < senha.length; i++) {
        let char = senha[i];

        if (!isNaN(char) && char !== ' ') {
            possuiNumero = true;
        }

        if (char >= 'A' && char <= 'Z') {
            possuiMaiusculo = true;
        }

        if (char >= 'a' && char <= 'z') {
            possuiMinusculo = true;
        }

        if (
            (char >= '!' && char <= '/') ||
            (char >= ':' && char <= '@') ||
            (char >= '[' && char <= '`') ||
            (char >= '{' && char <= '~')
        ) {
            possuiEspecial = true;
        }
    }

    if (!possuiNumero) {
        return "Que tal adicionar um número à sua senha? Isso a deixará mais segura.";
    }
    if (!possuiMaiusculo) {
        return "Inclua pelo menos uma letra maiúscula na sua senha.";
    }
    if (!possuiMinusculo) {
        return "Não se esqueça de adicionar uma letra minúscula na senha.";
    }
    if (!possuiEspecial) {
        return "Uma letra ou símbolo especial vai deixar sua senha mais segura!";
    }

    return '';
}

function validarConfirmacaoSenha(senha, confirmacaoSenha) {
    if (confirmacaoSenha.trim() === "") {
        return "Por favor, confirme sua senha.";
    } else if (senha !== confirmacaoSenha) {
        return "As senhas não coincidem. Por favor, tente novamente.";
    }
    return "";
}

function validarFavorito(favorito) {
    if (favorito === "#" || favorito.trim() === "") {
        return "Selecione uma opção válida no campo favorito para continuar.";
    }
    return "";
}