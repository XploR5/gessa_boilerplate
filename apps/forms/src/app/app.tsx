import { CssBaseline } from '@mui/material';
import { StyledEngineProvider } from '@mui/material/styles';
import { useEffect } from 'react';
import { HashRouter, Outlet } from 'react-router-dom';
import {
  RouteProvider,
  SettingProvider,
  ThemeProvider,
  AuthProvider,
  MicroFrontendProvider,
  ReduxProvider,
} from '../context';
import Intermediate from './intermediate';
import LayoutWrapper from './layout/layout';
import DemoWrapper from './pages/projects/DemoWrapper';
export interface IAppProps {
  pageId: string;
  themeObject: any;
}

export function App(props: any) {
  useEffect(() => {
    // console.log('viwepage', props);
  }, [props]);
  return (
    <MicroFrontendProvider>
      <ReduxProvider>
        <ThemeProvider {...{ name: 'vishal' }}>
          <SettingProvider>
            <AuthProvider>
              <RouteProvider>
                {/* <HashRouter> */}
                <StyledEngineProvider injectFirst>
                  <CssBaseline />
                  {/* <div>hello{JSON.parse(JSON.stringify(props)).pageId} </div> */}
                  {/* <DemoWrapper
                    page_id={JSON.parse(JSON.stringify(props)).pageId}
                  /> */}

                  {/* <Intermediate
                    page_id={JSON.parse(JSON.stringify(props)).pageId}
                  /> */}
                  <div>hello</div>
                  {/* <LayoutWrapper /> */}
                </StyledEngineProvider>
                {/* </HashRouter> */}
              </RouteProvider>
            </AuthProvider>
          </SettingProvider>
        </ThemeProvider>
      </ReduxProvider>
    </MicroFrontendProvider>
  );
}

export default App;
