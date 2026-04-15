import { API_PATHS } from '../constants/apiConstants';
import { IStallionConfigJson } from '../../types/config.types';
type IAuthHandler = (loginRequired: boolean) => void;
export declare const useApiClient: (configState: IStallionConfigJson, authHandler?: IAuthHandler) => {
    getData: (apiPath: API_PATHS, apiBody: object) => Promise<any>;
};
export {};
//# sourceMappingURL=useApiClient.d.ts.map