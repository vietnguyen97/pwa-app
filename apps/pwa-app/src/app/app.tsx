import { useEffect } from 'react';
import NxWelcome from './nx-welcome';
import { Route, Routes, Link } from 'react-router-dom';
import { registerSW } from 'virtual:pwa-register'
import { AppVersionMonitor } from './test';

export function App() {
  // tạo 1 bản pwa ở dev test
  const updateSW = registerSW({
    onNeedRefresh() {
      if (confirm("Có phiên bản mới, reload ngay?")) {
        updateSW()
      }
    },
    interval: 5000 // check update mỗi 5 giây
  })
  // useEffect(() => {
  //   updateSW()
  // }, [])
  return (
    <div>
      <NxWelcome title="pwa-app" />
  
      {/* START: routes */}
      {/* These routes and navigation have been generated for you */}
      {/* Feel free to move and update them to fit your needs */}
      <br />
      <hr />
      <br />
      <div role="navigation">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/page-2">Page 2</Link>
          </li>
        </ul>
      </div>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              This is the generated root route.{' '}
              <Link to="/page-2">Click here for page 2.</Link>
            </div>
          }
        />
        <Route
          path="/page-2"
          element={
            <div>
              <Link to="/">Click here to go back to root page.</Link>
            </div>
          }
        />
      </Routes>
      {/* END: routes */}
    </div>
  );
}

export default App;
