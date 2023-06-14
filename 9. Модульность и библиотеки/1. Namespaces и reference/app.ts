namespace A {
    export const a = 5;

    export interface B {
        c: number;
    }
}

// A.a 

// ./app2.ts
// FILE
/// <reference path="./module/app2.ts">
//console.log(A.a)