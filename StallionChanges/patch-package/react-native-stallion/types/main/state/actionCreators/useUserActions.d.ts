import React from 'react';
import { IUserAction } from '../../../types/user.types';
import { ILoginActionPayload } from '../../../types/globalProvider.types';
import { IStallionConfigJson } from '../../../types/config.types';
declare const useUserActions: (dispatch: React.Dispatch<IUserAction>, refreshConfig: () => Promise<void>, configState: IStallionConfigJson) => {
    loginUser: (loginPayload: ILoginActionPayload) => void;
    clearUserLogin: (shouldClearLogin: boolean) => void;
};
export default useUserActions;
//# sourceMappingURL=useUserActions.d.ts.map