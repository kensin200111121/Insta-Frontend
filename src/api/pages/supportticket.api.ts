import type { SupportTicketItem, SetTicketStatusRequest } from '@/interface/data/supportticket.interface';

import { request } from '../request';
import { API_BASE } from '@/config/path';
import { NoteFormData } from '@/components/dialogs/note-form';

export const apiGetSupportTickets = () => request<SupportTicketItem[]>('get', API_BASE + 'ticket');
export const apiCreateNewTicket = (data : SupportTicketItem) => request<SupportTicketItem>('post', API_BASE + 'ticket/create', data);
export const apiSetTicketStatus = (data : SetTicketStatusRequest) => request<SupportTicketItem>('post', API_BASE + 'ticket/setstatus', data);
export const apiNoteTicket = (data: NoteFormData) => request<NoteFormData>('post', `${API_BASE}ticket/note`, data);
