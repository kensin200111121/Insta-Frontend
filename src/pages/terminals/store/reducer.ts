import { TerminalItem } from "@/interface/data/terminal.interface";
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { getGlobalState } from '@/utils/getGloabal';
import { NoteFormData } from "@/components/dialogs/note-form";

export interface CreateTerminal {
  created_terminal: TerminalItem
}

export interface UpdateTerminal {
  updated_terminal: TerminalItem
}

export interface NoteTerminal {
  noted_terminal: NoteFormData
}

export interface TerminalState {
  terminals: TerminalItem[];
}

const initialState: TerminalState = {
  ...getGlobalState(),
  terminals: [],
};

const terminalSlice = createSlice({
  name: 'terminal',
  initialState,
  reducers: {
    setTerminals(state, action: PayloadAction<Partial<TerminalState>>) {
      Object.assign(state, action.payload);
    },
    createTerminal(state, action: PayloadAction<CreateTerminal>) {
      state.terminals.unshift(action.payload.created_terminal);
    },
    updateTerminal(state, action: PayloadAction<UpdateTerminal>) {
      const index = state.terminals.findIndex(terminal => terminal._id == action.payload.updated_terminal._id);
      state.terminals.splice(index, 1, action.payload.updated_terminal);
    },
    noteTerminal(state, action: PayloadAction<NoteTerminal>) {
      const index = state.terminals.findIndex(terminal => terminal._id == action.payload.noted_terminal.id);
      state.terminals[index].note = action.payload.noted_terminal.notes;
    }
  },
});

export const { setTerminals, createTerminal, noteTerminal, updateTerminal } = terminalSlice.actions;

export default terminalSlice.reducer;
