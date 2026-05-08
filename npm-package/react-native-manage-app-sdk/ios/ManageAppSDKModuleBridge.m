#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(ManageAppSDKModule, NSObject)

RCT_EXTERN_METHOD(launchManageAppSDK:(NSDictionary *)params)
RCT_EXTERN_METHOD(closeManageAppSDK)
RCT_EXTERN_METHOD(preloadManageAppSDKInstance)

+ (BOOL)requiresMainQueueSetup
{
  return NO;
}

@end
