"use strict";
function getFullName(userEntity) {
    return `${userEntity.firstName} ${userEntity.surName}`;
}
// Пример стрелочной функции. 
// const getFullNameArrow = (firstName: string, surname: string): string => {
//     return `${firstName} ${surname}`;
// } 
const user = {
    firstName: 'Владимир',
    surName: 'Кузнецов',
    city: 'Красноярск',
    age: "22"
};
console.log(getFullName(user));
