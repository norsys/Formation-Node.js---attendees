import { DomainError } from './DomainError.js';

export class InvalidActionError extends DomainError {
  constructor() {
    super('Action must be either "restock" or "use"', 'INVALID_ACTION');
  }
}
