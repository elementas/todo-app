import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { NavLink, useNavigate } from 'react-router-dom';
import * as yup from 'yup';

import Label from '../../../components/Label.jsx';
import Input from '../../../components/Input.jsx';
import InputErrorText from '../../../components/InputErrorText.jsx';
import Button from '../../../components/Button.jsx';
import Alert from '../../../components/Alert.jsx';

import { login as loginThunk } from '../authThunks.js';
import { resetError as resetAuthError } from '../authSlice.js';

const schema = yup.object({
  email: yup.string().email('Įveskite el. pašto adresą').required('Įveskite el. pašto adresą'),
  password: yup.string().required('Įveskite slaptažodį')
});

function LoginForm(props) {
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
  const authError = useSelector((state) => state.auth.error);
  const loading = useSelector((state) => state.auth.loading);

  useEffect(() => {
    dispatch(resetAuthError());
    return () => {
      dispatch(resetAuthError());
    };
  }, [dispatch]);

  const onSubmit = (data) => {
    if (loading) return;

    dispatch(loginThunk(data))
      .then(unwrapResult)
      .then(() => reset())
      .then(() => navigate('/dashboard'))
      .catch(() => {});
  };

  const onNavLinkClick = (ev) => {
    if (loading) ev.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} {...props}>
      <div>
        <div className="mb-4">
          <Label htmlFor="email-input">El. paštas</Label>
          <Input
            type="email"
            id="email-input"
            name="email"
            placeholder="El. pašto adresas"
            minLength={3}
            maxLength={320}
            valid={errors.email ? false : true}
            register={register}
            className="mt-1"
            tabIndex={1}
            disabled={loading}
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
            minLength={1}
            maxLength={64}
            valid={errors.password ? false : true}
            register={register}
            className="mt-1"
            tabIndex={2}
            disabled={loading}
          />
          {errors.password && <InputErrorText text={errors.password.message} />}
        </div>
        {authError && (
          <Alert className="mb-4" type="error">
            {authError}
          </Alert>
        )}
        <div className="flex flex-row items-center justify-between">
          <NavLink className="text-sm text-blue-500 hover:text-blue-400" to="/" tabIndex={4} onClick={onNavLinkClick}>
            Grįžti
          </NavLink>
          <Button type="submit" tabIndex={3} disabled={loading}>
            Prisijungti
          </Button>
        </div>
      </div>
    </form>
  );
}

export default LoginForm;
