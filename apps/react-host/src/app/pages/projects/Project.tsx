import React, { useMemo, lazy, useEffect, useState, memo } from 'react';
import { Box, Stack } from '@mui/material';
// import Header, { HeaderComponent } from './component/Header/Header';
import { HeaderComponent, IconComponent } from '@gessa/component-library';
import {
  Link,
  Route,
  Routes,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';
// import { ITheme } from '../../../theme/index';
// import Logo from '../../../assets/logo.svg';
import ChildMenuContext from './component/ChildMenusContext';
import {
  getAppMenu,
  selectAllMenu,
} from './store/appMenuSlice';
import { useAppDispatch } from '../../../context/redux';
import { useLocation } from 'react-router-dom';
import AppLayout from '../../layouts/AppLayout';
import {
  clearLocalStorage,
  getLocalStorage,
  setLocalStorage,
} from 'apps/react-host/src/utils/localStorageService';
import { useDispatch, useSelector } from 'react-redux';
import SideNav from './SideNav';
import {
  selectActiveMenuName,
  selectAllSortedMenuById,
} from './store/sortedMenuSlice';
import { IRootState } from 'apps/react-host/src/store';
import keycloak from 'apps/react-host/src/keycloak/keycloak';
import themes from 'apps/react-host/src/theme';
import AppMain from '../../layouts/AppMain/AppMain';

export function Project() {
  const params: any = useParams();
  const theme = themes.default;
  const rootState = useSelector((state: IRootState) => state);
  const [page,setPage] = useState(false)

  const [widgetData, setWidgetData] = useState([]);
  const sortedMenus = selectAllSortedMenuById(rootState) || [];

  const [appMenu, setAppMenu]: any = useState();
  const [isClicked, setClicked]: any = useState(false);
  const [selectedMenu, setSelectedMenu] = useState<string>(params.menuId || '');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const _userInfo = getLocalStorage('userInfo');
  const [sortedData, setSortedData] = useState<any>([]);
  const _selectedMenuName = selectActiveMenuName(rootState);
  useEffect(() => {
    if (sortedMenus && sortedMenus.length > 0) {
      setSortedData(sortedMenus[0].data);
    }
  }, [sortedMenus]);

  useEffect(() => {
    if (params && params.projectId) {
      const userInfo = {
        ..._userInfo,
        ...{ projectId: params.projectId },
      };
      setLocalStorage('userInfo', userInfo);
    }
  }, [params]);
  const location = useLocation();
  const headerComponentProps = {
    logoImagePath:
      'https://gessa-fileservice.s3.eu-central-1.amazonaws.com/Logo.svg',
    searchData: {
      label: 'Search',
      placeholder: 'Search',
      value: '',
    },
    headerBackgroundColor: themes.default.palette?.background?.bacopWhite,

    notificationData: {
      name: 'Notification_24dp',
      size: 25,
      color: themes.default.palette?.neutral?.neu400,
      label: 'notification',
    },
    chartProps: {
      background_color: themes.default.palette?.background?.bacopWhite,
      border_color: themes.default.palette?.neutral?.neu100,
    },

    userData: {
      text: _userInfo.userName,
      email: _userInfo.email || '',
    },
  };

  useEffect(() => {
    if (sortedMenus && sortedMenus.length > 0) {
    } else {
      const menuParams = {
        page: 0,
        size: 100,
      };
      dispatch(getAppMenu(menuParams))
        .then((res: any) => {
          if (res && res.payload && res.payload.data) {
            const sortedArr = JSON.parse(JSON.stringify(res.payload.data));
            if (sortedArr && sortedArr[0].data) {
              if (sortedArr[0].child && sortedArr[0].child.length > 0) {
                navigate(
                  `/project/${params.projectId}/${params.menuId || sortedArr[0].data.name
                  }/${params.subMenuId || sortedArr[0].child[0].name}`
                );
              } else {
                navigate(
                  `/project/${params.projectId}/${params.menuId || sortedArr[0].data.name
                  }`
                );
              }
            }
          }
          // setSelectedMenu('page2');
        })
        .catch((reason: any) => {
          //  Todod :
        });
    }
  }, []);

  const urlParams = useParams();
  const menuName: any = useMemo(() => {
    let menuChild: any[] = [];
    const menu = urlParams['*']?.split('/')?.[1];
    // console.log('aaa', params);
    if (selectedMenu) {
      appMenu?.forEach((item: any, index: any) => {
        if (
          item.data.name === selectedMenu ||
          item.data.name === params.menuId
        ) {
          menuChild = item.child;
        }
      });
    }
    return { menu, menuChild };
  }, [appMenu, urlParams, params]);

  useEffect(() => { }, [appMenu]);

  const logoutUser = (data?: any): any => {
    clearLocalStorage();
    keycloak.logout();
  };

  useEffect(() => {
    setInterval(() => {
      try {
        const logoutSession = getLocalStorage('logout');
        if (logoutSession && logoutSession === true) {


          setLocalStorage('logout', false);
          handleKeycloakLogout();
        }
      } catch (err: any) { }
    }, 200);
  }, []);
  const handleKeycloakLogout = () => {
    navigate(`/project/${params.projectId}`);
    clearLocalStorage();

    keycloak.logout().then(() => { });
  };

  return (
    <Box
      sx={{
        background: theme.palette?.background?.bacopWhite,
        overflow: 'hidden !important',
      }}
    >
      {/* <div>hi hello</div> */}
      <HeaderComponent
        logoImagePath={headerComponentProps.logoImagePath}
        searchData={headerComponentProps.searchData}
        notificationData={headerComponentProps.notificationData}
        userData={headerComponentProps.userData}
        headerBackgroundColor={headerComponentProps.headerBackgroundColor}
        chartProps={headerComponentProps.chartProps}
        logoutClickAction={(e: any) => {
          logoutUser(e);
        }}
      />
      {/* <Header {...headerComponentProps} /> */}
      <Stack direction="row">
        <Box
          sx={{
            width: '84px',
            height: '93vh',
            justifyContent: 'center',
            display: 'flex',
            background: theme.palette?.background?.bacopWhite,
            borderRight: `1px solid ${theme.palette?.neutral?.neu100}`,
          }}
        >
          <Stack direction="column">
            <SideNav
              page={page}
              setPage={setPage}
              menuList={sortedData}
              selectedMenuName={selectedMenu}
              setSelectedMenuName={(data: any) => {
                setSelectedMenu(data);
              }}
            />
          </Stack>
        </Box>
        {/* <Box
          sx={{
            flexGrow: 1,
            overflow: 'hidden',
            color: 'orange',
          }}
        >
          <AppLayout />
        </Box> */}
        {page && <AppMain pageId={'asa'} />}
      </Stack>
    </Box>
  );
}

export default memo(Project);
