// Obtener referencias a los elementos del formulario
const cardNumberInput = document.getElementById('card-number');
const frontNumbers = document.querySelector('.front-numbers');
const cardholderNameInput = document.getElementById('cardholder-name');
const expMonthInput = document.getElementById('month');
const expYearInput = document.getElementById('year');
const cvcInput = document.getElementById('cvc');
const backNumbers = document.querySelector('.back-numbers');
const form = document.querySelector('form');
const completado = document.querySelector('.pantalla-completado');
let errorElement = null;
let originalBorderStyle = cardholderNameInput.style.border;

// Función de validación de campos
function validarCampos() {
  // Validar campo de nombre del titular de la tarjeta
  const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚ\s]+$/;
  const name = cardholderNameInput.value.trim();

  if (name === '' || !nameRegex.test(name)) {
    cardholderNameInput.style.border = '1px solid red';
    if (!errorElement) {
      errorElement = document.createElement('p');
      errorElement.textContent = 'El campo de nombre es inválido';
      errorElement.style.color = 'red';
      cardholderNameInput.parentNode.insertBefore(errorElement, cardholderNameInput.nextSibling);
    }
  } else {
    cardholderNameInput.style.border = originalBorderStyle;
    if (errorElement) {
      errorElement.remove();
      errorElement = null;
    }
  }

  // Validar campo de número de tarjeta
  const numberRegex = /^[0-9\s]+$/;
  const cardNumber = cardNumberInput.value.replace(/\s/g, '');

  if (cardNumber === '' || !numberRegex.test(cardNumber) || cardNumber.length !== 16) {
    cardNumberInput.style.border = '1px solid red';
    if (!errorElement) {
      errorElement = document.createElement('p');
      errorElement.textContent = 'El número de tarjeta es inválido';
      errorElement.style.color = 'red';
      cardNumberInput.parentNode.insertBefore(errorElement, cardNumberInput.nextSibling);
    }
  } else {
    cardNumberInput.style.border = originalBorderStyle;
    if (errorElement) {
      errorElement.remove();
      errorElement = null;
    }
  }

  // Validar campo de CVC
  const cvcRegex = /^[0-9]+$/;
  const cvc = cvcInput.value.trim();

  if (cvc === '' || !cvcRegex.test(cvc) || cvc.length !== 3) {
    cvcInput.style.border = '1px solid red';
    if (!errorElement) {
      errorElement = document.createElement('p');
      errorElement.textContent = 'El código CVC es inválido';
      errorElement.style.color = 'red';
      cvcInput.parentNode.insertBefore(errorElement, cvcInput.nextSibling);
    }
  } else {
    cvcInput.style.border = originalBorderStyle;
    if (errorElement) {
      errorElement.remove();
      errorElement = null;
    }
  }

  // Validar campo de fecha de vencimiento (mes y año)
  const expMonth = expMonthInput.value.trim();
  const expYear = expYearInput.value.trim();

  const currentMonth = new Date().getMonth() + 1; // Obtener el mes actual (se suma 1 ya que los meses en JavaScript comienzan desde 0)
  const currentYear = String(new Date().getFullYear()).slice(-2); // Obtener los últimos dos dígitos del año actual

  if (
    expMonth === '' ||
    expYear === '' ||
    expMonth < 1 ||
    expMonth > 12 ||
    (expYear < currentYear && expYear !== '')
  ) {
    expMonthInput.style.border = '1px solid red';
    expYearInput.style.border = '1px solid red';
    if (!errorElement) {
      errorElement = document.createElement('p');
      errorElement.textContent = 'La fecha de vencimiento es inválida';
      errorElement.style.color = 'red';
      expYearInput.parentNode.insertBefore(errorElement, expYearInput.nextSibling);
    }
  } else {
    expMonthInput.style.border = originalBorderStyle;
    expYearInput.style.border = originalBorderStyle;
    if (errorElement) {
      errorElement.remove();
      errorElement = null;
    }
  }

  // Habilitar/deshabilitar botón de submit
  const isFormValid = !errorElement;
  form.querySelector('input[type="submit"]').disabled = !isFormValid;
}

// Función para ocultar el formulario y mostrar un mensaje de éxito
function mostrarMensajeExito() {
    form.style.display = 'none';
    completado.style.display = 'flex';
  }

function reestablecerFormulario(){
    form.style.display = 'flex';
    completado.style.display = 'none';
    form.reset();
}

// Escuchar el evento de cambio en el campo de número de tarjeta
cardNumberInput.addEventListener('input', function (event) {
  let cardNumber = event.target.value.replace(/\s/g, ''); // Eliminar los espacios existentes
  cardNumber = cardNumber.replace(/(\d{4})(?=\d)/g, '$1 '); // Agregar un espacio después de cada bloque de 4 dígitos
  event.target.value = cardNumber;
  frontNumbers.textContent = cardNumber; // Actualizar el contenido del elemento h3
});

// Escuchar el evento de cambio en el campo de nombre del titular de la tarjeta
cardholderNameInput.addEventListener('input', function (event) {
  const cardholderName = event.target.value;
  const frontName = document.querySelector('.front-name');
  frontName.textContent = cardholderName;
});

// Escuchar el evento de cambio en el campo de mes de vencimiento
expMonthInput.addEventListener('input', function (event) {
  const month = event.target.value;
  const frontDate = document.querySelector('.front-date');
  const currentYear = frontDate.textContent.split('/')[1];
  frontDate.textContent = `${month}/${currentYear}`;
});

// Escuchar el evento de cambio en el campo de año de vencimiento
expYearInput.addEventListener('input', function (event) {
  const year = event.target.value;
  const frontDate = document.querySelector('.front-date');
  const currentMonth = frontDate.textContent.split('/')[0];
  frontDate.textContent = `${currentMonth}/${year}`;
});

// Escuchar el evento de cambio en el campo de CVC
cvcInput.addEventListener('input', function (event) {
  let cvc = event.target.value;
  backNumbers.textContent = cvc; // Actualizar el contenido del elemento h3
});

// Escuchar el evento de submit del formulario
form.addEventListener('submit', function (e) {
    e.preventDefault();
    validarCampos();
    if (!errorElement) {
      mostrarMensajeExito();
    }
  });
  
// // Validar campos al cargar la página
// validarCampos();

// Escuchar el evento de cambio en los campos del formulario
form.addEventListener('input', validarCampos);
document.getElementById('reestablecer').addEventListener('click', reestablecerFormulario);
