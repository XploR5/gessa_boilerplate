import MFViewPageApp from './react-remote-app';
import MFforms from './forms';

export { default as ViewPageApp } from './react-remote-app';

export interface IMicroFrontend {
  url: string;
  scope: string;
  components: {
    [key: string]: string;
  };
  slices: {
    [key: string]: string;
  };
  routes: {
    [key: string]: string;
  };
}

export interface IMicroFrontends {
  [key: string]: IMicroFrontend;
}

const microFrontends: IMicroFrontends = {
  viewpageApp: MFViewPageApp,
  forms: MFforms,
};

export default microFrontends;
