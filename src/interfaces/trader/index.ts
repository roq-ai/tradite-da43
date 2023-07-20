import { JournalEntryInterface } from 'interfaces/journal-entry';
import { SimulationInterface } from 'interfaces/simulation';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface TraderInterface {
  id?: string;
  description?: string;
  image?: string;
  name: string;
  created_at?: any;
  updated_at?: any;
  user_id: string;
  tenant_id: string;
  journal_entry?: JournalEntryInterface[];
  simulation?: SimulationInterface[];
  user?: UserInterface;
  _count?: {
    journal_entry?: number;
    simulation?: number;
  };
}

export interface TraderGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  image?: string;
  name?: string;
  user_id?: string;
  tenant_id?: string;
}
