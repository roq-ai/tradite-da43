import { TraderInterface } from 'interfaces/trader';
import { GetQueryInterface } from 'interfaces';

export interface JournalEntryInterface {
  id?: string;
  entry_text: string;
  trader_id?: string;
  created_at?: any;
  updated_at?: any;

  trader?: TraderInterface;
  _count?: {};
}

export interface JournalEntryGetQueryInterface extends GetQueryInterface {
  id?: string;
  entry_text?: string;
  trader_id?: string;
}
