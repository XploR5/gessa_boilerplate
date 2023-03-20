import { useRef, useEffect, useState, forwardRef } from 'react';
import { GridItemHTMLElement, GridStack, GridStackNode } from 'gridstack';
import 'gridstack/dist/h5/gridstack-dd-native';
import 'gridstack/dist/gridstack.css';
import { Box, Drawer } from '@mui/material';
import { useTheme } from '@mui/system';
import { useConfigForm } from 'apps/react-remote/src/context/form';
// import ChartsPropFormV2 from './ChartsPropsFrom-V2';
import { IReport } from '../store/reportSlice';
import { IReportLabel } from '../store/reportLabelSlice';
import generateRandomString from 'apps/react-remote/src/utils/randomString';
import { WIDGETS_V1 } from './widgets';

export interface IGridData {
  rawWidgets: any;
  rawReports: IReport[];
  rawReportLabels: IReportLabel[];
  widgets: any;
  selectedWidget: any;
  setWidgets: any;
  children?: any;
  saveLayoutData: (data: any) => void;
  updateWidgetProps: (data?: any) => void;
  fetchLabels: (data: string) => void;
  setSelectedWidgetProp: (data: any) => any;
  fetchWidgetData: (data: any) => any;
}

const Grid = ({
  rawWidgets,
  rawReports,
  rawReportLabels,
  widgets,
  selectedWidget,
  setWidgets,
  children,
  saveLayoutData,
  updateWidgetProps,
  fetchLabels,
  setSelectedWidgetProp,
  fetchWidgetData,
}: IGridData) => {
  const theme = useTheme();
  const gridRef = useRef<any>();
  const {
    setFormConfig,
    openWidgetConfigDrawer,
    setOpenWidgetConfigDrawer,
    setWidgetToBeUpdated,
    saveFormStatus,
    setSaveFormStatus,
  } = useConfigForm();

  const saveConfigHandler = () => {
    setOpenWidgetConfigDrawer(!openWidgetConfigDrawer);
  };

  const [newFields, setNewFields] = useState<any>([]);
  const [selectedwidget, setSelectedWidget] = useState<any>();
  const [defaultData, setDefaultData] = useState<any>([]);
  const saveLayout = () => {
    const obj: any = { data: [], type: 'save' };
    obj.data = gridRef.current.save();
    obj.type = 'save';

    saveLayoutData(obj);
  };

  useEffect(() => {
    if (saveFormStatus === true) {
      saveLayout();
      setSaveFormStatus(false);
    }
  });

  useEffect(() => {
    gridRef.current = GridStack.init({
      cellHeight: 10,
      cellHeightUnit: 'px',
      minRow: 8, // don't collapse when empty
      margin: 4,
      acceptWidgets: true,
      disableDrag: true,
      disableResize: true,
    });

    const grid = gridRef.current;

    if (grid) {
      // grid.on('drag', function (event: any) {
      //   //if newly added widget dragged inside
      //   console.log('on drag in useeffect');
      // });
      // grid.on('dragstart', function (event: Event, el: GridItemHTMLElement) {
      //   //if already added widget dragged
      //   console.log('drag start');
      // });
      // grid.on('dragstop', function (event: Event, el: any) {
      //   //if already added widget dragged and stopped
      //   const width = parseInt(el.getAttribute('gs-w')) || 0;
      //   const height = parseInt(el.getAttribute('gs-h')) || 0;
      //   const id = el.getAttribute('id');
      //   const gsx = parseInt(el.getAttribute('gs-x')) || 0;
      //   const gsy = parseInt(el.getAttribute('gs-y')) || 0;
      //   // or all values...
      //   const obj = gridRef.current.update(el, {
      //     width,
      //     height,
      //     gsx,
      //     gsy,
      //     id,
      //   });
      //   const obj1 = gridRef.current.save();
      //   // setWidgets([obj1[0]]);
      //   setWidgets((widgets: any) => {
      //     const oldData = JSON.parse(JSON.stringify(widgets));
      //     const index = oldData.findIndex((value: any) => value.id === id);
      //     if (index !== -1) {
      //       oldData[index].x = gsx;
      //       oldData[index].y = gsy;
      //       oldData[index].h = height;
      //       oldData[index].w = width;
      //     }
      //     return oldData;
      //   });
      //   // updateWidgetProps([obj1[0]]);
      // });
      // grid.on('change', function (event: Event, items: GridStackNode[]) {
      //   console.log('on change');
      // });
      // grid.on('resizestart', function (event: Event, el: GridItemHTMLElement) {
      //   console.log('resize started');
      // });
      // grid.on('resizestop', function (event: Event, el: any) {
      //   const width = parseInt(el.getAttribute('gs-w')) || 0;
      //   const height = parseInt(el.getAttribute('gs-h')) || 0;
      //   const id = el.getAttribute('id');
      //   const gsx = parseInt(el.getAttribute('gs-x')) || 0;
      //   const gsy = parseInt(el.getAttribute('gs-y')) || 0;
      //   // or all values...
      //   const obj = gridRef.current.update(el, {
      //     w: width,
      //     h: height,
      //     x: gsx,
      //     y: gsy,
      //     id,
      //   });
      //   const obj1 = gridRef.current.save();
      //   setWidgets((widgets: any) => {
      //     const oldData = widgets;
      //     const index = oldData.findIndex((value: any) => value.id === id);
      //     if (index !== -1) {
      //       oldData[index].x = gsx || 0;
      //       oldData[index].y = gsy || 0;
      //       oldData[index].h = height || 4;
      //       oldData[index].w = width || 4;
      //     }
      //     return oldData;
      //   });
      // });
      // grid.on('resize', function (event: Event, el: any) {
      //   const width = parseInt(el.getAttribute('gs-w')) || 0;
      //   const height = parseInt(el.getAttribute('gs-h')) || 0;
      //   const id = el.getAttribute('id');
      //   const gsx = parseInt(el.getAttribute('gs-x')) || 0;
      //   const gsy = parseInt(el.getAttribute('gs-y')) || 0;
      // });
      // grid.on(
      //   'dropped',
      //   function (event: any, previousWidget: any, newWidget: any) {
      //     const { el, w, h, x, y } = newWidget;
      //     const _WIDGET_v1: any = JSON.parse(JSON.stringify(WIDGETS_V1));
      //     const index = _WIDGET_v1.findIndex(
      //       (value: any) => value.type === el.dataset.type
      //     );
      //     grid.removeWidget(el);
      //     const payload = {
      //       id: generateRandomString(),
      //       type: el.dataset.type,
      //       w: _WIDGET_v1[index].data.w,
      //       h: _WIDGET_v1[index].data.h,
      //       x,
      //       y,
      //     };
      //     setWidgets((items: any) => [...items, payload]);
      //     setSelectedWidget(payload);
      //     // saveLayout();
      //     // Enable Drawer
      //     setSelectedWidgetProp(payload);
      //     setOpenWidgetConfigDrawer(true);
      //     //reset form config data when new widget dropped
      //   }
      // );
    }
  }, [setWidgets, setFormConfig]);

  const handleAdd = (el: any, properties?: any) => {
    if (el && gridRef.current) {
      gridRef.current.addWidget(el, {
        id: properties.id,
        type: properties.type,
        x: properties.x,
        y: properties.y,
        h: properties.h,
        w: properties.w,
      });
    }
  };
  const updateWidget = (el: any, obj: any) => {
    updateWidgetProps(obj);
  };
  const handleRemove = (el: any, actualRemove = true) => {
    if (el && gridRef.current) {
      gridRef.current.removeWidget(el, false);
      actualRemove &&
        setWidgets((items: any) =>
          items.filter((item: any) => `${item.id}` !== el.id)
        );
    }
  };
  const handleEnableMove = (flag = true) => {
    if (gridRef.current) {
      gridRef.current.enableMove(flag);
    }
  };
  const ondrag = (data: Event) => {
    console.log('on drag');
  };
  const ondragover = (data: any) => {
    console.log('on drag over');
  };
  const onDragEnter = (event: any) => {
    console.log('on drag enter');
  };

  const elementClicked = (widget: any) => {
    setDefaultData({});
    const _widget = JSON.parse(JSON.stringify(widget));
    const newFieldsArray: any[] = [];
    if (widget) {
      const _rawWidgets = JSON.parse(JSON.stringify(rawWidgets));
      const ind = _rawWidgets.findIndex(
        (value: any) => value.type === _widget.type
      );
      const filterWidget = _rawWidgets.filter(
        (value: any) => value.type === _widget.type
      );
      if (filterWidget && filterWidget.length) {
        for (let i = 0; i < filterWidget[0].properties.length; i += 1) {
          const fieldPayload = {
            type: filterWidget[0].properties[i].datatype,
            value:
              _widget && _widget.formData && _widget.formData.properties
                ? _widget.formData.properties[filterWidget[0].properties[i].key]
                : '',
            label: filterWidget[0].properties[i].key,
            name: filterWidget[0].properties[i].key,
            placeholder: 'Enter ' + filterWidget[0].properties[i].key,
            options: [
              { label: 'l1', value: 'l1' },
              { label: 'l2', value: 'l2' },
              { label: 'l3', value: 'l3' },
            ],
            required: false,
            validation: {
              name: filterWidget[0].properties[i].key,
              required: true,
              errorMessage: filterWidget[0].properties[i].key + ' is required',
              min: 0,
              max: 0,
            },
          };
          newFieldsArray.push(fieldPayload);
        }
      }
      setNewFields(newFieldsArray);
      if (_widget && _widget.formData) {
        if (typeof _widget.formData === 'string') {
          setDefaultData(JSON.parse(_widget.formData));
          const formData = JSON.parse(JSON.stringify(_widget.formData));
          if (formData && formData.formData && formData.formData.report) {
            fetchLabelsFunc(formData.formData.report);
          }
        } else {
          setDefaultData(_widget.formData);
          if (
            _widget.formData &&
            _widget.formData.formData &&
            _widget.formData.formData.report
          ) {
            fetchLabelsFunc(_widget.formData.formData.report);
          }
        }
      }
    }
  };

  useEffect(() => {
    setSelectedWidget(selectedWidget);

    elementClicked(selectedWidget);
  }, [selectedWidget]);

  const saveFormData = (data: any) => {
    let tempWidget: any = {};
    saveConfigHandler();
    setWidgets((prevData: any) => {
      const oldWidget = JSON.parse(JSON.stringify(prevData));
      const index = oldWidget.findIndex(
        (value: any) => value.id === selectedwidget.id
      );
      if (index !== -1) {
        oldWidget[index].x = data.data.properties.x || oldWidget[index].x;
        oldWidget[index].y = data.data.properties.y || oldWidget[index].y;
        oldWidget[index].w = data.data.properties.w || oldWidget[index].w;
        oldWidget[index].h = data.data.properties.h || oldWidget[index].h;
        oldWidget[index].formData = JSON.stringify(data.data);
      }
      tempWidget = oldWidget[index];
      // console.log('oldWidget[index]', oldWidget);
      return oldWidget;
    });
    const index2 = widgets.findIndex(
      (value: any) => value.id === tempWidget.id
    );
    // fetchWidgetData(tempWidget);
  };

  const fetchLabelsFunc = (data: string) => {
    fetchLabels(data);
  };

  return (
    <Box
      component={'main'}
      sx={{
        // position: 'relative',
        // background: theme?.palette['light']['c50'],
        // backgroundImage: `linear-gradient(${theme.palette['background'].default} 1px, transparent 1px), linear-gradient(90deg, ${theme.palette['background'].default} 1px, transparent 1px)`,
        backgroundSize: '100px 70px, 8.33%',
        // backgroundSize: '50px 50px, 4%', // for smaller and presentable grids on background
        // backgroundPosition: '0px -4px, -4px 0px',
        margin: '4px',
      }}
      className="h-full"
    >
      {/* <Button
        sx={{ py: 0.25, px: 3 }}
        color="primary"
        variant="outlined"
        onClick={saveLayout}
      >
        Save
      </Button> */}
      <div className="grid-stack">
        {children({
          handleAdd,
          handleRemove,
          handleEnableMove,
          ondrag,
          ondragover,
          onDragEnter,
        })}
      </div>
      {/* <Drawer
        anchor={'right'}
        open={openWidgetConfigDrawer}
        sx={{
          '.MuiDrawer-paper': {
            width: '300px',
            p: 2,
            backgroundImage: 'none',
          },
        }}
      >
        <ChartsPropFormV2
          newFields={newFields}
          reports={rawReports}
          reportLabels={rawReportLabels}
          draggedWidget={widgets.at(-1)}
          defaultValues={{ defaultData }}
          saveConfigHandler={saveConfigHandler}
          sendFormData={saveFormData}
          fetchAllLabels={fetchLabelsFunc}
        />
      </Drawer> */}
    </Box>
  );
};

export default Grid;
