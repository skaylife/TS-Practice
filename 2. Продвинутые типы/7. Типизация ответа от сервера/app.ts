interface IPayment {
    sum: number
    from: number
    to: number
}

enum PaymentStatus {
    success = "success",
    failed = "failed"
}

interface IPaymentRequest extends IPayment {}

// interface IDataSuccess {
//     databaseId: number;
//     sum: number
//     from: number
//     to: number
// }

// interface IDataFailed {
//     errorMessage: string,
//     errorCode: number
// }

// interface IResponse {
//     status: PaymentStatus
//     data: IDataSuccess | IDataFailed;
// }


interface IDataFailed {
    errorMessage: string,
    errorCode: number
}

interface IDataSuccess extends IPayment {
    databaseId: number;
}

interface IResSuccess {
    status: PaymentStatus.success 
    data: IDataSuccess
}

interface IResFailed {
    status: PaymentStatus.failed
    data: IDataFailed
}

