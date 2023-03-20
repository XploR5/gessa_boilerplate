import { Suspense, useEffect, useState } from 'react';
import Grid from './grid';
import GridCard from './gridCards';
import Widgets, { IComponent, IWidgetType, WIDGETS_V1 } from './widgets';
import axios from 'axios';
import { useConfigForm } from 'apps/react-remote/src/context/form';
import { IWidget } from '../store/widgetsSlice';
import { IReport } from '../store/reportSlice';
import { IReportLabel } from '../store/reportLabelSlice';
import { Button, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import { environment } from 'apps/react-remote/src/environments/environment';
import generateRandomString from 'apps/react-remote/src/utils/randomString';
import { useNavigate } from 'react-router-dom';

export interface Demo2Props {
  data: any;
  rawReports: IReport[];
  rawReportLabels: IReportLabel[];
  rawWidgets: IWidget[];
  saveLayout: (data: any) => void;
  fetchReportLabel: (data: string) => void;
  fetchReportLabelData: (data: any) => any;
}

export const Demo2Ui = (props: Demo2Props) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const {
    formConfig,
    setFormConfig,
    widgetToBeUpdated,
    setWidgetToBeUpdated,
    openWidgetConfigDrawer,
    setOpenWidgetConfigDrawer,
    saveFormStatus,
    setSaveFormStatus,
  } = useConfigForm();

  // All the dragable widgets
  const [widgets, setWidgets] = useState<any>([]);
  const [selectedWidget, setSelectedWidget] = useState<any>({});
  const [daat, setDT] = useState<any>();

  const getData = (widgetData: any): IComponent => {
    const index = WIDGETS_V1.findIndex(
      (value: IWidgetType) => value.type === widgetData.type
    );
    if (index !== -1) {
      return WIDGETS_V1[index].data;
    } else {
      return {
        component: () => <div>No Data Found</div>,
        props: {},
        label: 'noDataFound',
        w: 4,
        h: 4,
      };
    }
  };

  const parseMenuEvents = (data: any) => {
    // console.log(data);
    if (data && data.menu && data.widget) {
      switch (data.menu.menu.toLowerCase()) {
        case 'download':
          console.log('download event added');
          break;
        case 'filter':
          console.log('filter event added');
          break;
      }
    }
  };

  const saveLayoutData = (layoutPayload: any) => {
    setWidgets([]);
    // setWidgets(widgets);
    if (layoutPayload && layoutPayload.type === 'save') {
      props.saveLayout(widgets);
    }
  };

  const updateWidgetProps = (widgetData?: any) => {
    setWidgets([]);
    setWidgets(widgets);
  };

  useEffect(() => {
    setWidgets([]);
    if (props && props.data) {
      setWidgets(
        [...props.data].filter((value, index, self) => {
          return self.indexOf(value) === index;
        })
      );
    }
  }, [props.data]);

  useEffect(() => {
    const selectedReport = formConfig['selected-report'];
    const widgetType = formConfig.widgetType;

    widgetType &&
      selectedReport &&
      axios
        .get(environment.NX_BASE_URL + `/${formConfig.widgetType}`, {
          params: { searchText: selectedReport },
        })
        .then((data) => {
          setWidgets((prevWidgetsState: any) => {
            const updatedWidget = widgetToBeUpdated
              ? prevWidgetsState.find(
                  (widget: any) => widget.id === widgetToBeUpdated.id
                )
              : prevWidgetsState.at(-1);
            const newWidgetsState = widgetToBeUpdated
              ? prevWidgetsState.filter(
                  (widget: any) => widget.id !== widgetToBeUpdated.id
                )
              : prevWidgetsState.filter(
                  (widget: any) => widget.id !== updatedWidget.id
                );

            if (updatedWidget.type === 'grid') {
              newWidgetsState.push({ ...updatedWidget, formProps: data.data });
            } else {
              newWidgetsState.push({ ...updatedWidget, formProps: data });
            }

            return newWidgetsState;
          });
          setFormConfig({}); //reset to empty object. This needs to be done or else the next widget will be loaded with the previous widget props
        })
        .catch((error) =>
          console.error(
            `Could not fetch data for widget type ${formConfig.widgetType}:`,
            error
          )
        );
  }, [formConfig]);

  useEffect(() => {
    if (props && props.data && props.data.length) {
      setWidgets([]);
      setWidgets(
        [...props.data].filter((value, index, self) => {
          return self.indexOf(value) === index;
        })
      );
    }
  }, [props.data]);

  const fetchLabelFunc = (data: string) => {
    props.fetchReportLabel(data);
  };

  const fetchWidgetData = (data: any) => {
    props.fetchReportLabelData(data);
  };

  const onChartClick = (data: any) => {
    console.log(data);
    navigate('detail');
  };

  return (
    <div className="relative flex flex-col h-screen">
      <div className="grid grid-cols-12 " style={{ overflow: 'hidden' }}>
        <div className={'overflow-y-auto col-span-12 h-full'}>
          <div
            style={{
              height: 'calc(100% - 120px)',
              minHeight: 'calc(100% - 120px)',
              overflowX: 'hidden',
            }}
          >
            <Grid
              widgets={widgets}
              rawWidgets={props.rawWidgets}
              rawReports={props.rawReports}
              rawReportLabels={props.rawReportLabels}
              selectedWidget={selectedWidget}
              setWidgets={setWidgets}
              saveLayoutData={saveLayoutData}
              updateWidgetProps={updateWidgetProps}
              fetchLabels={fetchLabelFunc}
              setSelectedWidgetProp={setSelectedWidget}
              fetchWidgetData={fetchWidgetData}
            >
              {(actions: any) =>
                widgets.map((widget: any) => {
                  let _widget = JSON.parse(JSON.stringify(widget));
                  const { component: Widget, label } = getData(widget);

                  return (
                    Widget && (
                      <GridCard
                        widgets={widgets}
                        key={_widget.id}
                        x={_widget.x}
                        y={_widget.y}
                        w={_widget.w}
                        h={_widget.h}
                        id={_widget.id}
                        type={_widget.type}
                        title={label || _widget.data?.label || ''}
                        selectedWidget={_widget}
                        data={_widget.data}
                        actions={actions}
                        {..._widget.data}
                        editWidget={(data: any) => {
                          setSelectedWidget(data);
                          setOpenWidgetConfigDrawer(!openWidgetConfigDrawer);
                        }}
                      >
                        <Widget
                          key={generateRandomString()}
                          rawData={_widget}
                          headerData={_widget?.formProps?.headerData || {}}
                          chartData={{}}
                          actionClicked={(e: any) => {
                            parseMenuEvents({ widget: _widget, menu: e });
                          }}
                          searchAction={(e: any) => {
                            console.log(e);
                          }}
                          onChartClick={onChartClick}
                          rowClicked={onChartClick}
                        />
                      </GridCard>
                    )
                  );
                })
              }
            </Grid>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Demo2Ui;
