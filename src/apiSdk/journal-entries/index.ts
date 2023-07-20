import axios from 'axios';
import queryString from 'query-string';
import { JournalEntryInterface, JournalEntryGetQueryInterface } from 'interfaces/journal-entry';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getJournalEntries = async (
  query?: JournalEntryGetQueryInterface,
): Promise<PaginatedInterface<JournalEntryInterface>> => {
  const response = await axios.get('/api/journal-entries', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createJournalEntry = async (journalEntry: JournalEntryInterface) => {
  const response = await axios.post('/api/journal-entries', journalEntry);
  return response.data;
};

export const updateJournalEntryById = async (id: string, journalEntry: JournalEntryInterface) => {
  const response = await axios.put(`/api/journal-entries/${id}`, journalEntry);
  return response.data;
};

export const getJournalEntryById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/journal-entries/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteJournalEntryById = async (id: string) => {
  const response = await axios.delete(`/api/journal-entries/${id}`);
  return response.data;
};
