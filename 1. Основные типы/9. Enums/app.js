"use strict";
var StatusCode;
(function (StatusCode) {
    StatusCode[StatusCode["SUCCESS"] = 1] = "SUCCESS";
    StatusCode[StatusCode["IN_PROGRESS"] = 2] = "IN_PROGRESS";
    StatusCode[StatusCode["FAILED"] = 3] = "FAILED";
})(StatusCode || (StatusCode = {}));
const res = {
    message: 'Платеж успешен',
    statusCode: StatusCode.SUCCESS,
};
// 1 - Успех
// 2 - в процессе
// 3 - Отклонен
// Enum может быть string, number || Обращение правильней делать по StatusCode.SUCCESS
// Првоерка 
if (res.statusCode === StatusCode.SUCCESS) {
}
function complete() {
    return 3;
}
const res2 = 1 /* Roles.ADMIN */;
