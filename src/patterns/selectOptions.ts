export interface SelectOption<T extends string | number> {
  label: string;
  value: T;
}

export const batchSortOptions: SelectOption<number>[] = [
  {
    label: 'All',
    value: -1,
  },
  {
    label: 'Open',
    value: 0,
  },
  {
    label: 'Batched',
    value: 1,
  },
];

export const supportTicketStatusOptions: SelectOption<number>[] = [
  {
    label: 'Solved',
    value: 1,
  },
  {
    label: 'Not Solved',
    value: 0,
  },
];

export const supportTicketStatusColors: Record<string, string> = {
  '0': 'danger',
  '1': 'success'
}

export const fundingReportStatusOptions: SelectOption<number>[] = [
  {
    label: 'Active',
    value: 1,
  },
  {
    label: 'Disabled',
    value: 0,
  },
];

export const fundingReportStatusList = [
  {
    label: 'Disabled',
    color: 'danger',
  },
  {
    label: 'Active',
    color: 'success',
  },
];

export const transactionStatusList = [
  {
    label: 'Declined',
    color: 'danger',
  },
  {
    label: 'Approved',
    color: 'success',
  },
];

export const transactionStatusOptions: SelectOption<number>[] = [
  {
    label: 'All',
    value: -1,
  },
  {
    label: 'Approved',
    value: 1,
  },
  {
    label: 'Declined',
    value: 0,
  },
];

export const commissionStatusOptions: SelectOption<number>[] = [
  {
    label: 'OPEN',
    value: 0,
  },
  {
    label: 'FUNDED',
    value: 1,
  },
  {
    label: 'HELD',
    value: 2,
  }
];

export const cardTypeList: Record<string, any> = {
  Debit: {
    label: 'DB',
    color: 'blue',
  },
  Credit: {
    label: 'CR',
    color: 'gold',
  }
};

export const transactionTypeColors : Record<string, string> = {
  '0': 'gold',
  '1': 'danger',
  '2': 'success',
};

export const transactionTypeOptions : SelectOption<number>[] = [
  {
    value: -1,
    label: 'All'
  },
  {
    value: 0,
    label: 'TX'
  },
  {
    value: 1,
    label: 'RE'
  },
  {
    value: 2,
    label: 'CB'
  }
];

export const transactionTypeSelectOptions : SelectOption<number>[] = [
  {
    value: -1,
    label: 'All'
  },
  {
    value: 0,
    label: 'Transactions'
  },
  {
    value: 1,
    label: 'Refunds'
  },
  {
    value: 2,
    label: 'Chargebacks'
  }
];

export const chargebackStatusColors : Record<string, string> = {
  pending: 'default',
  lost: 'danger',
  won: 'success',
};

export const commissionStatusColors : Record<number, string> = {
  0: 'default',
  1: 'danger',
  2: 'success',
};

export const chargebackStatusOptions : SelectOption<string>[] = [
  {
    value: 'pending',
    label: 'Pending Evidence'
  },
  {
    value: 'won',
    label: 'Won'
  },
  {
    value: 'lost',
    label: 'Lost'
  }
];

export const batchStatusColors : Record<string, string> = {
  '1': 'danger',
  '2': 'gold',
  '3': 'info',
  '4': 'success',
  '5': 'blue'
};

export const batchStatusOptions : SelectOption<number>[] = [
  {
    value: 1,
    label: 'BATCHED'
  },
  {
    value: 2,
    label: 'FUNDED'
  },
  {
    value: 3,
    label: 'HELD'
  },
  {
    value: 4,
    label: 'ACH REJECTED'
  }
];

export const terminalStatusColors : Record<string, string> = {
  '0': 'danger',
  '1': 'success'
};

export const terminalStatusOptions : SelectOption<number>[] = [
  {
    value: 0,
    label: 'Disabled'
  },
  {
    value: 1,
    label: 'LIVE'
  }
];

export const allStoresItem = {
  label: 'All',
  value: 'all',
};

export const selectCurrencyOptions: SelectOption<string>[] = [
  {
    label: 'USDT',
    value: 'USDT',
  },
];

