// import { IRootState } from 'apps/react-remote/src/store';
// import { selectThemeContext } from 'apps/react-remote/src/app/pages/projects/newStore/themeContextSlice';
// import { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { SimpleBarChartDataMapping } from '../data-mapper/bar-chart';
// import { getChartDataResource } from '../store/gridDataRenderSlice';

// export const getBarChartData = (data: any) => {
//   const dispatch = useDispatch();

//   console.log('im api calling', data);
//   new Promise((resolve, reject) => {
//     resolve(
//       dispatch(
//         getChartDataResource({
//           label: data.label || '',
//           report: data.report || '',
//           widget_id: data.id,
//         })
//       )
//     );
//   })
//     .then((response: any) => {
//       console.log(data, response);
//       const mapperPayload = {
//         data,
//         fontData: {},
//       };
//       return SimpleBarChartDataMapping(response, mapperPayload);
//     })
//     .catch((err: any) => {
//       console.log(err);
//       return err;
//     });
// };
