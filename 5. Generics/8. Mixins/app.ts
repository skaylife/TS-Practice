type Constructor = new (...args: any[]) => {}
type GConstructor<T = {}> = new (...args: any []) => T

class List {
    constructor(public items: string[]) {}
}

class Accordion {
    isOpened: boolean | undefined;
}

type ListType = GConstructor<List>;
type AccordionType = GConstructor<Accordion>

class ExtendedListClass extends List {
    first() {
        return this.items[0];
    }
}

//Mixins

function ExtendedList<TBase extends ListType & AccordionType>(Base: TBase) {
    return class ExtendedList extends Base {
        first() {
            return this.items[0];
        }
    }
}

class AccordionList {
    isOpened: boolean | undefined;
    constructor(public items: string[]) {}
}

const list = ExtendedList(AccordionList);
const res = new list(['firs', 'second']);
console.log(res.first()) 