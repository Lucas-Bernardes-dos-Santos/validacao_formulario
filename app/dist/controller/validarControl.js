import { mensagemErro } from "../error/mensagemErro.js";
export class ValidarControl {
    validar(input) {
        const tipoInput = input.dataset.tipo;
        switch (tipoInput) {
            case "dataNascimento":
                this.validarDataNascimento(input);
                break;
            case "cpf":
                this.validarCPF(input);
                break;
            case "cep":
                this.recuperarCEP(input);
                break;
            default:
                break;
        }
        if (input.validity.valid) {
            input.parentElement.classList.remove('input-container--invalido');
        }
        else {
            input.parentElement.classList.add('input-container--invalido');
            input.parentElement.querySelector('.input-mensagem-erro').innerHTML = mensagemErro.exibirMensagemErro(tipoInput, input.validity);
        }
    }
    //#region Métodos relacionados a validação da data de nascimento
    validarDataNascimento(input) {
        const dataRecebida = this.formatarData(input.value);
        let mensagem = this.verificarMaioridade(dataRecebida) ? '' : 'Data Invalida';
        input.setCustomValidity(mensagem);
    }
    formatarData(data) {
        let vetorData = data.split('-', 3); // Vetor ["yyyy", "dd", "MM"]
        let dataString = `${vetorData[1]}/${vetorData[2]}/${vetorData[0]}`; // MM/dd/yyyy
        let dataFormatada = new Date(dataString);
        return dataFormatada;
    }
    verificarMaioridade(data) {
        const dataAtual = new Date();
        const dataMinima = new Date(`${data.getMonth() + 1}/${data.getDate()}/${data.getFullYear() + 18}`);
        return dataMinima <= dataAtual;
    }
    //#endregion
    //#region Métodos relacionados a validação do CPF
    validarCPF(input) {
        const cpfFormatado = input.value.replace(/\D/g, ''); // Troca tudo que não for digitido por nada
        const validadeCPF = this.checarRepeticao(cpfFormatado) && this.verificarEstruturaCPF(cpfFormatado);
        let mensagem = validadeCPF ? '' : 'CPF invalido';
        input.setCustomValidity(mensagem);
    }
    checarRepeticao(cpf) {
        const valoresRepetidos = [
            '00000000000', '11111111111', '22222222222', '33333333333', '44444444444',
            '55555555555', '66666666666', '77777777777', '88888888888', '99999999999'
        ];
        return !valoresRepetidos.includes(cpf);
    }
    verificarEstruturaCPF(cpf) {
        const multiplicador = 10;
        return this.verificarDigitoVerificador(cpf, multiplicador);
    }
    verificarDigitoVerificador(cpf, multiplicador) {
        if (multiplicador >= 12)
            return true;
        let multiplicadorInicial = multiplicador;
        let soma = 0;
        const cpfSemDigito = cpf.substring(0, multiplicador - 1).split('');
        const digitoVerificador = cpf.charAt(multiplicador - 1);
        for (let i = 0; multiplicadorInicial > 1; multiplicadorInicial--) {
            soma = soma + (parseInt(cpfSemDigito[i]) * multiplicadorInicial);
            i++;
        }
        if (parseInt(digitoVerificador) == this.confirmarDigitoVerificador(soma) || (parseInt(digitoVerificador) == 0 && this.confirmarDigitoVerificador(soma) == 10)) {
            return this.verificarDigitoVerificador(cpf, multiplicador + 1);
        }
        return false;
    }
    confirmarDigitoVerificador(soma) {
        return 11 - (soma % 11);
    }
    //#endregion
    recuperarCEP(input) {
        const cep = input.value.replace(/\D/g, '');
        const url = `https://viacep.com.br/ws/${cep}/json/`;
        const options = {
            method: 'GET',
            headers: {
                'Content-type': 'aplication/json;charset=utf-8'
            }
        };
        let req = new Request(url, options);
        if (!input.validity.patternMismatch && !input.validity.valueMissing) {
            fetch(url, options).then((response) => response.json())
                .then((cep) => {
                if (cep.erro) {
                    input.setCustomValidity('CEP invalido');
                    console.log(cep);
                    return;
                }
                input.setCustomValidity('');
                this.completarLogradouro(cep.logradouro, cep.localidade, cep.uf);
                return;
            });
        }
    }
    completarLogradouro(logradouro, cidade, estado) {
        const logradouroInput = document.querySelector('[data-tipo="logradouro"]');
        const cidadeInput = document.querySelector('[data-tipo="cidade"]');
        const estadoInput = document.querySelector('[data-tipo="estado"]');
        logradouroInput.parentElement.classList.remove('input-container--invalido');
        cidadeInput.parentElement.classList.remove('input-container--invalido');
        estadoInput.parentElement.classList.remove('input-container--invalido');
        logradouroInput.value = logradouro;
        cidadeInput.value = cidade;
        estadoInput.value = estado;
    }
}
