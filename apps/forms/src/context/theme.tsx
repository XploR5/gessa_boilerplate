import { createTheme, Theme } from '@mui/material';
import { ThemeProvider as MaterialThemeProvider } from '@mui/material/styles';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import WebFont from 'webfontloader';
import {
  IRThemePalette,
  selectThemePaletteContext,
  setThemePaletteContext,
} from '../store/colorPalleteSlice';
import { IRootState } from '../store/index';
import {
  IRTheme,
  selectThemeContext,
  setThemeContext,
} from '../store/themeContextSlice';
import themes, { ThemeContextType } from '../theme';
import { setLocalStorage } from '../utils/localStorageService';

export const ThemeContext = React.createContext<ThemeContextType | null>(null);

export const ThemeProvider: React.FC<React.ReactNode> | any = ({
  children,
}: any) => {
  const [theme, setTheme] = React.useState<Theme>(createTheme(themes.default));
  const rootState = useSelector((state: IRootState) => state);
  const themeData = selectThemeContext(rootState);
  const themePaletteData = selectThemePaletteContext(rootState);
  const newUrl = window.location.href.replace('#', '');
  var url = new URL(newUrl);
  var projectId = url.searchParams.get('projectId');
  const dispatch = useDispatch();
  const changeTheme = (theme: any) => {
    setTheme(createTheme(theme));
  };
  const [posts, setPosts] = React.useState({});
  const themeFunc = (projectId: any) => {
    if (themeData && themeData.length > 0) {
    } else {
      const apicall = new Promise((resolve, reject) => {
        const someThunkCall = new Promise((resolve, reject) => {
          // resolve(dispatch(getTheme(projectId)));
        }).then((res: any) => {
          if (res && res.payload && res.payload.data) {
            const themeObject: IRTheme = {
              project_id: '123',
              font: res.payload.data,
            };
            dispatch(setThemeContext(themeObject));
            setLocalStorage('fontData', themeObject);
          }
        });
      });
    }
  };

  const colorthemeFunc = (projectId: any) => {
    if (themePaletteData && themePaletteData.length > 0) {
    } else {
      const apicall = new Promise((resolve, reject) => {
        const someThunkCall = new Promise((resolve, reject) => {
          // resolve(dispatch(getThemePalette(projectId)));
        }).then((res: any) => {
          if (res && res.payload && res.payload.data) {
            const themeObject: IRThemePalette = {
              project_id: '123',
              color: res.payload.data,
            };
            dispatch(setThemePaletteContext(themeObject));
            setLocalStorage('colorData', themeObject);
          }
        });
      });
    }
  };

  React.useEffect(() => {
    const newUrl = window.location.href.replace('#', '');
    const projectId = newUrl?.split('&')?.shift?.()?.split('/')[5];
    themeFunc(projectId);
    colorthemeFunc(projectId);
  }, []);

  React.useEffect(() => {
    const WebFontConfig = {
      custom: {
        families: themeData[0]?.font?.result.families,
        urls: themeData[0]?.font?.result.urls,
      },
    };
    WebFont.load(WebFontConfig);
    themes.default.typography = {
      ...themes.default.typography,
      ...themeData[0]?.font?.result.fonts,
    };
    setTheme(createTheme(themes.default));
  }, [themeData]);

  React.useEffect(() => {
    // setPosts(themePaletteData[0]?.color.result);
    themes.default.palette = {
      ...themes.default.palette,
      ...themePaletteData[0]?.color?.result?.colors,
      primary: {
        ...themePaletteData[0]?.color?.result?.colors?.primary,
        main:
          themePaletteData[0]?.color?.result?.colors?.primary?.pri300Main ||
          '#328DF6',
      },
      secondary: {
        ...themePaletteData[0]?.color?.result?.colors?.secondary,
        main:
          themePaletteData[0]?.color?.result?.colors?.secondary?.sec300Main ||
          '#F94948',
      },

      // systemColor1: {
      //   sys100: '#FADCDA',
      //   sys200: '#FD948C',
      //   sys300Main: '#F94948',
      //   sys400: '#C73733',
      //   sys500: '#733430',
      //   sys600: '#4D2725',
      // },
      // systemColor2: {
      //   sys100: '#F9E8A4',
      //   sys200: '#F6DA6B',
      //   sys300Main: '#F0C20B',
      //   sys400: '#D9A808',
      //   sys500: '#A67503',
      //   sys600: '#654506',
      // },
      // systemColor3: {
      //   sys100: '#D9E6DC',
      //   sys200: '#9AC3A4',
      //   sys300Main: '#439D62',
      //   sys400: '#198A48',
      //   sys500: '#285837',
      //   sys600: '#1F3625',
      // },
      // systemColor4: {
      //   sys100: '#EEDEF1',
      //   sys200: '#DC97E7',
      //   sys300Main: '#DA38FA',
      //   sys400: '#A52FBC',
      //   sys500: '#5B3163',
      //   sys600: '#412945',
      // },
      // systemColor5: {
      //   sys100: '#E6E4F1',
      //   sys200: '#B4AAE4',
      //   sys300Main: '#8962F3',
      //   sys400: '#6D48CC',
      //   sys500: '#483B6D',
      //   sys600: '#342D48',
      // },
      // systemColor6: {
      //   sys100: '#FBE3B1',
      //   sys200: '#EFC45E',
      //   sys300Main: '#EFB02E',
      //   sys400: '#D39822',
      //   sys500: '#A06B09',
      //   sys600: '#614105',
      // },
      // neutral: {
      //   neu100: '#E8E9EE',
      //   neu200: '#BBC2CC',
      //   neu300Main: '#8591A2',
      //   neu400: '#69778A',
      //   neu500: '#4B5A6E',
      //   neu600: '#313E4F',
      // },
      // text: {
      //   tex100: '#E9EAEB',
      //   tex200: '#BFC2C4',
      //   tex300Main: '#8C9194',
      //   tex400: '#71777B',
      //   tex500: '#535A5F',
      //   tex600: '#363E45',
      // },
      // background: {
      //   bacwhite: '#FFFFFF',
      //   bacmain: '#F2F4F8',
      //   bacopGrey: '#313E4F',
      //   bacopWhite: '#FFFFFF',
      // },
      ...{
        chart: [
          '#ff6083',
          '#8b5cf6',
          '#fbbf24',
          '#84cc16',
          '#35a2ec',
          '#be123c',
          '#86efac',
          '#4bc1bd',
          '#64748b',
          '#a5f3fc',
          '#6b21a8',
          '#fecdd3',
          '#f87171',
          '#d9f99d',
          '#f0abfc',
          '#7f1d1d',
          '#c4b5fd',
        ],
      },
    };

    setTheme(createTheme(themes.default));
  }, [themePaletteData]);

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      <MaterialThemeProvider theme={theme}>{children}</MaterialThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useAppTheme = () => {
  const settingContext = React.useContext(ThemeContext);

  return [settingContext?.theme, settingContext?.changeTheme];
};

export default ThemeProvider;
