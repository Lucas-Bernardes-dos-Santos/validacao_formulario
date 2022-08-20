import { ValidarControl } from "./controller/validarControl.js";
const inputs = document.querySelectorAll('input');
const validarControl = new ValidarControl();
inputs.forEach(input => {
    input.addEventListener('blur', (ev) => {
        validarControl.validar(input);
    });
});
