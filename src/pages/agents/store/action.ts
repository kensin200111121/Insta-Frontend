import { apiCreateAgent, apiGetAgents, apiRemoveAgent, apiNoteAgent } from '@/api/pages/agent.api';
import { createAgent, setAgent, removeAgent, noteAgent } from './reducer';
import { createAsyncAction } from '@/stores/utils';
import { AgentFormData } from '@/components/dialogs/agent-form';
import { NoteFormData } from '@/components/dialogs/note-form';

// typed wrapper async thunk function demo, no extra feature, just for powerful typings
export const GetAgentAsync = createAsyncAction<void, boolean>(() => {
  return async dispatch => {
    const { result, status } = await apiGetAgents();

    if (status) {
      dispatch(
        setAgent({
          agents: result
        }),
      );

      return true;
    }

    return false;
  };
});

export const CreateAgentAsync = createAsyncAction<AgentFormData, boolean>((data) => {
  return async dispatch => {
    const { result, status } = await apiCreateAgent(data);

    if (status) {
      dispatch(
        createAgent({
          created_account: result
        }),
      );

      return true;
    }

    return false;
  };
});

export const NoteAgentAsync = createAsyncAction<NoteFormData, boolean>((data) => {
  return async dispatch => {
    const { result, status } = await apiNoteAgent(data);
    if (status) {
      dispatch(
        noteAgent({
          noted_agent: result
        }),
      );

      return true;
    }

    return false;
  };
});

export const GetAgentsAsync = createAsyncAction<void, boolean>(() => {
  return async dispatch => {
    const { result, status } = await apiGetAgents();

    if (status) {
      dispatch(
        setAgent({
          agents: result
        }),
      );

      return true;
    }

    return false;
  };
});

export const RemoveAgentAsync = createAsyncAction<string, boolean>((_id) => {
  return async dispatch => {
    const { result, status } = await apiRemoveAgent(_id);

    if (status) {
      dispatch(
        removeAgent({
          agent_id: result
        }),
      );

      return true;
    }

    return false;
  };
});
