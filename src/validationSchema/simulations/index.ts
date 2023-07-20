import * as yup from 'yup';

export const simulationValidationSchema = yup.object().shape({
  name: yup.string().required(),
  trader_id: yup.string().nullable(),
});
