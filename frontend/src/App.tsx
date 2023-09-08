import React from 'react';
import {Layout} from './containers/Layout';
import CurrentUser from './containers/CurrentUser';
import Routes from './Routes';
import RecoilProvider from './containers/RecoilProvider';
function App() {
  return (
    <RecoilProvider>
      <Layout>
        <CurrentUser>
          <Routes />
        </CurrentUser>
      </Layout>
    </RecoilProvider>
  );
}

export default App;
