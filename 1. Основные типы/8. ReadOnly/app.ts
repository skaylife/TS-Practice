const skill: readonly [number, string] = [1, 'Dev'];

// Readonly - нельзя модефицировать 

skill[0] = 2;

// Использование  дженерика
const skills: Array<string> = ['Dev', 'DevOps'];

// Использование  дженерика - Readonly
const skills2: ReadonlyArray<string> = ['Dev', 'DevOps'];

skills2.push('ssss'); // нельзя пуштить - только читать
