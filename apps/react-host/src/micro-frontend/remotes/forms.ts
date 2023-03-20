import { IMicroFrontend } from '.';
import { environment } from '../../environments/environment';

const MFforms = {
  url: 'http://localhost:8000/remoteEntry.js',
  scope: 'forms',
  components: {
    AppTsxFile: './app.tsx',
  },
  slices: {
    grid: './grid',
  },
  routes: {
    // default: './RoutingDemoConfig',
  },
};

export default MFforms;