export const selectReportTypeOptions: SelectOption<string>[] = [
  {
    label: 'Report Type',
    value: 'None',
  },
  {
    label: 'Email Only',
    value: 'EmailOnly',
  },
  {
    label: 'Text Only',
    value: 'TextOnly',
  },
  {
    label: 'Both',
    value: 'Both',
  },
];

export const selectStateOptions: SelectOption<string>[] = [
    { value: "", label: "State" },
    { value: "Alabama", label: "Alabama" },
    { value: "Alaska", label: "Alaska" },
    { value: "Arizona", label: "Arizona" },
    { value: "Arkansas", label: "Arkansas" },
    { value: "California", label: "California" },
    { value: "Colorado", label: "Colorado" },
    { value: "Connecticut", label: "Connecticut" },
    { value: "Delaware", label: "Delaware" },
    { value: "Florida", label: "Florida" },
    { value: "Georgia", label: "Georgia" },
    { value: "Hawaii", label: "Hawaii" },
    { value: "Idaho", label: "Idaho" },
    { value: "Illinois", label: "Illinois" },
    { value: "Indiana", label: "Indiana" },
    { value: "Iowa", label: "Iowa" },
    { value: "Kansas", label: "Kansas" },
    { value: "Kentucky", label: "Kentucky" },
    { value: "Louisiana", label: "Louisiana" },
    { value: "Maine", label: "Maine" },
    { value: "Maryland", label: "Maryland" },
    { value: "Massachusetts", label: "Massachusetts" },
    { value: "Michigan", label: "Michigan" },
    { value: "Minnesota", label: "Minnesota" },
    { value: "Mississippi", label: "Mississippi" },
    { value: "Missouri", label: "Missouri" },
    { value: "Montana", label: "Montana" },
    { value: "Nebraska", label: "Nebraska" },
    { value: "Nevada", label: "Nevada" },
    { value: "New Hampshire", label: "New Hampshire" },
    { value: "New Jersey", label: "New Jersey" },
    { value: "New Mexico", label: "New Mexico" },
    { value: "New York", label: "New York" },
    { value: "North Carolina", label: "North Carolina" },
    { value: "North Dakota", label: "North Dakota" },
    { value: "Ohio", label: "Ohio" },
    { value: "Oklahoma", label: "Oklahoma" },
    { value: "Oregon", label: "Oregon" },
    { value: "Pennsylvania", label: "Pennsylvania" },
    { value: "Rhode Island", label: "Rhode Island" },
    { value: "South Carolina", label: "South Carolina" },
    { value: "South Dakota", label: "South Dakota" },
    { value: "Tennessee", label: "Tennessee" },
    { value: "Texas", label: "Texas" },
    { value: "Utah", label: "Utah" },
    { value: "Vermont", label: "Vermont" },
    { value: "Virginia", label: "Virginia" },
    { value: "Washington", label: "Washington" },
    { value: "Washington DC", label: "Washington DC" },
    { value: "West Virginia", label: "West Virginia" },
    { value: "Wisconsin", label: "Wisconsin" },
    { value: "Wyoming", label: "Wyoming" }
];

export const selectTerminalDescriptionOptions: SelectOption<string>[] = [
  {
    label: 'New',
    value: 'New',
  },
  {
    label: 'Reprogrammed',
    value: 'Reprogrammed',
  },
];

export const selectTerminalModels: SelectOption<string>[] = [
  {
    label: 'Q2',
    value: 'Q2',
  },
  {
    label: 'Q4',
    value: 'Q4',
  },
  {
    label: 'P1',
    value: 'P1',
  },
  {
    label: 'P3',
    value: 'P3',
  },
  {
    label: 'P8',
    value: 'P8',
  }
];

export const selectReporterTypeOptions: SelectOption<string>[] = [
  {
    label: 'Email Only',
    value: 'EmailOnly',
  },
  {
    label: 'Text Only',
    value: 'TextOnly',
  },
  {
    label: 'Both',
    value: 'Both',
  },
];

