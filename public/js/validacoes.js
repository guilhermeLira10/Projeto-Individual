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

function validarFormularioFoto(arquivo) {
    console.log('Validando foto');

    if (!arquivo) {
        exibirErro("Nenhum arquivo selecionado.");
        return false
    }

    const tiposValidos = ["image/png", "image/jpeg", "image/jpg", "image/svg+xml"];
    
    if (!tiposValidos.includes(arquivo)) {
        
        let mensagemErro = 'O arquivo deve ser uma imagem nos formatos PNG, JPG ou SVG.';
        exibirErro(mensagemErro);
        return false
    }

    return true; 
}

function validarFormularioLogin(email, senha) {
    let mensagemErro;
    mensagemErro = validarEmail(email);
    if (mensagemErro) {
        exibirErro(mensagemErro);
        return false;
    }

    if (senha.trim() === "") {
        exibirErro("A senha não pode estar vazia.");
    }

    return true; 
}

function validarFormulario(favorito, nome, username, email, senha, confirmacaoSenha) {
    let mensagemErro;

    mensagemErro = validarNome(nome);
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

function validarNome(nome) {
    if (nome.trim() === "") {
        return "O nome não pode estar vazio.";
    } else if (nome.length <= 2) {
        return "O nome deve ter mais de 2 caractere.";
    }
    return ""; 
}

function validarEmail(email) {
    var termina_com = email.endsWith('.com');
    var termina_br = email.endsWith('.br');
    var termina_school = email.endsWith('.school');
    
    if (email.trim() === "") {
        return "O e-mail não pode estar vazio.";
    } else if (!email.includes("@") || !email.includes(".")) {
        return "E-mail inválido! Deve conter '@' e '.'";
    } else if(!termina_com && termina_br == false && termina_school == false){
        return `O Email Não termina com ".com" e nem com ".br"`;
    }
    return "";
}

function validarSenha(senha) {
    if (senha.trim() === "") {
        return "A senha não pode estar vazia.";
    }

    if (senha.length < 6) {
        return "A senha deve ter pelo menos 6 caracteres.";
    }

    let possuiNumero = false;
    let possuiMaiusculo = false;
    let possuiMinusculo = false;
    let possuiEspecial = false;

    for (let i = 0; i < senha.length; i++) {
        let char = senha[i];

        // Verifica se é um número
        if (!isNaN(char) && char !== ' ') {
            possuiNumero = true;
        }

        // Verifica se é uma letra maiúscula
        if (char >= 'A' && char <= 'Z') {
            possuiMaiusculo = true;
        }

        // Verifica se é uma letra minúscula
        if (char >= 'a' && char <= 'z') {
            possuiMinusculo = true;
        }

        // Verifica se é um caractere especial
        if (
            (char >= '!' && char <= '/') ||
            (char >= ':' && char <= '@') ||
            (char >= '[' && char <= '`') ||
            (char >= '{' && char <= '~')
        ) {
            possuiEspecial = true;
        }
    }

    // Verifica se todos os requisitos foram atendidos
    if (!possuiNumero) {
        return "A senha deve conter pelo menos 1 número.";
    }
    if (!possuiMaiusculo) {
        return "A senha deve conter pelo menos 1 letra maiúscula.";
    }
    if (!possuiMinusculo) {
        return "A senha deve conter pelo menos 1 letra minúscula.";
    }
    if (!possuiEspecial) {
        return "A senha deve conter pelo menos 1 caractere especial.";
    }

    // Se todos os requisitos foram atendidos
    return '';
}

function validarConfirmacaoSenha(senha, confirmacaoSenha) {
    if (confirmacaoSenha.trim() === "") {
        return "A confirmação de senha não pode estar vazia.";
    } else if (senha !== confirmacaoSenha) {
        return "As senhas não coincidem.";
    }
    return "";
}

function validarFavorito(favorito) {
    if (favorito === "#" || favorito.trim() === "") {
        return "Selecione uma opção válida para o campo favorito.";
    }
    return "";
}
