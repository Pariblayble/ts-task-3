/** Задача 1 - Сущность любой монетки
 * Опишите класс валюты
 * Он должен определять имя(name) валюты, String
 * Содержать количество(value) валюты, Number
 * Содержать количественный тип(unit), в котором исчисляется валюта, String
 * Класс должен предоставлять информацию о типе валюты: Материальная, криптовалюта или металл-депозит
 * Example new Currency("DOGE", 12.5, "satoshi")
 */

export class Currency{
    public name: string;
    public value: number;
    public unit: string;
    public currencyType: CurrencyType;

    constructor(name: string, value: number, unit: string) {
        if (name.length === 0) {
            throw Error('Ожидалось: адекватное имя валюты');
        }
        if (value < 0) {
            throw Error('Минус в количестве - минус твоя валюта');
        }
        if (unit.length === 0) {
            throw Error('Ожидалось: адекватное значние, в котором исчисляется валюта');
        }
        this.name = name;
        this.value = value;
        this.unit = unit; 
    }

    protected set type(value: CurrencyType) {
        this.currencyType = value;
    }
}

export enum CurrencyType {
    "Material",
    "Crypto",
    "MetallDeposit"
}
