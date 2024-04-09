import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';

import Label from '../../../components/Label.jsx';
import Input from '../../../components/Input.jsx';
import InputErrorText from '../../../components/InputErrorText.jsx';
import Button from '../../../components/Button.jsx';
import Alert from '../../../components/Alert.jsx';
import { register as registerThunk } from '../authThunks.js';
import { resetError as resetRegistrationError } from '../registrationSlice.js';

const schema = yup.object({
  name: yup.string().required('Įveskite rodomą vardą').max(32, 'Maksimalus ilgis yra 32 simboliai'),
  email: yup
    .string()
    .email('Įveskite el. pašto adresą')
    .required('Įveskite el. pašto adresą')
    .min(3, 'Įveskite el. pašto adresą')
    .max(320, 'Maksimalus el. pašto adreso ilgis yra 320 simbolių'),
  password: yup
    .string()
    .required('Įveskite slaptažodį')
    .min(8, 'Minimalus slaptažodžio ilgis yra 8 simboliai')
    .max(64, 'Maksimalus slaptažodžio ilgis yra 64 simboliai'),
  confirmPassword: yup
    .string()
    .required('Patvirtinkite įvestą slaptažodį')
    .oneOf([yup.ref('password')], 'Įvesti slaptažodžiai nesutampa')
});

function RegistrationForm(props) {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const registrationError = useSelector((state) => state.registration.error);

  useEffect(() => {
    dispatch(resetRegistrationError());
    return () => {
      dispatch(resetRegistrationError());
    };
  }, [dispatch]);

  const onSubmit = (data) => {
    if (data.password !== data.confirmPassword) {
      return;
    }

    delete data.confirmPassword;

    dispatch(registerThunk(data))
      .then(unwrapResult)
      .then(() => reset())
      .then(() => navigate('/login'))
      .catch(() => {});
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} {...props}>
      <div>
        <h2 className="mb-4 text-xl">Registracija</h2>
        <div className="mb-4">
          <Label htmlFor="name-input">Rodomas vardas</Label>
          <Input
            type="text"
            id="name-input"
            name="name"
            placeholder="Jūsų rodomas vardas"
            minLength={1}
            maxLength={32}
            valid={errors.name ? false : true}
            register={register}
            className="mt-1"
          />
          {errors.name && <InputErrorText text={errors.name.message} />}
        </div>
        <div className="mb-4">
          <Label htmlFor="email-input">El. paštas</Label>
          <Input
            type="email"
            id="email-input"
            name="email"
            placeholder="El. pašto adresas"
            minLength={3}
            maxLength={321}
            valid={errors.email ? false : true}
            register={register}
            className="mt-1"
          />
          {errors.email && <InputErrorText text={errors.email.message} />}
        </div>
        <div className="mb-4">
          <Label htmlFor="password-input">Slaptažodis</Label>
          <Input
            type="password"
            id="password-input"
            name="password"
            placeholder="********"
            minLength={8}
            maxLength={65}
            valid={errors.password ? false : true}
            register={register}
            className="mt-1"
          />
          {errors.password && <InputErrorText text={errors.password.message} />}
        </div>
        <div className="mb-4">
          <Label htmlFor="confirm-password-input" className="">
            Pakartoti slaptažodį
          </Label>
          <Input
            type="password"
            id="confirm-password-input"
            name="confirmPassword"
            placeholder="********"
            minLength={8}
            maxLength={65}
            valid={errors.confirmPassword ? false : true}
            register={register}
            className="mt-1"
          />
          {errors.confirmPassword && <InputErrorText text={errors.confirmPassword.message} />}
        </div>
        {registrationError && (
          <Alert className="mb-4" type="error">
            {registrationError}
          </Alert>
        )}
        <div className="text-right">
          <Button type="submit">Pateikti</Button>
        </div>
      </div>
    </form>
  );
}

export default RegistrationForm;
