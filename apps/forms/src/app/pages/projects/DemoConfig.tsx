import { lazy, Suspense } from 'react';
import { Navigate } from 'react-router';
import { IPageConfig } from '../../../types/pageConfig';
import ChartDetails2 from './components/ChartDetails2';

const Demo2Wrapper = lazy(() => import('./DemoWrapper'));
const ChartDetails = lazy(() => import('./components/ChartDetails'));

const ProjectConfig: IPageConfig = {
  settings: {
    showHeader: true,
    layout: 'classic-ltr',
  },
  routes: [
    {
      path: '',
      element: <Navigate to={'project/:projectId/:menuId/:subMenuId/demo'} />,
    },
    {
      path: 'project/:projectId/:menuId/:subMenuId/demo',
      element: (
        <Suspense fallback={<>...</>}>
          <ChartDetails />
        </Suspense>
      ),
      children: [],
    },
    {
      path: 'project/:projectId/:menuId/:subMenuId/detail',
      element: (
        <Suspense fallback={<>...</>}>
          <ChartDetails2 />
        </Suspense>
      ),
    },
    // {
    //   path: 'detail',
    //   element: (
    //     <Suspense fallback={<>...</>}>
    //       <ChartDetails data={{}} />
    //     </Suspense>
    //   ),
    // },
  ],
};

export default ProjectConfig;
