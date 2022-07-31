import React, { useMemo } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import InputForm from './InputForm.jsx';
import initValidator from '../validators/index.js';

function FormFormik({ typeForm, settingInputs, onSubmit }) {
  const { t } = useTranslation();

  const validationSchema = useMemo(() => initValidator(typeForm, t), []);
  const initialValues = useMemo(() => settingInputs.reduce((acc, { name }) => ({ ...acc, [name]: '' }), {}), []);

  const f = useFormik({ initialValues, validationSchema, onSubmit });
  const inputs = settingInputs.map((settings) => InputForm({
    f, // formik
    t: (path) => t(`${typeForm}.${path}`),
    ...settings,
  }));

  return (
    <Form onSubmit={f.handleSubmit}>
      <h1 className="text-center mb-4">{t(`${typeForm}.title`)}</h1>
      { inputs }
      <Button type="submit" variant="outline-primary" className="w-100">{t(`${typeForm}.submit`)}</Button>
    </Form>
  );
}

export default FormFormik;
