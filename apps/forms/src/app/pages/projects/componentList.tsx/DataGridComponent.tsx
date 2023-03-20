import {
  Datagrid,
  DataGridV1,
  DatatableCardV1,
  DoughnutChart,
  PieChart,
} from '@gessa/component-library';
import themes from 'apps/react-remote/src/theme';
import generateRandomString from 'apps/react-remote/src/utils/randomString';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import LoadingData from '../components/LoadingData';
import { DataGridDataMapping } from '../data-mapper/data-grid';
import { DoughnutChartDataMapping } from '../data-mapper/doughnut-chart';
import {
  getChartDataResource,
  getGridDataResource,
} from '../store/gridDataRenderSlice';

export const DataGridComponent = (props: any) => {
  const [tableData, setTableData] = useState<any>();
  const dispatch = useDispatch();
  useEffect(() => {
    new Promise((resolve, reject) => {
      if (props && props.rawData && props.rawData.report) {
        resolve(
          dispatch(
            getGridDataResource({
              label: '',
              report: props.rawData.report,
              widget_id: props.rawData.id,
              projections: '',
              filter: '',
              size: '1000',
              page: '0',
            })
          )
        );
      } else {
        const obj = {
          payload: {
            data: [],
          },
        };
        resolve(obj);
      }
    })
      .then((response: any) => {
        const mapperPayload: any = {
          data: props.rawData,
          fontData: {},
        };
        const obj = DataGridDataMapping(response, mapperPayload);
        setTableData(obj);
      })
      .catch((err: any) => {
        console.log(err);
        return err;
      });
  }, []);

  return props ? (
    tableData && tableData?.chartData ? (
      <div
        key={generateRandomString()}
        style={{
          height: 'calc(100% - 0px)',
          width: 'calc(100% - 0px)',
          display: 'flex',
          flexDirection: 'row',
          flex: 100,
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            flex: 100,
            overflowX: 'auto',
          }}
        >
          <DataGridV1
            key={generateRandomString()}
            columnData={tableData?.chartData?.data?.columns || []}
            rowData={tableData?.chartData?.data?.rows || []}
            columnResizable={false}
            pagination={tableData?.chartData?.pagination || false}
            height={tableData.height || 300}
            width={tableData.width || 500}
            chartProps={tableData?.chartData?.chartProps}
            menuClicked={tableData?.chartData?.menuClicked}
            onSearchInput={tableData?.chartData?.onSearchInput}
            rowClicked={props.rowClicked}
          />
        </div>
      </div>
    ) : (
      // <DatatableCardV1
      //   chartData={{
      //     columnData: tableData?.chartData?.data?.columns || [],
      //     rowData: tableData?.chartData?.data?.rows || [],
      //     columnResizable: tableData?.chartData?.columnResizable,
      //     pagination: tableData?.chartData?.pagination,
      //     height: (tableData?.chartData?.height || 400) - 200,
      //     width: (tableData?.chartData?.width || 500) - 200,
      //     chartProps: {
      //       title_color: themes.default.palette.text.tex600,
      //       bottom_border_color: themes.default.palette.neutral.neu100,
      //       background_color: themes.default.palette.background.bacopWhite,
      //     },
      //   }}
      //   chartProps={{
      //     border_color: themes?.default?.palette?.neutral?.neu100,
      //   }}
      //   headerData={tableData?.headerData}
      //   height={tableData?.chartData?.height - 100}
      //   width={tableData?.chartData?.width - 50}
      //   showBorder={true}
      //   actionClicked={(data: any) => {
      //     props.actionClicked && props.actionClicked(data);
      //   }}
      //   searchAction={(data: any) => {
      //     props.searchAction && props.searchAction(data);
      //   }}
      // />
      <LoadingData />
    )
  ) : (
    <Datagrid columns={[]} rows={[]} />
  );
};
