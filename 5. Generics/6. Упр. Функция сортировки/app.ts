const data = [
    {id: 1, name: 'Вася'},
    {id: 2, name: 'Петя'},
    {id: 3, name: 'Надя'},
];

interface ID {
    id: number;

}

function sort<T extends ID>(data: T[], type: 'asc' | 'desc' = 'asc'):T[] {
    return data.sort((a, b) => {
        switch (type) {
            case 'asc':
                return a.id - b.id;
            case 'desc':
                return b.id - a.id;
        }
    })
}

console.log(sort(data,'desc'))
console.log(sort(data))
