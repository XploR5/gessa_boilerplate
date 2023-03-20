import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
  EntityState,
} from '@reduxjs/toolkit';
import { environment } from 'apps/react-remote/src/environments/environment';
import { IRootState } from 'apps/react-remote/src/store';
import axios from '../../../../utils/NetworkLayer';
import { addPageWidgetData, IRPageWidgetData } from './pageWidgetData';

type _IRGridData = EntityState<IRGrid>;
export interface IRGridData extends _IRGridData {
  activePageId: string;
}
export interface IRGrid extends _IRGridData {
  created_at: string;
  created_by: string;
  is_delete: number;
  page_id: string;
  updated_at: string;
  updated_by: string;
  widgets: any;
  page: string;
  __v: any;
  _id: string;
}

export const getPageDataByIdApi = createAsyncThunk(
  'get page config',
  async (params: any, { dispatch }) => {
    const payload = {
      page: params.page,
      size: params.size,
    };

    const response: any = (
      await axios.get(environment.NX_PAGE_SERVICE + `/page/` + params.page_id, {
        params: {},
      })
    ).data.result;
    dispatch(savePageDetails([response]));
    const pageWidgetData: IRPageWidgetData = {
      page_id: response.page_id,
      widgets: response.widgets || [],
    };
    dispatch(addPageWidgetData(pageWidgetData));
  }
);

export const savePageConfigurationApi = createAsyncThunk(
  'save page config',
  async (params: any, { dispatch }) => {
    const response: any = await axios.patch(
      environment.NX_PAGE_SERVICE + `/page/${params.page_id}`,
      params
    );

    const data = response.data.result;
    if (data) {
      dispatch(savePageDetails([data]));
    } else {
      dispatch(savePageDetails([]));
    }
    return response;
  }
);

const gridDataAdapter = createEntityAdapter<IRGrid>({
  selectId: ({ _id }) => _id,
});

export const { selectAll: selectGridData } = gridDataAdapter.getSelectors(
  (state: IRootState) => {
    return state.grid.pageDetailSlice;
  }
);

export const selectActivePageId = createSelector(
  (state: IRootState) => state.grid.pageDetailSlice,
  (data) => data
);

const pageDetailSlice = createSlice({
  name: 'Page-detail',
  initialState: gridDataAdapter.getInitialState({ activePageId: '-1' }),
  reducers: {
    savePageDetails: gridDataAdapter.upsertMany,
    deleteAllStore: gridDataAdapter.removeAll,
  },
});

export const { savePageDetails, deleteAllStore } = pageDetailSlice.actions;
export default pageDetailSlice.reducer;
