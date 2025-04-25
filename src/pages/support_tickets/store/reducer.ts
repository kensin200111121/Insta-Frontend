import { SupportTicketItem } from "@/interface/data/supportticket.interface";
import type { PayloadAction } from '@reduxjs/toolkit';

import { createSlice } from '@reduxjs/toolkit';

import { getGlobalState } from '@/utils/getGloabal';
import { NoteFormData } from "@/components/dialogs/note-form";

export interface SupportTicketState {
  supporttickets: SupportTicketItem[];
}

export interface AddSupportTicket {
  newTicket: SupportTicketItem;
}

export interface SetSupportTicket {
  setTicket: SupportTicketItem;
}

export interface NoteSupportTicket {
  noted_ticket: NoteFormData
}

const initialState: SupportTicketState = {
  ...getGlobalState(),
  supporttickets: [],
};

const supportTicketSlice = createSlice({
  name: 'supportticket',
  initialState,
  reducers: {
    setSupportTickets(state, action: PayloadAction<Partial<SupportTicketState>>) {
      Object.assign(state, action.payload);
    },
    addSupportTickets(state, action: PayloadAction<AddSupportTicket>) {
      state.supporttickets.unshift(action.payload.newTicket);
    },
    setSupportTicketStatus(state, action: PayloadAction<SetSupportTicket>) {
      const index = state.supporttickets.findIndex(t => t._id == action.payload.setTicket._id)
      if(index >= 0){
        state.supporttickets[index] = action.payload.setTicket;
      }
    },
    noteSupportTicket(state, action: PayloadAction<NoteSupportTicket>) {
      const index = state.supporttickets.findIndex(ticket => ticket._id == action.payload.noted_ticket.id);
      state.supporttickets[index].note = action.payload.noted_ticket.notes;
    }
  },
});

export const { setSupportTickets, addSupportTickets, setSupportTicketStatus, noteSupportTicket } = supportTicketSlice.actions;

export default supportTicketSlice.reducer;
