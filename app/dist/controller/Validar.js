export class validarControl {
    static validar(input) {
        if (input.validity.valid) {
            console.log('Tudo certo');
        }
        else {
            console.log('Tudo errado');
        }
    }
}
