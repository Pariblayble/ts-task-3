/**
 * Задание 5 - Власть банков
 * В этой задаче вам нужно реализовать класс контроллер
 * 1. registerVault(): ISecureVaultRequisites - регистрирует хранилище в банке
 * 2. proceedContract(IContract): void - проводит договор между счетами
 * 3. Класс контроллера должен быть реализацией паттерна Singleton
 *
 * Хранилища должны быть сохранены в массив vaultStore: Vault[]
 */
import { BankingContract, ContractState, IContract, LogisticContract, SmartContract } from "../task_4";
import { ISecureVaultRequisites, Vault } from "../task_3";
import { CurrencyType } from "../task_1";

export class BankController{
    private static instanse: BankController;
    public vaultStore: Array<Vault>;

    private constructor() {
        this.vaultStore = new Array<Vault>();
    }

    public static getInstanse() {
        if (!BankController.instanse) {
            BankController.instanse = new BankController();
        }

        return BankController.instanse;
    }

    public registerVault(vailt: Vault): ISecureVaultRequisites{
        this.vaultStore.push(vailt);

        return {id: vailt.id};
    }

    public proceedContract(contract: IContract): void {
        if (!contract) {
            throw Error("Нетю контракта :С");
        }
        if (!contract.value) {
            contract.rejectTransfer()
            throw Error("Значение для перевода не определено.");
        }
        if (!contract.sender) {
            contract.rejectTransfer()
            throw Error("Реквизиты отправителя не определны.");
        }
        if (!contract.receiver) {
            contract.rejectTransfer()
            throw Error("Реквизиты получателя не определны.");
        }
        if (contract.state === ContractState.rejected) {
            throw Error("Этот контракт был отменен, необходимо создать новый!");
        }
        if (contract instanceof BankingContract && contract.value.currencyType !== CurrencyType.Material) {
            contract.rejectTransfer();
            throw Error('BankingContract предназанчен для переводов материальной валюты.');
        }
        if (contract instanceof SmartContract && contract.value.currencyType !== CurrencyType.Crypto) {
            contract.rejectTransfer();
            throw Error('SmartContract предназанчен для переводов крптовалюты.');
        }
        if (contract instanceof LogisticContract && contract.value.currencyType !== CurrencyType.MetallDeposit) {
            contract.rejectTransfer();
            throw Error('LogisticContract предназанчен для трансфера металла-депозита.');
        }

        contract.signAndTransfer();
        contract.closeTransfer();
    }
}

