import { IconComponent } from '@gessa/component-library';
import { Box, Stack } from '@mui/material';
import { useTheme } from '@mui/system';
import { IRootState } from 'apps/react-host/src/store';
import themes from 'apps/react-host/src/theme';
import generateRandomString from 'apps/react-host/src/utils/randomString';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import {
  selectAllSortedMenuById,
  setActiveMenuName,
  setPageId,
} from './store/sortedMenuSlice';

export interface ISideNav {
  setPage: any;
  page: any;
  menuList: any;
  selectedMenuName: string;
  setSelectedMenuName: (data: any) => any;
}

const SideNav = (props: ISideNav) => {
  const theme = useTheme();
  const themesChart = themes.default;
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const rootState = useSelector((state: IRootState) => state);
  const [appMenu, setAppMenu]: any = useState<Array<any>>([]);
  const [isClicked, setClicked]: any = useState(false);
  const sortedMenus = selectAllSortedMenuById(rootState);
  const [selectedMenu, setSelectedMenu] = useState<string>(
    params.menuId || props.selectedMenuName
  );


  useEffect(() => {
    if (sortedMenus && sortedMenus.length > 0) {
      setAppMenu(sortedMenus[0].data);
    }
  }, [sortedMenus]);

  useEffect(() => {
    if (params && params.menuId) {
      setSelectedMenu(params.menuId);
      dispatch(setActiveMenuName(params.menuId));
    }
  }, [params]);

  return (
    <Box
      sx={{
        width: '84px',
        height: '93vh',
        justifyContent: 'center',
        display: 'flex',
        overflowY: 'auto',
        background: themesChart?.palette?.background?.bacopWhite,
        borderRight: `1px solid ${themesChart?.palette?.neutral?.neu100}`,
      }}
    >
      <Stack direction="column">
        {/* {appMenu &&
          appMenu.length > 0 &&
          appMenu.map((item: any, index: any) => {
            return ( */}
        <div
          key={generateRandomString()}
          style={{
            minWidth: '50px',
            minHeight: '50px',

            width: '50px',
            height: '50px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '10px',
            borderRadius: '4px',
            background: 'green',
            color: theme?.palette?.primary?.main,
          }}
          onClick={() => {
            console.log('clicked');
            props.setPage(!props.page);
          }}
        >
          <IconComponent
            name={'Menu-Info'}
            size={30}
            label={'Menu-Info'}
            color={'red'}
          />
        </div>
        <div
          key={generateRandomString()}
          style={{
            minWidth: '50px',
            minHeight: '50px',

            width: '50px',
            height: '50px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '10px',
            borderRadius: '4px',
            background: 'red',
            color: theme?.palette?.primary?.main,
          }}
          onClick={() => {
            console.log('clicked');
            props.setPage(!props.page);
          }}
        >
          <IconComponent
            name={'Menu-Info'}
            size={30}
            label={'Menu-Info'}
            color={'blue'}
          />
        </div>
        {/* </Link>
           );
           })} */}
      </Stack>
    </Box>
  );
};

export default SideNav;
