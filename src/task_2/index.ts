/** Задача 2 - Много стран, много валют
 * Определите классы следующих валют
 * Dollar
 * Ruble
 * XRP
 * Etherium
 * Gold
*/

import { Currency, CurrencyType } from "../task_1";

export class Dollar extends Currency{
    constructor(value: number) {
        super("Dollar", value, "USD");
        this.currencyType = CurrencyType.Material;
    }
}

export class Ruble extends Currency{
    constructor(value: number) {
        super("Ruble", value, "RUB");
        this.currencyType = CurrencyType.Material;
    }
}

export class XRP extends Currency{
    constructor(value: number) {
        super("XRP", value, "Ripple");
        this.currencyType = CurrencyType.Crypto;
    }
}

export class Etherium extends Currency{
    constructor(value: number) {
        super("Etherium", value, "ETH");
        this.currencyType = CurrencyType.Crypto;
    }
}

export class Gold extends Currency{
    constructor(value: number) {
        super("Gold", value, "XAU");
        this.currencyType = CurrencyType.MetallDeposit;
    }
}