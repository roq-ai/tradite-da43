import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState } from 'react';
import * as yup from 'yup';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';

import { createJournalEntry } from 'apiSdk/journal-entries';
import { journalEntryValidationSchema } from 'validationSchema/journal-entries';
import { TraderInterface } from 'interfaces/trader';
import { getTraders } from 'apiSdk/traders';
import { JournalEntryInterface } from 'interfaces/journal-entry';

function JournalEntryCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: JournalEntryInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createJournalEntry(values);
      resetForm();
      router.push('/journal-entries');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<JournalEntryInterface>({
    initialValues: {
      entry_text: '',
      trader_id: (router.query.trader_id as string) ?? null,
    },
    validationSchema: journalEntryValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Journal Entries',
              link: '/journal-entries',
            },
            {
              label: 'Create Journal Entry',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Journal Entry
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <TextInput
            error={formik.errors.entry_text}
            label={'Entry Text'}
            props={{
              name: 'entry_text',
              placeholder: 'Entry Text',
              value: formik.values?.entry_text,
              onChange: formik.handleChange,
            }}
          />

          <AsyncSelect<TraderInterface>
            formik={formik}
            name={'trader_id'}
            label={'Select Trader'}
            placeholder={'Select Trader'}
            fetcher={getTraders}
            labelField={'name'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/journal-entries')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'journal_entry',
    operation: AccessOperationEnum.CREATE,
  }),
)(JournalEntryCreatePage);