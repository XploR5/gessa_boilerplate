// import { Close } from '@mui/icons-material';
// import {
//   Button,
//   FormControlLabel,
//   InputBase,
//   InputLabel,
//   Radio,
//   RadioGroup,
//   Switch,
// } from '@mui/material';
// import { useConfigForm } from 'apps/react-remote/src/context/form';
// import generateRandomString from 'libs/ui/src/static/randomString';
// import { useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as Yup from 'yup';
// import { alpha, styled, useTheme } from '@mui/system';
// import { useEffect, useState } from 'react';
// import { IReport } from '../store/reportSlice';
// import { IReportLabel } from '../store/reportLabelSlice';

// export interface IChartPropsFormProps {
//   reports: IReport[];
//   reportLabels: IReportLabel[];
//   draggedWidget: any;
//   newFields: any;
//   defaultValues: any;

//   saveConfigHandler: () => void;
//   sendFormData: (data: any) => void;
//   fetchAllLabels: (data: any) => void;
// }

// const ChartsPropFormV2 = (props: IChartPropsFormProps) => {
//   const blockedTypes = ['card', 'grid'];
//   const theme = useTheme();
//   const { formConfig, setFormConfig } = useConfigForm();
//   const [dynamicFormData, setDynamicFormData] = useState<any>(props.newFields);

//   useEffect(() => {
//     // console.log(props.draggedWidget);
//   }, [props.draggedWidget]);
//   const setReportNameOptionsFunc = (reportData: IReport[]) => {
//     const optionArray = [];
//     if (reportData && reportData.length) {
//       for (let i = 0; i < reportData.length; i += 1) {
//         const payload = {
//           label: reportData[i].name,
//           value: reportData[i].name,
//         };
//         optionArray.push(payload);
//       }
//     }
//     return optionArray;
//   };

//   const [reportNameoptions, setReportNameoptions] = useState<any>(
//     setReportNameOptionsFunc(props.reports)
//   );

//   useEffect(() => {
//     if (reportNameoptions && reportNameoptions.length > 0) {
//       props.fetchAllLabels(reportNameoptions[0].value);
//     }
//   }, [reportNameoptions]);

//   const setLabelNameOptionsFunc = (labelData: IReportLabel[]): any => {
//     const optionArray = [];
//     if (labelData && labelData.length) {
//       for (let j = 0; j < labelData.length; j += 1) {
//         const labels = Object.keys(labelData[j]);
//         for (let i = 0; i < labels.length; i += 1) {
//           const payload = {
//             label: labels[i],
//             value: labels[i],
//           };
//           if (
//             optionArray &&
//             optionArray.findIndex(
//               (value: any) => value.label === payload.label
//             ) === -1
//           ) {
//             optionArray.push(payload);
//           }
//         }
//       }
//     }
//     return optionArray;
//   };
//   const [labelNameOptions, setLabelNameOptions] = useState<any>([]);

//   useEffect(() => {
//     if (props && props.reportLabels) {
//       setLabelNameOptions([]);
//       setLabelNameOptions(setLabelNameOptionsFunc(props.reportLabels));
//     }
//   }, [props.reportLabels]);

//   // const [options, setOptions] = useState([
//   //   { label: 'name', value: 'name' },
//   //   { label: 'age', value: 'age' },
//   //   { label: 'lname', value: 'lname' },
//   // ]);

//   const BootstrapInput = styled(InputBase)(({ theme }) => ({
//     '& .MuiInputBase-input': {
//       borderRadius: 4,
//       position: 'relative',
//       backgroundColor: theme.palette.mode === 'light' ? '#fcfcfb' : '#2b2b2b',
//       // border: '1px solid #ced4da',
//       fontSize: 16,
//       width: '100%',
//       padding: '10px 12px',

//       '&:focus': {
//         boxShadow: `${alpha(theme.palette['primary'].main, 0.25)} 0 0 0 0.2rem`,
//         borderColor: theme.palette['primary'].main,
//       },
//     },
//     '& .MuiInputBase': {
//       margin: 'none',
//     },
//     '& select': {
//       backgroundColor: theme.palette.mode === 'light' ? '#fcfcfb' : '#2b2b2b',
//     },
//   }));

