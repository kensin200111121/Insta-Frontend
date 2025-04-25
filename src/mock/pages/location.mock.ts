import type { LocationItem } from '@/interface/data/location.interface';

import { intercepter, mock } from '../config';

export const locationsDataSource: LocationItem[] = [
];

mock.mock('/page/location', 'get', () => {
  return intercepter<LocationItem[]>(locationsDataSource);
});
