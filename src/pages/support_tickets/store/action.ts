import type { TicketFormData } from '@/components/dialogs/ticket-form';
import type { SetTicketStatusRequest, SupportTicketItem } from '@/interface/data/supportticket.interface';

import { apiCreateNewTicket, apiGetSupportTickets, apiNoteTicket, apiSetTicketStatus } from '@/api/pages/supportticket.api';
import { createAsyncAction } from '@/stores/utils';

import { addSupportTickets, noteSupportTicket, setSupportTickets, setSupportTicketStatus } from './reducer';
import { NoteFormData } from '@/components/dialogs/note-form';

// typed wrapper async thunk function demo, no extra feature, just for powerful typings
export const GetSupportTicketsAsync = createAsyncAction<void, boolean>(() => {
  return async dispatch => {
    const { result, status } = await apiGetSupportTickets();

    if (status) {
      dispatch(
        setSupportTickets({
          supporttickets: result,
        }),
      );

      return true;
    }

    return false;
  };
});

export const CreateNewTicketAsync = createAsyncAction<TicketFormData, boolean>(data => {
  const post_data: SupportTicketItem = {
    created_at: new Date(),
    phone: '000 000 000',
    amount: 100,
    transaction_id: data.transaction_id,
    description: data.description,
    status: data.status,
    customer_name: '',
  };

  return async dispatch => {
    const { result, status } = await apiCreateNewTicket(post_data);

    if (status) {
      dispatch(
        addSupportTickets({
          newTicket: result,
        }),
      );

      return true;
    }

    return false;
  };
});

export const SetTicketStatusAsync = createAsyncAction<SetTicketStatusRequest, boolean>(data => {
  return async dispatch => {
    const { result, status } = await apiSetTicketStatus(data);

    if (status) {
      dispatch(
        setSupportTicketStatus({
          setTicket: result,
        }),
      );

      return true;
    }

    return false;
  };
});

export const NoteTicketAsync = createAsyncAction<NoteFormData, boolean>((data) => {
  return async dispatch => {
    const { result, status } = await apiNoteTicket(data);

    if (status) {
      dispatch(
        noteSupportTicket({
          noted_ticket: result
        }),
      );

      return true;
    }

    return false;
  };
});