//   const serilizeValidationSchema = (formData: any) => {
//     const validationObjFinal: any = {};
//     const arr = [];
//     for (let i = 0; i < formData.length; i += 1) {
//       //   for (let j = 0; j < formData[i].form.length; j += 1) {
//       const payload: any = [];
//       payload[formData[i].validation.name] = Yup.string();
//       if (formData[i].validation.required) {
//         payload[formData[i].validation.name] = Yup.string();
//       }
//       if (
//         formData[i].validation.required &&
//         formData[i].validation.errorMessage
//       ) {
//         payload[formData[i].validation.name] = Yup.string().required(
//           formData[i].validation.errorMessage
//         );
//         Object.assign(validationObjFinal, payload);
//       }
//       //   }
//     }
//     return validationObjFinal;
//   };

//   const serilizeDefaultValues = (): any => {
//     const obj: any = {};
//     if (
//       props &&
//       props.defaultValues &&
//       props.defaultValues.defaultData &&
//       props.defaultValues.defaultData.formData
//     ) {
//       // for (let i = 0; i < props.defaultValues.defaultValues.length; i += 1) {
//       //   obj[props.defaultValues.defaultValues[i].key] =
//       //     props.defaultValues.defaultValues[i].value;
//       // }
//       return props.defaultValues.defaultData.formData;
//     }
//     return obj;
//   };

//   const {
//     register,
//     handleSubmit,
//     reset,
//     watch,
//     control,
//     setValue,
//     setFocus,
//     getValues,
//     formState: { errors },
//   } = useForm<any>({
//     resolver: yupResolver(
//       Yup.object().shape({
//         label: Yup.string(),
//         report: Yup.string(),
//         ...serilizeValidationSchema(props.newFields),
//       })
//     ),
//     defaultValues: serilizeDefaultValues(),
//   });

//   const saveConfigForm = () => {
//     props.saveConfigHandler();
//     setFormConfig({ ...formConfig, widgetType: props.draggedWidget.type });
//   };

//   const onCancel = () => {
//     props.saveConfigHandler();
//   };
//   const onSubmit = (data: any) => {
//     const obj = JSON.parse(JSON.stringify(data));
//     const obj2: any = JSON.parse(JSON.stringify(data));
//     obj.tags = '';

//     const keysArray = props.newFields.map((value: any) => value.name);
//     const obj2Keys: any = Object.keys(obj2);

//     for (let i = 0; i < obj2Keys.length; i += 1) {
//       if (keysArray.includes(obj2Keys[i])) {
//         //do nothing
//       } else {
//         delete obj2[obj2Keys[i]];
//       }
//     }

//     const payload: any = {
//       type: 'submit',
//       data: { formData: obj, properties: obj2 },
//     };
//     props.sendFormData(payload);
//     props.saveConfigHandler();
//   };

//   const getOptionsRendered = (data: any) => {
//     return (
//       data &&
//       data.length &&
//       data.map((myopt: any) => {
//         return (
//           <option key={Math.random().toString()} value={myopt.value}>
//             {myopt.label}
//           </option>
//         );
//       })
//     );
//   };

//   const getAllLabels = () => {
//     props.fetchAllLabels(getValues('report'));
//   };

//   // useEffect(() => {
//   //   if (
//   //     props &&
//   //     props.defaultValues &&
//   //     props.defaultValues &&
//   //     props.defaultValues.defaultData &&
//   //     props.defaultValues.defaultData.formData &&
//   //     props.defaultValues.defaultData.formData.report
//   //   ) {
//   //     props.fetchAllLabels(props.defaultValues.defaultData.formData.report);
//   //   }
//   // });

