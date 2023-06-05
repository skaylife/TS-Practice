type A = Awaited<Promise<string>> // Вернет нам промис стринг
type A2 = Awaited<Promise<Promise<string>>> // Свложенным промисом 

interface IMenu {
    name: string;
    url: string;
}

async function getMenu():Promise<IMenu[]> {
    return [{name: "Аналитика", url: "analytics"}]
}

type R = Awaited<ReturnType<typeof getMenu>>

async function getArray<T>(x: T) {
    return [await x]
}