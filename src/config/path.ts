import env from '@/environment';

console.log('server domain', env.SERVER_DOMAIN)

export const API_BASE = `${env.SERVER_DOMAIN}app/`;
export const SERVER = env.SERVER_DOMAIN;
