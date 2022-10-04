export declare const start: any;
export declare function handleAuth(): Promise<{
    token: string;
    user: User;
}>;
export interface User {
    _id: string;
    username: string;
    oneId: string;
    email: string;
    isVerified: boolean;
    fullName?: string;
    gender?: string;
    dob?: string;
    phone?: string;
    maritalStatus?: string;
    primaryAddress?: string;
    secondaryAddress?: string;
    country?: string;
    postalCode?: string;
    [key: string]: any;
}
//# sourceMappingURL=v2.d.ts.map