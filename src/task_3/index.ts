/** Задача 3 - Моё хранилище
 *	Напишите класс хранилища(Vault)
 *	Из хранилища можно снимать валюту с помощью withdraw(Currency)
 *	В хранилище можно вкладывать валюту через deposit(Currency)
 *	Из хранлилища, можно переводить валюту через transfer(Currency, Vault)
*/
import { Currency } from "../task_1";

export class Vault implements ISecureVaultRequisites{
	public id: number;
	public store: Set<Currency> = new Set<Currency>()
    private static counterId = 0; 

    constructor() {
        this.id = Vault.counterId++;
    }

    public deposit(currency: Currency) {
        let hasValue = false;
            this.store.forEach((value) => {
                if (value.name === currency.name) {
                    value.value += currency.value; 
                    hasValue = true;
                }
            })
        if (!hasValue) {
            this.store.add(currency);
        }
    }

    public withdraw(currency: Currency) {
        let hasValue = false;
        this.store.forEach((value) => {
            if (value.name === currency.name) {
                if (value.value < currency.value) {
                    throw Error('Извините, батюшка, вы столько не заработали, чтоб снять');
                } else {
                    value.value -= currency.value;
                    hasValue = true;
                }
            }
        })
        if (!hasValue) {
            throw Error('Извините, батюшка, такой валютой вы не владеете');
        }
    }

    public transfer(currency: Currency, vault: Vault) {
        this.withdraw(currency);
        vault.deposit(currency);
    }
}


export interface ISecureVaultRequisites{
	id: number
}
