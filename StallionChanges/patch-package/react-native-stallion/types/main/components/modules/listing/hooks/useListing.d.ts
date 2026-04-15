import { IBucketCard } from '../components/BucketCard';
import { IBundleCard } from '../components/BundleCard';
declare const useListing: () => {
    listingData: (IBucketCard | IBundleCard)[];
    listingError: string | null | undefined;
    listingLoading: boolean;
    metaState: import("../../../../../types/meta.types").IStallionMeta;
    fetchListing: () => void;
    setBucketSelection: (bucketId?: string | null) => void;
    fetchNextPage: () => void;
    nextPageLoading: boolean | undefined;
    isBackEnabled: boolean;
};
export default useListing;
//# sourceMappingURL=useListing.d.ts.map