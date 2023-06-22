"use strict";
function getFullName(firstName, surname) {
    return `${firstName} ${surname}`; //?
}
// Пример стрелочной функции. 
const getFullNameArrow = (firstName, surname) => {
    return `${firstName} ${surname}`;
};
console.log(getFullName('Семен', 'Кирил'));
