export class mensagemErro {
    static exibirMensagemErro(tipoInput, validades) {
        let mensagem = '';
        switch (tipoInput) {
            case "nome":
                mensagem = "O campo nome não pode estar vazio";
                break;
            case "email":
                mensagem = validades.typeMismatch ? "O email digitado não é válido" : "O campo email não pode estar vazio";
                break;
            case "senha":
                mensagem = validades.patternMismatch ? "A senha deve conter entre 6 a 12 caracteres, deve conter pelo menos uma letra maiuscula um número e não deve conter símbolos." : "O campo senha não pode estar vazio";
                break;
            case "dataNascimento":
                mensagem = validades.valueMissing ? "O campo de data de nascimento não pode estar vazio" : "Você deve ser maior de 18 anos para se cadastrar";
                break;
            case "cpf":
                mensagem = validades.valueMissing ? "O campo CPF não pode estar vazio" : "CPF digitado invalido. Verifique se o digitou corretamente";
                break;
            case "cep":
                mensagem = validades.valueMissing ? "O campo CEP não pode estar vazio" : "CEP digitado invalido. Verifique se o digitou corretamente";
                break;
            case "logradouro":
                mensagem = "O campo do Logradouro não pode estar vazio";
                break;
            case "cidade":
                mensagem = "O campo de Cidade não pode estar vazio";
                break;
            case "estado":
                mensagem = "O campo de Estado não pode estar vazio";
                break;
            default:
                mensagem = `O tipo de input enviado [${tipoInput}] é invalido. Verifique se o tipo de input passado é o correto`;
                break;
        }
        return mensagem;
    }
}
