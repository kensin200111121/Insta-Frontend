import type { AgentItem } from '@/interface/data/agent.interface';

import { request } from '../request';
import { AgentFormData } from '@/components/dialogs/agent-form';
import { NoteFormData } from '@/components/dialogs/note-form';
import { API_BASE } from '@/config/path';

export const apiGetAgents = () => request<AgentItem[]>('get', `${API_BASE}agent`);
export const apiCreateAgent = (data: AgentFormData) => request<AgentItem>('post', `${API_BASE}agent/create`, data);
export const apiEditAgent = (data: AgentFormData) => request<AgentItem>('post', `${API_BASE}agent/edit`, data);
export const apiRemoveAgent = (_id: string) => request<string>('post', `${API_BASE}agent/remove`, {agent_id: _id});
export const apiNoteAgent = (data: NoteFormData) => request<NoteFormData>('post', `${API_BASE}agent/notes`, data);
export const apiGetAgentById = (agentId: string) => {
  return request<any>('get', `${API_BASE}agent/getById?agentId=${agentId}`);
};