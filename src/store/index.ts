import { EmsDataType } from '../zod-scheme/ems';
import { HeaderState, eqStatusState , dataHubShemaState} from './interface';

import { configureStore } from '@reduxjs/toolkit';
import header  from './header';
import eqStatus from './eq-status';
import ems from './ems';
import dataHubShema from './dataHubShema';

export default configureStore({
  reducer: {
    header: header,
    eqStatus: eqStatus,
    ems: ems,
    dataHubShema: dataHubShema,
  },
});

export interface AppState {
  header: HeaderState;
  eqStatus: eqStatusState;
  ems: {
    emsData: EmsDataType;
  };
  dataHubShema: dataHubShemaState
}