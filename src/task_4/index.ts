/**
 * Задание 4 - Гарантия доставки
 * Денюжки со счета на счет перевести легко, а вот дотащить 3 килограмма палладия, может быть затруднительно
 * Изучите интервейс IContract
 * Опищите и реализуйте функционал сущности Договора-контракта
 * BankingContract - банковский перевод, без задержки
 * SmartContract - перевод через блокчейн, задержка 3000мс
 * LogisticContract - перевозка металла, задержка 6000мс
 */
import { Currency } from "../task_1";
import { ISecureVaultRequisites, Vault } from "../task_3";
import { BankController } from "../task_5";

abstract class Contract implements IContract {
    id: number;
    state: ContractState;
    value: Currency;
    sender: ISecureVaultRequisites;
    receiver: ISecureVaultRequisites;

    private static idCounter = 0;

    constructor() {
        this.id = Contract.idCounter++;
        this.state = ContractState.pending;
    }

    signAndTransfer(): void {
        console.log("Начинаем исполнение контракта...");
        this.state = ContractState.transfer;
    }

    closeTransfer(): void {
        console.log("Исполнение контракта успешно завершено!");
        this.state = ContractState.close;
    }
    rejectTransfer(): void {
        console.log("Отмена исполнения контракта :'(");
        this.state = ContractState.rejected;
    }
}

export class SmartContract extends Contract{

    constructor() {
        super();
    }

    signAndTransfer(): void {
        super.signAndTransfer();
        const sender: Vault = BankController.getInstanse().vaultStore.find(x => x.id === this.sender.id);
        const receiver: Vault = BankController.getInstanse().vaultStore.find(x => x.id === this.receiver.id);
        setTimeout(() =>{ 
            try {
                sender.transfer(this.value, receiver);
            } catch {
                super.rejectTransfer();
                throw Error("Не удалось провести операцию");
            }
        }, 3000)
    }
}

export class BankingContract extends Contract{

    constructor() {
        super();
    }

    signAndTransfer(): void {
        super.signAndTransfer();
        const sender: Vault = BankController.getInstanse().vaultStore.find(x => x.id === this.sender.id);
        const receiver: Vault = BankController.getInstanse().vaultStore.find(x => x.id === this.receiver.id);
        try{
            sender.transfer(this.value, receiver);
        } catch {
            super.rejectTransfer();
            throw Error("Не удалось провести операцию");
        }  
    }

}

export class LogisticContract extends Contract{

    constructor() {
        super();
    }
    signAndTransfer(): void {
        super.signAndTransfer();
        const sender: Vault = BankController.getInstanse().vaultStore.find(x => x.id === this.sender.id);
        const receiver: Vault = BankController.getInstanse().vaultStore.find(x => x.id === this.receiver.id);
        setTimeout(() =>{ 
            try {
                sender.transfer(this.value, receiver);
            } catch {
                super.rejectTransfer();
                throw Error("Не удалось провести операцию");
            }
        }, 6000)
    }
}


export interface IContract{
    /**
     * Уникальный номер контракта
     */
    id: number,
    /**
     * Текущее состояние контракта
     */
    state: ContractState,
    /**
     * Предмет контракта
     */
    value: Currency,
    /**
     * Реквизиты отправителя
     */
    sender: ISecureVaultRequisites,
    /**
     * Реквизиты получателя
     */
    receiver: ISecureVaultRequisites,
    /**
     * Начало исполнения контракта
     */
    signAndTransfer: () => void,
    /**
     * Успешное завершение контракта
     */
    closeTransfer: () => void,
    /**
     * Отмена исполнения контракта
     */
    rejectTransfer: () => void
}

export enum ContractState{
    /**
     * Контракт находится в ожидании исполнения
     */
    pending,
    /**
     * Контракт находится в исполнении
     */
    transfer,
    /**
     * Контракт исполнен успешно
     */
    close,
    /**
     * Контракт отменен, либо отклонен
     */
    rejected
}

