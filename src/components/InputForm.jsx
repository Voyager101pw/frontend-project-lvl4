import React, { useEffect } from 'react';
import { Form } from 'react-bootstrap';

function InputForm({
  name, // name used for name, id, placholder, path for translation i18next, etc...
  t, // useTranslation - i18next
  f, // useFormik - formki
  mb, // margin bottom
  inputRef = null, // useRef - react
}) {
  const FeedBack = f.errors[name]?.trim().length && f.values[name].length
    ? (<Form.Control.Feedback tooltip type="invalid" placement="right">{f.errors[name]}</Form.Control.Feedback>)
    : null;

  useEffect(() => {
    if (inputRef) inputRef.current.focus();
  }, [inputRef]);

  return (
    <Form.Group className={`form-floating ${mb}`} key={name}>
      <Form.Control
        required
        id={name}
        name={name}
        placeholder={t(name)}
        type={name.includes('pass') ? 'password' : 'username'}
        value={f.values[name]}
        onChange={f.handleChange}
        isInvalid={f.errors[name]?.length && f.values[name].length}
        ref={inputRef}
      />
      <Form.Label htmlFor={name}>{t(name)}</Form.Label>
      {FeedBack}
    </Form.Group>
  );
}

export default InputForm;
