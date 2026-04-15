import React from 'react';
import { IDownloadAction } from '../../../types/download.types';
import { IStallionConfigJson } from '../../../types/config.types';
declare const useDownloadActions: (dispatch: React.Dispatch<IDownloadAction>, refreshStallionMeta: () => void, configState: IStallionConfigJson) => {
    downloadBundle: (apiDownloadUrl: string, hash: string) => void;
    setProgress: (newProgress: number) => void;
    setDownloadErrorMessage: (message: string) => void;
};
export default useDownloadActions;
//# sourceMappingURL=useDownloadActions.d.ts.map