import { LineChart, StatCard } from '@gessa/component-library';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import LoadingData from '../components/LoadingData';
import { SimpleCardDataMapping } from '../data-mapper/card';
import { SimpleLineChartDataMapping } from '../data-mapper/line-chart';
import { getChartDataResource } from '../store/gridDataRenderSlice';

export const CardComponent = (props: any) => {
  const [chartData, setChartData] = useState<any>();
  const dispatch = useDispatch();
  // useEffect(() => {
  //   const mapperPayload: any = {
  //     data: props.rawData,
  //     fontData: {},
  //   };
  //   const obj = SimpleCardDataMapping(props.rawData, mapperPayload);
  //   setChartData(obj);
  // }, []);

  useEffect(() => {
    new Promise((resolve, reject) => {
      if (
        props &&
        props.rawData &&
        props.rawData.report &&
        props.rawData.label
      ) {
        resolve(
          dispatch(
            getChartDataResource({
              label: props.rawData.label || '',
              report: props.rawData.report || '',
              widget_id: props.rawData.id,
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
        // let _themeData = JSON.parse(JSON.stringify(themeData));

        // const _fontData = {
        //   families: themeData[0].font.result.families,
        //   url: themeData[0].font.result.urls,
        //   defaultFont: themeData[0].font.result.fonts.h1.fontFamily,
        // };
        const mapperPayload: any = {
          data: props.rawData,
          fontData: {},
        };
        const obj = SimpleCardDataMapping(
          props.rawData,
          mapperPayload,
          response
        );
        setChartData(obj);
      })
      .catch((err: any) => {
        console.log(err);
        return err;
      });
  }, []);

  return props ? (
    chartData ? (
      <StatCard data={chartData?.data} chartProps={chartData?.chartProps}         onChartClick={props.onChartClick}
      />
    ) : (
      <LoadingData />
    )
  ) : (
    <StatCard data={{}} />
  );
};