//   return (
//     <div>
//       <div
//         className="box box-border flex flex-col relative flex-grow justify-start w-full  overflow-x-hidden overflow-y-hidden"
//         style={{ height: '100%' }}
//       >
//         <div
//           className="flex flex-row justify-between items-center p-2"
//           style={{
//             borderBottomWidth: '1px',
//             borderBottomColor: theme.palette['background'].paper,
//           }}
//         >
//           <div>
//             <p className="text-xl  leading-8">Widget Properties</p>
//           </div>
//           <div>
//             <Close className="h-4 " onClick={onCancel} />
//           </div>
//         </div>
//         <div className="relative flex flex-col  gap-5 flex-grow h-full">
//           <form
//             className="flex flex-col justify-between items-stretch"
//             onSubmit={handleSubmit(onSubmit)}
//           >
//             <div
//               className="flex flex-col justify-start items-start flex-grow w-full p-2 overflow-y-auto overflow-x-hidden"
//               style={{ height: 'calc(100vh - 99px)' }}
//             >
//               <div
//                 className="form-group w-full  py-1 px-0 flex flex-col gap-2"
//                 key={generateRandomString()}
//               >
//                 <InputLabel
//                   shrink
//                   htmlFor="bootstrap-input"
//                   style={{ fontSize: '22px' }}
//                 >
//                   Reports
//                 </InputLabel>
//                 <select
//                   className="leading-8 p-2 h-10 text-sm"
//                   {...register('report')}
//                   key={Math.random().toString()}
//                   style={{
//                     backgroundColor:
//                       theme.palette.mode === 'light' ? '#fcfcfb' : '#2b2b2b',
//                     color: theme.palette['getContrastText'](
//                       theme.palette['background'].paper
//                     ),
//                   }}
//                   placeholder={'select report'}
//                   onChange={(e) => {
//                     setValue('report', e.target.value);
//                     getAllLabels();
//                   }}
//                 >
//                   {getOptionsRendered(reportNameoptions)}
//                 </select>
//                 <div
//                   className="invalid-feedback text-red-400"
//                   key={generateRandomString()}
//                 >
//                   {errors['report']?.message}
//                 </div>
//               </div>

//               {props &&
//                 props.draggedWidget &&
//                 !blockedTypes.includes(
//                   props.draggedWidget.type.toLowerCase()
//                 ) && (
//                   <div
//                     className="form-group w-full  py-1 px-0 flex flex-col gap-2"
//                     key={generateRandomString()}
//                   >
//                     <InputLabel
//                       shrink
//                       htmlFor="bootstrap-input"
//                       style={{ fontSize: '22px' }}
//                     >
//                       Report Label
//                     </InputLabel>
//                     <select
//                       className="leading-8 p-2 h-10 text-sm"
//                       {...register('label')}
//                       key={Math.random().toString()}
//                       style={{
//                         backgroundColor:
//                           theme.palette.mode === 'light'
//                             ? '#fcfcfb'
//                             : '#2b2b2b',
//                         color: theme.palette['getContrastText'](
//                           theme.palette['background'].paper
//                         ),
//                       }}
//                       placeholder={'select label'}
//                     >
//                       {getOptionsRendered(labelNameOptions)}
//                     </select>
//                     <div
//                       className="invalid-feedback text-red-400"
//                       key={generateRandomString()}
//                     >
//                       {errors['label']?.message}
//                     </div>
//                   </div>
//                 )}

//               {/* <div
//                 className="form-group w-full  py-1 px-0 flex flex-col "
//                 key={generateRandomString()}
//               >
//                 <InputLabel
//                   shrink
//                   htmlFor="bootstrap-input"
//                   style={{ fontSize: '22px' }}
//                 >
//                   {'Label'}
//                 </InputLabel>
//                 <BootstrapInput
//                   {...register('label')}
//                   defaultValue=""
//                   placeholder={'Enter Label name'}
//                   key={generateRandomString()}
//                   id="label"
//                   // register={register}
//                 />
//                 <div
//                   className="invalid-feedback text-red-400"
//                   key={generateRandomString()}
//                 >
//                   {errors['label']?.message}
//                 </div>
//               </div> */}
//               {dynamicFormData &&
//                 dynamicFormData.length > 0 &&
//                 dynamicFormData.map((field: any) => {
//                   switch (field.type) {
//                     case 'text':
//                       return (
//                         <div
//                           className="w-full  py-1 px-0 flex flex-col gap-2 "
//                           key={generateRandomString()}
//                         >
//                           <InputLabel
//                             shrink
//                             htmlFor="bootstrap-input"
//                             style={{ fontSize: '22px' }}
//                           >
//                             {field.label}
//                           </InputLabel>
//                           <BootstrapInput
//                             {...register(field.name)}
//                             defaultValue={field.value}
//                             id={field.name}
//                           />

//                           <div
//                             className="invalid-feedback text-red-400"
//                             key={generateRandomString()}
//                           >
//                             {errors[field.name]?.message}
//                           </div>
//                         </div>
//                       );
//                     case 'slide':
//                       return (
//                         <div
//                           className="w-full  py-1 px-0 flex flex-col gap-2 "
//                           key={generateRandomString()}
//                         >
//                           <InputLabel
//                             shrink
//                             htmlFor="bootstrap-input"
//                             style={{ fontSize: '22px' }}
//                           >
//                             {field.label}
//                           </InputLabel>
//                           <Switch
//                             {...register(field.name)}
//                             value={field.value}
//                           />

