export const currentEnv = process.env.NEXT_PUBLIC_API_ENV;
export const isSandbox = currentEnv === 'testnet';
