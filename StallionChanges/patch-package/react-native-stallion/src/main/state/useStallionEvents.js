import { useEffect, useCallback, useMemo } from 'react';
import { NativeEventEmitter } from 'react-native';
import { NativeEventTypesProd, STALLION_NATIVE_EVENT, NativeEventTypesStage, DEFAULT_STALLION_PARAMS } from '../constants/appConstants';
import { stallionEventEmitter } from '../utils/StallionEventEmitter';
import { acknowledgeEventsNative, onLaunchNative, popEventsNative } from '../utils/StallionNativeUtils';
import { hasCrashOccurredCheck } from '../utils/crashState';
import StallionNativeModule from '../../StallionNativeModule';
import { useApiClient } from '../utils/useApiClient';
import { API_PATHS } from '../constants/apiConstants';
import debounce from '../utils/debounce';
import { UpdateMetaActionKind } from '../../types/updateMeta.types';
const REFRESH_META_EVENTS = {
  [NativeEventTypesProd.DOWNLOAD_COMPLETE_PROD]: true,
  [NativeEventTypesProd.ROLLED_BACK_PROD]: true,
  [NativeEventTypesProd.AUTO_ROLLED_BACK_PROD]: true,
  [NativeEventTypesProd.STABILIZED_PROD]: true,
  [NativeEventTypesStage.DOWNLOAD_COMPLETE_STAGE]: true,
  [NativeEventTypesStage.DOWNLOAD_ERROR_STAGE]: true,
  [NativeEventTypesStage.INSTALLED_STAGE]: true
};
const STALLION_EVENT_DEBOUNCE_INTERVAL = 3000; // 3s

const processStallionEvent = eventString => {
  try {
    return JSON.parse(eventString);
  } catch (_) {
    return null;
  }
};
export const useStallionEvents = (refreshMeta, setProgress, configState, updateMetaDispatch, stallionInitParams) => {
  const {
    getData
  } = useApiClient(configState);
  const syncStallionEvents = useCallback(stallionEvents => {
    if (configState !== null && configState !== void 0 && configState.projectId) {
      getData(API_PATHS.LOG_EVENTS, {
        projectId: configState.projectId,
        eventData: stallionEvents
      }).then(res => {
        if (res !== null && res !== void 0 && res.success) {
          try {
            const eventIds = stallionEvents.map(event => event.eventId);
            const eventIdString = JSON.stringify(eventIds);
            acknowledgeEventsNative(eventIdString);
          } catch (_) {}
        }
      });
    }
  }, [getData, configState]);
  const popEvents = useCallback(() => {
    popEventsNative().then(eventsString => {
      try {
        const eventsArr = JSON.parse(eventsString);
        if (eventsArr !== null && eventsArr !== void 0 && eventsArr.length) {
          syncStallionEvents(eventsArr);
          requestAnimationFrame(refreshMeta);
        }
      } catch (_) {}
    });
  }, [syncStallionEvents, refreshMeta]);
  const popEventsDebounced = useMemo(() => debounce(popEvents, STALLION_EVENT_DEBOUNCE_INTERVAL), [popEvents]);
  useEffect(() => {
    const eventEmitter = new NativeEventEmitter(StallionNativeModule);
    eventEmitter.addListener(STALLION_NATIVE_EVENT, nativeEventString => {
      const eventData = processStallionEvent(nativeEventString);
      if (!eventData) return;
      const eventType = eventData === null || eventData === void 0 ? void 0 : eventData.type;
      if (REFRESH_META_EVENTS[eventType]) {
        requestAnimationFrame(refreshMeta);
        popEventsDebounced();
      }
      switch (eventType) {
        case NativeEventTypesProd.DOWNLOAD_STARTED_PROD:
          updateMetaDispatch({
            type: UpdateMetaActionKind.SET_PENDING_RELEASE_HASH,
            payload: (eventData === null || eventData === void 0 ? void 0 : eventData.releaseHash) || ''
          });
          stallionEventEmitter.emit(eventData);
          break;
        case NativeEventTypesProd.DOWNLOAD_PROGRESS_PROD:
        case NativeEventTypesProd.DOWNLOAD_COMPLETE_PROD:
        case NativeEventTypesProd.DOWNLOAD_ERROR_PROD:
        case NativeEventTypesProd.INSTALLED_PROD:
        case NativeEventTypesProd.SYNC_ERROR_PROD:
        case NativeEventTypesProd.ROLLED_BACK_PROD:
        case NativeEventTypesProd.STABILIZED_PROD:
        case NativeEventTypesProd.EXCEPTION_PROD:
        case NativeEventTypesProd.AUTO_ROLLED_BACK_PROD:
          stallionEventEmitter.emit(eventData);
          break;
        case NativeEventTypesStage.DOWNLOAD_PROGRESS_STAGE:
          try {
            const progress = Number(eventData === null || eventData === void 0 ? void 0 : eventData.progress);
            if (progress) {
              setProgress(progress);
            }
          } catch (_) {}
          break;
      }
    });
    return () => {
      eventEmitter.removeAllListeners(STALLION_NATIVE_EVENT);
    };
  }, [refreshMeta, setProgress, popEventsDebounced, updateMetaDispatch]);
  useEffect(() => {
    setTimeout(() => {
      // Don't send onLaunchNative if a JS crash has occurred
      if (hasCrashOccurredCheck()) {
        console.warn('React Native Stallion: Skipping onLaunchNative due to JS crash');
        return;
      }
      if (stallionInitParams) {
        try {
          onLaunchNative(JSON.stringify(stallionInitParams));
        } catch (_) {
          throw new Error('React Native Stallion: Invalid init params');
        }
      } else {
        onLaunchNative(JSON.stringify(DEFAULT_STALLION_PARAMS));
      }
    }, 100);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    popEventsDebounced();
  }, [popEventsDebounced]);
};
//# sourceMappingURL=useStallionEvents.js.map