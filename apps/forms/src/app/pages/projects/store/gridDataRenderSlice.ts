import {
  createSlice,
  createEntityAdapter,
  createSelector,
  EntityState,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import { environment } from 'apps/react-remote/src/environments/environment';
import axios from '../../../../utils/NetworkLayer';
import { IRootState } from '../../../../store';
import { tempDataJan16 } from 'apps/react-remote/src/fake-db/tableD';
type _IRGridDataRenderSlice = EntityState<IWidgetDataRender>;
export interface IRGridDataRenderSlice extends _IRGridDataRenderSlice {
  activeWidgetId: string;
}

export interface IWidgetDataRender {
  widgetid: string;
  report: string;
  label: string;
  data: any;
}

export interface IDataResourseParams {
  widget_id: string;
  report: string;
  label: string;
}

export const getChartDataResource = createAsyncThunk(
  'get chart resource',
  async (params: IDataResourseParams, { dispatch }) => {
    // const response: any = {};
    const response: any = await axios.get(
      environment.NX_SCHEMA_SERVICE +
        `/chart-data/report/${params.report}/label/${params.label}`
    );
    if (response && response.data) {
      const data: IWidgetDataRender = response.data;
      const payload: IWidgetDataRender = {
        data: data,
        label: params.label,
        report: params.report,
        widgetid: params.widget_id,
      };
      // dispatch(setGridDataRender(payload));
    } else {
      const myData: any = {
        data: {
          datasets: [
            {
              data: [
                Math.floor(Math.random() * 100),
                Math.floor(Math.random() * 100),
                Math.floor(Math.random() * 100),
                Math.floor(Math.random() * 100),
                Math.floor(Math.random() * 100),
              ],
              label: 'count',
            },
            {
              data: [
                Math.floor(Math.random() * 100),
                Math.floor(Math.random() * 100),
                Math.floor(Math.random() * 100),
                Math.floor(Math.random() * 100),
                Math.floor(Math.random() * 100),
              ],
              label: 'count2',
            },
            {
              data: [
                Math.floor(Math.random() * 100),
                Math.floor(Math.random() * 100),
                Math.floor(Math.random() * 100),
                Math.floor(Math.random() * 100),
                Math.floor(Math.random() * 100),
              ],
              label: 'count3',
            },
          ],
          labels: ['label1', 'label2', 'label3', 'label4', 'label5'],
        },
      };
      const data: IWidgetDataRender = myData.data;
      const payload: IWidgetDataRender = {
        data: data,
        label: params.label,
        report: params.report,
        widgetid: params.widget_id,
      };
      // dispatch(setGridDataRender(payload));
      // return myData;
    }
    return response;
  }
);

const getResposeDataAltered = (data: any): any => {
  const cols: any = [];
  const rows1: any = [];
  const newArr: any = [];
  if (data && data.length > 0) {
    const columnKeys = Object.keys(data[0]);
    columnKeys.map((keyname: string) => {
      const colObj: any = {
        field: keyname,
        headerName: keyname,
        type: 'string',
        flex: 1,
      };
      cols.push(colObj);
    });
    data.map((elt: any) => {
      const keys: any = Object.keys(elt);
      const returnObj: any = {};
      keys.forEach(
        (key: any) =>
          (returnObj[key] = {
            text: {
              value: elt[key],
              variant: 'body2',
            },
          })
      );
      newArr.push(returnObj);
    });
  }

  // console.log('wsdedrere', newArr);
  const gridObj = {
    columns: cols,
    rows: newArr,
  };

  return gridObj;
};

export const downloadWidgetDataApi = createAsyncThunk(
  'get chart resource',
  async (params: any, { dispatch }) => {
    // const response: any = {};
    const response: any = await axios.post(
      environment.NX_SCHEMA_SERVICE + `/queryReport/${params.report}`,
      {
        params: {
          projections: '',
          filter: '',
          size: '1000',
          page: '0',
        },
      }
    );
    const myData = [
      {
        impact: '4',
        count: 22556,
      },
      {
        impact: '5',
        count: 16741,
      },
      {
        impact: '3',
        count: 5234,
      },
      {
        impact: '2',
        count: 692,
      },
      {
        impact: '1',
        count: 3,
      },
    ];

    // return myData;
    return response;
  }
);

export const getGridDataResource = createAsyncThunk(
  'get chart resource',
  async (params: any, { dispatch }) => {
    // const response: any = {};
    const response: any = await axios.post(
      environment.NX_SCHEMA_SERVICE + `/queryReport/${params.report}`,
      {
        params: {
          projections: '',
          filter: '',
          size: '1000',
          page: '0',
        },
      }
    );
    if (response && response.data) {
      const data: IWidgetDataRender = response.data;
      const alteredObject = getResposeDataAltered(data);

      const payload: IWidgetDataRender = {
        data: alteredObject,
        label: params.label || '',
        report: params.report,
        widgetid: params.widget_id,
      };
      const responseNew = {
        data: alteredObject,
      };
      // dispatch(setGridDataRender(payload));
      return responseNew;
    } else {
      const myData = [
        {
          impact: '4',
          count: 22556,
        },
        {
          impact: '5',
          count: 16741,
        },
        {
          impact: '3',
          count: 5234,
        },
        {
          impact: '2',
          count: 692,
        },
        {
          impact: '1',
          count: 3,
        },
      ];
      const alteredObject = getResposeDataAltered(tempDataJan16);
      const payload: IWidgetDataRender = {
        data: alteredObject,
        label: params.label || '',
        report: params.report,
        widgetid: params.widget_id,
      };
      const responseNew = {
        data: alteredObject,
      };
      // dispatch(setGridDataRender(payload));
      // return responseNew;
      // return myData;
    }
    return response;
  }
);

const gridDataRenderAdapter = createEntityAdapter<IWidgetDataRender>({
  selectId: ({ widgetid }) => widgetid,
});

export const {
  selectAll: selectAllGridDataRender,
  selectById: selectGridDataRenderByWidgetId,
  selectIds: selectGridDataRenderByWidgetIds,
} = gridDataRenderAdapter.getSelectors((state: IRootState) => {
  return state.grid.gridDataRenderSlice;
});

const gridDataRenderSlice = createSlice({
  name: 'gridDataRenderSlice',
  initialState: gridDataRenderAdapter.getInitialState({
    activeWidgetId: null,
  }),
  reducers: {
    setGridDataRender: gridDataRenderAdapter.upsertOne,
  },
});

export const { setGridDataRender } = gridDataRenderSlice.actions;
export default gridDataRenderSlice.reducer;
