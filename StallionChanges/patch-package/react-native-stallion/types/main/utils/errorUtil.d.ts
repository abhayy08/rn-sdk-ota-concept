export interface IErrorMessage {
    message?: string;
}
export interface IErrorObject {
    errors?: {
        data?: IErrorMessage[];
    };
}
export declare const extractError: (errorObject: IErrorObject) => string;
//# sourceMappingURL=errorUtil.d.ts.map