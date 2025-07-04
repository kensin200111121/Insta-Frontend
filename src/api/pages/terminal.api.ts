import type { SetTerminalStatusRequest, TerminalItem, TerminalUpdateRequest } from '@/interface/data/terminal.interface';
import { NoteFormData } from '@/components/dialogs/note-form';
import { TerminalFormData } from '@/components/dialogs/terminal-form';

import { request } from '../request';
import { API_BASE } from '@/config/path';

export const apiGetTerminals = (store: string|undefined) => request<TerminalItem[]>('post', `${API_BASE}terminal`, {store});
export const apiCreateTerminal = (data: TerminalFormData) => request<TerminalItem>('post', `${API_BASE}terminal/create`, data);
export const apiUpdateTerminal = (data: TerminalUpdateRequest) => request<TerminalItem>('post', `${API_BASE}terminal/edit`, data);
export const apiNoteTerminal = (data: NoteFormData) => request<NoteFormData>('post', `${API_BASE}terminal/note`, data);
export const apiSetTerminalStatus = (data : SetTerminalStatusRequest) => 
  request<TerminalItem>('post', API_BASE + 'terminal/setstatus', data);
