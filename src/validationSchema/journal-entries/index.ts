import * as yup from 'yup';

export const journalEntryValidationSchema = yup.object().shape({
  entry_text: yup.string().required(),
  trader_id: yup.string().nullable(),
});
