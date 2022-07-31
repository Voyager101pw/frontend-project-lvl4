import * as yup from 'yup';
import filter from 'leo-profanity';

const signup = (t) => yup.object({
  username: yup
    .string()
    .required(t('errors.required'))
    .min(3, t('errors.minMax'))
    .max(20, t('errors.minMax')),
  password: yup
    .string()
    .min(6, t('errors.least6'))
    .required(t('errors.required')),
  passConfirm: yup
    .string()
    .required(t('errors.required'))
    .test(
      'pass-match',
      t('errors.passMatch'),
      (passConfirm, form) => passConfirm === form.parent.password,
    ),
});

const login = (t) => yup.object({
  username: yup
    .string()
    .required(t('errors.required')),
  password: yup
    .string()
    .required(t('errors.required')),
});

const modal = (t, channelNames) => yup.object({
  channelName: yup
    .string()
    .trim()
    .required(t('errors.required'))
    .min(3, t('errors.minMax'))
    .max(20, t('errors.minMax'))
    .test(
      'is unique',
      t('errors.uniq'),
      (newName) => !channelNames.includes(newName),
    )
    .test(
      'contains obscene',
      t('errors.obscene'),
      (newName) => !filter.check(newName),
    ),
});

const validators = {
  signup,
  login,
  modal, // for adding & rename channel
};

function initValidator(name, t, channelNames) {
  return (name === 'modal')
    ? validators[name](t, channelNames)
    : validators[name](t);
}

export default initValidator;
