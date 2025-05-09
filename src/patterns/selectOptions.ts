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
  { label: 'State', value: '' },
  { label: 'AL', value: 'Alabama' },
  { label: 'AK', value: 'Alaska' },
  { label: 'AZ', value: 'Arizona' },
  { label: 'AR', value: 'Arkansas' },
  { label: 'CA', value: 'California' },
  { label: 'CO', value: 'Colorado' },
  { label: 'CT', value: 'Connecticut' },
  { label: 'DE', value: 'Delaware' },
  { label: 'FL', value: 'Florida' },
  { label: 'GA', value: 'Georgia' },
  { label: 'HI', value: 'Hawaii' },
  { label: 'ID', value: 'Idaho' },
  { label: 'IL', value: 'Illinois' },
  { label: 'IN', value: 'Indiana' },
  { label: 'IA', value: 'Iowa' },
  { label: 'KS', value: 'Kansas' },
  { label: 'KY', value: 'Kentucky' },
  { label: 'LA', value: 'Louisiana' },
  { label: 'ME', value: 'Maine' },
  { label: 'MD', value: 'Maryland' },
  { label: 'MA', value: 'Massachusetts' },
  { label: 'MI', value: 'Michigan' },
  { label: 'MN', value: 'Minnesota' },
  { label: 'MS', value: 'Mississippi' },
  { label: 'MO', value: 'Missouri' },
  { label: 'MT', value: 'Montana' },
  { label: 'NE', value: 'Nebraska' },
  { label: 'NV', value: 'Nevada' },
  { label: 'NH', value: 'New Hampshire' },
  { label: 'NJ', value: 'New Jersey' },
  { label: 'NM', value: 'New Mexico' },
  { label: 'NY', value: 'New York' },
  { label: 'NC', value: 'North Carolina' },
  { label: 'ND', value: 'North Dakota' },
  { label: 'OH', value: 'Ohio' },
  { label: 'OK', value: 'Oklahoma' },
  { label: 'OR', value: 'Oregon' },
  { label: 'PA', value: 'Pennsylvania' },
  { label: 'RI', value: 'Rhode Island' },
  { label: 'SC', value: 'South Carolina' },
  { label: 'SD', value: 'South Dakota' },
  { label: 'TN', value: 'Tennessee' },
  { label: 'TX', value: 'Texas' },
  { label: 'UT', value: 'Utah' },
  { label: 'VT', value: 'Vermont' },
  { label: 'VA', value: 'Virginia' },
  { label: 'WA', value: 'Washington' },
  { label: 'WV', value: 'West Virginia' },
  { label: 'WI', value: 'Wisconsin' },
  { label: 'WY', value: 'Wyoming' }
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