//                           <div
//                             className="invalid-feedback text-red-400"
//                             key={generateRandomString()}
//                           >
//                             {errors[field.name]?.message}
//                           </div>
//                         </div>
//                       );
//                     case 'select':
//                       return (
//                         <div
//                           className="form-group w-full  py-1 px-0 flex flex-col gap-2"
//                           key={generateRandomString()}
//                         >
//                           <InputLabel
//                             shrink
//                             htmlFor="bootstrap-input"
//                             style={{ fontSize: '22px' }}
//                           >
//                             {field.label}
//                           </InputLabel>
//                           <select
//                             className="leading-8 p-2 h-10 text-sm"
//                             {...register(field.name)}
//                             key={Math.random().toString()}
//                             style={{
//                               backgroundColor:
//                                 theme.palette['background'].paper,
//                               color: theme.palette['getContrastText'](
//                                 theme.palette['background'].paper
//                               ),
//                             }}
//                             placeholder={field.placeholder}
//                           >
//                             {getOptionsRendered(field.options)}
//                           </select>

//                           <div
//                             className="invalid-feedback text-red-400"
//                             key={generateRandomString()}
//                           >
//                             {errors[field.name]?.message}
//                           </div>
//                         </div>
//                       );
//                     case 'radio':
//                       return (
//                         <div
//                           className="form-group w-full  py-1 px-0 flex flex-col gap-2"
//                           key={generateRandomString()}
//                         >
//                           <RadioGroup
//                             aria-labelledby="demo-controlled-radio-buttons-group"
//                             name={field.name}
//                             value={field.value}
//                             onBlur={(event: any) => {
//                               setValue(field.name, event?.target.value);
//                               field.value = event?.target.value;
//                             }}
//                           >
//                             {field.options &&
//                               field.options &&
//                               field.options.map((option: any) => {
//                                 return (
//                                   <FormControlLabel
//                                     checked={option.value === field.value}
//                                     value={option.value}
//                                     control={<Radio />}
//                                     label={option.label}
//                                   />
//                                 );
//                               })}
//                           </RadioGroup>
//                           {/* {field.options &&
//                             field.options.length &&
//                             field.options.map((option: any) => {
//                               return (
//                                 <>
//                                   <input
//                                     {...register(field.name)}
//                                     type="radio"
//                                     value={option.value}
//                                   />
//                                   {option.label}
//                                 </>
//                               );
//                             })} */}
//                         </div>
//                       );
//                     default:
//                       return (
//                         <div
//                           className="w-full  py-1 px-0 flex flex-col gap-2 "
//                           key={generateRandomString()}
//                         >
//                           <InputLabel
//                             shrink
//                             htmlFor="bootstrap-input"
//                             style={{ fontSize: '22px' }}
//                           >
//                             {field.label}
//                           </InputLabel>
//                           <BootstrapInput
//                             {...register(field.name)}
//                             defaultValue={field.value}
//                             id={field.name}
//                           />

//                           <div
//                             className="invalid-feedback text-red-400"
//                             key={generateRandomString()}
//                           >
//                             {errors[field.name]?.message}
//                           </div>
//                         </div>
//                       );
//                   }
//                 })}
//             </div>

//             <div
//               className="flex flex-col w-full bottom-0 absolute"
//               style={{
//                 backgroundColor: theme.palette['background'].paper,
//               }}
//             >
//               <div
//                 className="form-group flex flex-row justify-end items-center gap-2 p-2"
//                 style={{
//                   borderTopWidth: '1px',
//                   borderTopColor: theme.palette['background'].paper,
//                 }}
//               >
//                 <Button
//                   variant="contained"
//                   type="reset"
//                   style={{
//                     backgroundColor: '#292929',
//                     color: theme.palette['getContrastText'](
//                       theme.palette['background'].paper
//                     ),
//                   }}
//                   className="h-9 text-sm py-2.5 px-6"
//                   onClick={onCancel}
//                 >
//                   Cancel
//                 </Button>
//                 <Button
//                   type="submit"
//                   variant="contained"
//                   style={{
//                     backgroundColor: '#292929',
//                     color: theme.palette['getContrastText'](
//                       theme.palette['background'].paper
//                     ),
//                   }}
//                   className="h-9 text-sm py-2.5 px-6"
//                 >
//                   Save
//                 </Button>
//               </div>
//             </div>
//           </form>
//         </div>
//         <div></div>
//       </div>
//     </div>
//   );
// };
// export default ChartsPropFormV2;
