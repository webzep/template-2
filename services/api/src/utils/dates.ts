export const nowAsUTC = () => new Date().toISOString().split('.')[0].replace('T', ' ');
