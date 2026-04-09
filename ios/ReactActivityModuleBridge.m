#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(ReactActivityModule, NSObject)

RCT_EXTERN_METHOD(launchManageAppSDK:(NSDictionary *)params)
RCT_EXTERN_METHOD(closeManageAppSDK)

@end
