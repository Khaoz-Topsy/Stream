import * as CacheKey from './cacheKey';

import { initialCommonState } from './modules/common/index';
import { initialSettingState } from './modules/setting/index';
import { StateCommonReducer } from './state/StateCommonReducer';
import { StateSettingReducer } from './state/StateSettingReducer';


export const loadStateFromLocalStorage = () => {
    let commonReducer = initialCommonState;
    let storedCommonReducer = localStorage.getItem(CacheKey.CommonReducerKey);
    if (storedCommonReducer && storedCommonReducer !== "undefined") {
        commonReducer = JSON.parse(storedCommonReducer || '{}');
    }

    let settingReducer = initialSettingState;
    let storedSettingReducer = localStorage.getItem(CacheKey.SettingReducerKey);
    if (storedSettingReducer && storedSettingReducer !== "undefined") {
        settingReducer = JSON.parse(storedSettingReducer || '{}');
    }

    let persistedState: any = {
        settingReducer,
        commonReducer,
    }
    return persistedState;
}

export const saveStateToLocalStorage = (store: any) => {
    var currentCommonReducer = store.getState().commonReducer;
    var storedCommonReducer: StateCommonReducer = JSON.parse(localStorage.getItem(CacheKey.CommonReducerKey) || '{}');
    if (storedCommonReducer == null
        || storedCommonReducer.userGuid !== currentCommonReducer.userGuid
        || storedCommonReducer.userName !== currentCommonReducer.userName
        || storedCommonReducer.userProfileUrl !== currentCommonReducer.userProfileUrl
        || storedCommonReducer.userDetailsExpiryDate !== currentCommonReducer.userDetailsExpiryDate
    ) {
        currentCommonReducer.isLoading = false;
        localStorage.setItem(CacheKey.CommonReducerKey, JSON.stringify(currentCommonReducer));
    }

    var currentSettingReducer = store.getState().settingReducer;
    var storedSettingReducer: StateSettingReducer = JSON.parse(localStorage.getItem(CacheKey.SettingReducerKey) || '{}');
    if (storedSettingReducer == null
        || storedSettingReducer.isDark !== currentSettingReducer.isDark
    ) {
        localStorage.setItem(CacheKey.SettingReducerKey, JSON.stringify(currentSettingReducer));
    }
}