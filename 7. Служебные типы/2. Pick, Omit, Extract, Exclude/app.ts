interface PaymentPersistence {
    id: number;
    sum: number;
    from: string;
    to: string;
}

// Исключение id bp type Payment
type Payment = Omit<PaymentPersistence, "id">
// Вывод
// type Payment {
//     sum: number;
//     from: string;
//     to: string;
// }

// Pick взять только from и to
type PaymentRequisits = Pick<PaymentPersistence, "from" | "to"> 
// type PaymentPersistence {
//     from: string;
//     to: string;
// }

type ExtractEx = Extract<'from' | 'to' | Payment, string>; // Взять только from , to
type ExcludeEx = Exclude<'from' | 'to' | Payment, string>; // Наобарот будут все