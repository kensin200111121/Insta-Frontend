import type {
  EditLocationItem,
  LocationCreateFormItem,
  LocationItem,
  LocationListItem,
} from '@/interface/data/location.interface';
import type { NoteLocationFormData } from '@/components/dialogs/note-location';

import { API_BASE } from '@/config/path';

import { request } from '../request';

export const apiGetstatistics = () => request<LocationListItem[]>('get', API_BASE + `store/list`); //store/statistics
export const apiCreateLocation = (data: LocationCreateFormItem) =>
  request<LocationCreateFormItem>('post', API_BASE + 'store/create', data);
export const apiEditLocation = (data: LocationCreateFormItem) =>
  request<LocationCreateFormItem>('post', API_BASE + 'store/edit', data);

export const apiGetLocationById = (storeId: string) => {
  return request<EditLocationItem>('get', `${API_BASE}store/getById?storeId=${storeId}`);
};

export const apiUploadOwnershipProof = (data: FormData) =>
  request<{ name: string; link: string }>('post', API_BASE + 'store/upload', data);
export const apiGetStores = () => request<LocationItem[]>('get', API_BASE + 'store/load');
export const apiGetLocations = () => request<LocationItem[]>('get', `${API_BASE}store`);
export const apiNoteLocation = (data: NoteLocationFormData) =>
  request<NoteLocationFormData>('post', API_BASE + 'store/notes', data);