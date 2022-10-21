import * as type from './type';

import { StateSettingReducer } from '../../state/StateSettingReducer';

export const initialSettingState: StateSettingReducer = {
    isDark: true,
    menuIsVisible: false,
}

export const settingReducer = (state = initialSettingState, action: any) => {
    switch (action.type) {
        case type.DARKMODE:
            return Object.assign({}, state, {
                isDark: action.isDark
            });
        case type.TOGGLEMENU:
            const htmlTag = document.querySelector('html');
            if (htmlTag != null) {
                htmlTag.classList.toggle('nav-open');
            }
            return Object.assign({}, state, {
                menuIsVisible: htmlTag?.classList?.contains('nav-open') ?? false
            });
        default:
            return state
    }
}
