import { BrowserRouter, Route, Routes } from 'react-router';
import { Home } from '../../pages/Home';
import { AboutPomodoro } from '../../pages/AboutPomodoro';
import { NotFound } from '../../pages/NotFound';
import { useLocation } from 'react-router';
import { useEffect } from 'react';
import { History } from '../../pages/History';
import { Settings } from '../../pages/Settings';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export function MainRouter() {
  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about-pomodoro' element={<AboutPomodoro />} />
          <Route path='/history' element={<History />} />
          <Route path='/settings' element={<Settings />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
