import { TraderInterface } from 'interfaces/trader';
import { GetQueryInterface } from 'interfaces';

export interface SimulationInterface {
  id?: string;
  name: string;
  trader_id?: string;
  created_at?: any;
  updated_at?: any;

  trader?: TraderInterface;
  _count?: {};
}

export interface SimulationGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  trader_id?: string;
}
