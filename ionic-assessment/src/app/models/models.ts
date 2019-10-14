export interface ILogin {
    email: string;
    password: string;
    returnSecureToken: boolean;
}

export interface IAccount {
    balance: number;
    overdraft: number;
}
