export interface IUser {
    unilevelPoints: number;
    repeatPurchasePoints: number;
    btcWallet: string;
    tbcWallet: string;
    mobileNo: string;
    isActive: boolean;
    _id: string;
    name: string;
    username: string;
    uniqueCode: string;
    referralCode: string;
    createdDate: string;
    updatedDate: string;
}

export interface IAdmin {
    _id: string;
    name: string;
}

export interface ICashout {
    _id: string;
    user: IUser;
    userUnilevelPoints: number;
    userRepeatPurchasePoints: number;
    userMobileNo?: string;
    cashoutAmount: number;
    cashoutType: 'unilevel' | 'repeat-purchase';
    status: 'pending' | 'denied' | 'confirmed' | 'paid';
    createdDate: any;
    updatedDate: any;
}
