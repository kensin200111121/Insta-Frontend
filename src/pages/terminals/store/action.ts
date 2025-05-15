import { apiGetTerminals, apiCreateTerminal, apiNoteTerminal, apiUpdateTerminal, apiSetTerminalStatus } from '@/api/pages/terminal.api';
import { setTerminals, noteTerminal, createTerminal, updateTerminal, setTerminalStatus } from './reducer';
import { createAsyncAction } from '@/stores/utils';
import { NoteFormData } from '@/components/dialogs/note-form';
import { TerminalFormData } from '@/components/dialogs/terminal-form';
import { SetTerminalStatusRequest, TerminalUpdateRequest } from '@/interface/data/terminal.interface';

// typed wrapper async thunk function demo, no extra feature, just for powerful typings
export const GetTerminalsAsync = createAsyncAction<void, boolean>(() => {
  return async dispatch => {
    const { result, status } = await apiGetTerminals(undefined);

    if (status) {
      dispatch(
        setTerminals({
          terminals: result
        }),
      );

      return true;
    }

    return false;
  };
});

export const CreateTerminalAsync = createAsyncAction<TerminalFormData, boolean>((data) => {
  return async dispatch => {
    const { result, status } = await apiCreateTerminal(data);

    if (status) {
      dispatch(
        createTerminal({
          created_terminal: result
        }),
      );

      return true;
    }

    return false;
  };
});

export const UpdateTerminalAsync = createAsyncAction<TerminalUpdateRequest, boolean>((data) => {
  return async dispatch => {
    const { result, status } = await apiUpdateTerminal(data);

    if (status) {
      dispatch(
        updateTerminal({
          updated_terminal: result
        }),
      );

      return true;
    }

    return false;
  };
});

export const NoteTerminalAsync = createAsyncAction<NoteFormData, boolean>((data) => {
  return async dispatch => {
    const { result, status } = await apiNoteTerminal(data);

    if (status) {
      dispatch(
        noteTerminal({
          noted_terminal: result
        }),
      );

      return true;
    }

    return false;
  };
});

export const SetTerminalStatusAsync = createAsyncAction<SetTerminalStatusRequest, boolean>(data => {
  return async dispatch => {
    const { result, status } = await apiSetTerminalStatus(data);

    if (status) {
      dispatch(
        setTerminalStatus({
          setTerminal: result,
        }),
      );

      return true;
    }

    return false;
  };
});
