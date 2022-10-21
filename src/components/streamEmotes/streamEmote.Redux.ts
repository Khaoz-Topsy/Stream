import { State } from '../../redux/state';

import { getUserGuid, getUserName, getUserProfileUrl } from '../../redux/modules/common/selector';

export const mapStateToProps = (state: State) => {
    return {
        userGuid: getUserGuid(state),
        userProfileUrl: getUserProfileUrl(state),
        userName: getUserName(state),
    };
};

export const mapDispatchToProps = (dispatch: any) => {

    let newProps: any = {};
    return { ...newProps };
}