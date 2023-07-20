import axios from 'axios';
import queryString from 'query-string';
import { SimulationInterface, SimulationGetQueryInterface } from 'interfaces/simulation';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getSimulations = async (
  query?: SimulationGetQueryInterface,
): Promise<PaginatedInterface<SimulationInterface>> => {
  const response = await axios.get('/api/simulations', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createSimulation = async (simulation: SimulationInterface) => {
  const response = await axios.post('/api/simulations', simulation);
  return response.data;
};

export const updateSimulationById = async (id: string, simulation: SimulationInterface) => {
  const response = await axios.put(`/api/simulations/${id}`, simulation);
  return response.data;
};

export const getSimulationById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/simulations/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteSimulationById = async (id: string) => {
  const response = await axios.delete(`/api/simulations/${id}`);
  return response.data;
};
