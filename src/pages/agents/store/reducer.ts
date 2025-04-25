import { AgentItem } from "@/interface/data/agent.interface";
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { getGlobalState } from '@/utils/getGloabal';
import { NoteFormData } from "@/components/dialogs/note-form";

export interface CreateAgent {
  created_account: AgentItem
}

export interface RemoveAgent {
  agent_id: string
}

export interface NoteAgent {
  noted_agent: NoteFormData
}

export interface AgentState {
  agents: AgentItem[];
}

const initialState: AgentState = {
  ...getGlobalState(),
  agents: [],
};

const agentAccountSlice = createSlice({
  name: 'agent',
  initialState,
  reducers: {
    setAgent(state, action: PayloadAction<Partial<AgentState>>) {
      Object.assign(state, action.payload);
    },
    createAgent(state, action: PayloadAction<CreateAgent>) {
      state.agents.unshift(action.payload.created_account);
    },
    removeAgent(state, action: PayloadAction<RemoveAgent>) {
      const index = state.agents.findIndex(agent => agent._id == action.payload.agent_id)
      if (index !== -1)
        state.agents = state.agents.filter((_, i) => i !== index);
    },
    noteAgent(state, action: PayloadAction<NoteAgent>) {
      const index = state.agents.findIndex(agent => agent._id == action.payload.noted_agent.id);
      state.agents[index].notes = action.payload.noted_agent.notes;
    }
  },
});

export const { setAgent, createAgent, noteAgent, removeAgent } = agentAccountSlice.actions;

export default agentAccountSlice.reducer;
