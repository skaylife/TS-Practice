function getFullName(userEntity: {firstName: string, surName: string}): string {
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
    age: "22"    ,
    skills: {
        dev: true,
        devops: true,
    }                                                              
};

console.log(getFullName(user));