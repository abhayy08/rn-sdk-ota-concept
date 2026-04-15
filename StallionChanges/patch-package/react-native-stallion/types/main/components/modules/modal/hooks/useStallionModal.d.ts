declare const useStallionModal: () => {
    isModalVisible: boolean;
    onBackPress: () => void;
    onClosePress: () => void;
    loginRequired: boolean;
    metaState: import("../../../../../types/meta.types").IStallionMeta;
    isBackEnabled: boolean;
    isDownloading: boolean;
    downloadProgress: number;
    downloadError: string | null | undefined;
    handleSwitch: (newSwitchStatus: any) => void;
    internalIsRestartRequired: boolean;
};
export default useStallionModal;
//# sourceMappingURL=useStallionModal.d.ts.map