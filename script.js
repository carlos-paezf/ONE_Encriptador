'use strict';

const formElement = document.getElementById('form');
const inputElement = document.getElementById('input');
const btnEncrypter = document.getElementById('encrypter');
const btnDecrypt = document.getElementById('decrypt');
const resultEncryptElement = document.getElementById('result-encrypt');
const resultTextElement = document.getElementById('result');
const btnCopy = document.getElementById('copy');

const bannerElement = document.querySelector('.banner');
const withResultElement = document.querySelector('.with-result');


/**
 * The function normalizes and removes special characters from a given text string.
 * @param text - The input text that needs to be normalized.
 * @returns The `normalizeText` function is returning a modified version of the input `text` string.
 * The modifications include converting all characters to lowercase, removing any diacritical marks
 * (such as accents), and removing any special characters specified in the regular expression.
 */
const normalizeText = (text) => {
    return text.toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[!@#^{}[\]]/g, '');
};


/**
 * The function encrypts a given text by replacing vowels with specific strings.
 * @param text - The input text that needs to be encrypted.
 * @returns The function `encryptText` is returning the input `text` with the following replacements:
 * - 'a' is replaced with 'ai'
 * - 'e' is replaced with 'enter'
 * - 'i' is replaced with 'imes'
 * - 'o' is replaced with 'ober'
 * - 'u' is replaced with 'ufat'
 */
const encryptText = (text) => {
    const replacements = [
        [ 'e', 'enter' ],
        [ 'i', 'imes' ],
        [ 'a', 'ai' ],
        [ 'o', 'ober' ],
        [ 'u', 'ufat' ]
    ];

    let encryptStr = text;

    for (let i = 0; i < replacements.length; i++) {
        const [ char, replacement ] = replacements[ i ];
        encryptStr = encryptStr.replace(new RegExp(char, 'g'), replacement);
    }

    return encryptStr;
};


/**
 * The function decrypts a given text by replacing certain letter combinations with their corresponding
 * single letters.
 * @param text - The parameter `text` is a string that represents the encrypted text that needs to be
 * decrypted. The function `decryptText` takes this string as input and returns the decrypted text by
 * replacing certain substrings with their corresponding vowels.
 * @returns The function `decryptText` is being returned, which takes a string `text` as input and
 * replaces certain substrings with their corresponding vowels to decrypt the text. The decrypted text
 * is then returned as a string.
 */
const decryptText = (text) => {
    return text
        .replace(/enter/g, 'e')
        .replace(/imes/g, 'i')
        .replace(/ai/g, 'a')
        .replace(/ober/g, 'o')
        .replace(/ufat/g, 'u');
};


/* This code adds an event listener to the `formElement` that listens for a `submit` event. When the
form is submitted, the default behavior of the browser is prevented by calling the
`preventDefault()` method on the event object `e`. This prevents the page from reloading or
navigating to a new page when the form is submitted. */
formElement.addEventListener('submit', (e) => {
    e.preventDefault();
});


/* This code adds an event listener to the `inputElement` that listens for any changes to its value.
When the input value changes, the function inside the event listener is executed. It gets the
current value of the input field and passes it to the `normalizeText()` function, which normalizes
and removes special characters from the text. The normalized text is then set as the new value of
the input field. This ensures that the input text is always normalized and ready for encryption or
decryption. */
inputElement.addEventListener('input', (e) => {
    const text = e.target.value;

    e.target.value = normalizeText(text);
});


/* This code adds an event listener to the `btnEncrypter` button, which listens for a click event. When
the button is clicked, it calls the `encryptText()` function with the value of the `inputElement` as
its argument. It then adds the `hide` class to the `bannerElement` and removes the `hide` class from
the `withResultElement`. Finally, it sets the `innerHTML` of the `resultTextElement` to the
encrypted text returned by the `encryptText()` function. */
btnEncrypter.addEventListener('click', () => {
    const text = encryptText(inputElement.value);

    bannerElement.classList.add('hide');
    withResultElement.classList.remove('hide');

    resultTextElement.innerHTML = text;
});


/* This code adds an event listener to the `btnDecrypt` button, which listens for a click event. When
the button is clicked, it calls the `decryptText()` function with the value of the `inputElement` as
its argument. It then adds the `hide` class to the `bannerElement` and removes the `hide` class from
the `withResultElement`. Finally, it sets the `innerHTML` of the `resultTextElement` to the
decrypted text returned by the `decryptText()` function. */
btnDecrypt.addEventListener('click', () => {
    const text = decryptText(inputElement.value);

    bannerElement.classList.add('hide');
    withResultElement.classList.remove('hide');

    resultTextElement.innerHTML = text;
});


/* This code adds an event listener to the `btnCopy` button, which listens for a click event. When the
button is clicked, it copies the text content of the `resultTextElement` to the clipboard using the
`navigator.clipboard.writeText()` method. If the text is successfully copied, it displays an alert
message saying "Texto copiado en el clipboard". If there is an error while copying, it logs an error
message to the console. */
btnCopy.addEventListener('click', () => {
    navigator.clipboard.writeText(resultTextElement.innerText)
        .then(() => alert('Texto copiado en el clipboard'))
        .catch((err) => console.error('Error al copiar', err));
});