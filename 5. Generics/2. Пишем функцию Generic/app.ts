function logMiddleware<T>(data: T): T  { // Можно предеать данные любого типа
    console.log(data);
    return data;
}

const res = logMiddleware<number>(10); // Res задаем определенный тип типа <number>

function getSplitHalf<T>(data: Array<T>): Array<T> { // Нужно строго задать Array, так как length есть именно там
    const l = data.length / 2;
    return data.splice(0, l);
}

getSplitHalf<number>([1, 3, 4]);
