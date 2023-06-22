function getFullName(firstName: string, surname: string): string {
    return `${firstName} ${surname}`; //?
} 

// Пример стрелочной функции. 
const getFullNameArrow = (firstName: string, surname: string): string => {
    return `${firstName} ${surname}`;
} 

console.log(getFullName('Семен', 'Кирил'));