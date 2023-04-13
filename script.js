'use strict';

const formElement = document.getElementById('form');
const inputElement = document.getElementById('input');
const btnEncrypter = document.getElementById('encrypter');
const btnDecrypt = document.getElementById('decrypt');
const btnCopy = document.getElementById('copy');


/**
 * The function removes accents from a given text by converting it to lowercase and replacing any
 * diacritical marks with their base characters.
 * @param text - The input text that needs to be processed to remove accents.
 * @returns The `removeAccents` function is returning a string with all accents removed from the input
 * `text`. The function first converts the input `text` to lowercase using the `toLowerCase()` method.
 * Then, it uses the `normalize()` method with the "NFD" argument to decompose any accented characters
 * into their base character and combining diacritical mark form. Finally, it uses the `
 */
const removeAccents = (text) => {
    return text.toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
};




formElement.addEventListener('submit', (e) => {
    e.preventDefault();
});


inputElement.addEventListener('input', (e) => {
    const text = e.target.value;

    e.target.value = removeAccents(text);
});





{/* <div class="with-result">
    <p id="result"></p>
    <button class="btn" id="copy">Copiar</button>
</div>; */}