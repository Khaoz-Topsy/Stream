import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';

import * as route from './constants/route';
import { ScrollToTop } from './components/common/scroll/scrollToTop';
import { setBodyLoadingClass } from './helper/documentHelper';
import { HomePage } from './pages/home';
import { DashboardPage } from './pages/dashboard/dashboard';
import { VideoOverlayPage } from './pages/twitch/videoOverlay';

export const App: React.FC = () => {
  const effectTracker = '';
  useEffect(() => {
    setTimeout(() => {
      setBodyLoadingClass(false);
    }, 100);
  }, [effectTracker]);
  return (
    <ScrollToTop>
      <Switch>
        <Route exact={true} path={route.home} component={HomePage} />
        <Route path={route.dashboard} component={DashboardPage} />
        <Route path={route.videoOverlay} component={VideoOverlayPage} />
      </Switch>
    </ScrollToTop>
  );
}

