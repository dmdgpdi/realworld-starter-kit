import { setupServer } from 'msw/node';
import { articleHandler } from './handlers';

export const server = setupServer(...articleHandler);
