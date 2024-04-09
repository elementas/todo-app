import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import * as yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faFloppyDisk, faXmark } from '@fortawesome/free-solid-svg-icons';

import Input from '../../../components/Input.jsx';
import Label from '../../../components/Label.jsx';
import InputErrorText from '../../../components/InputErrorText.jsx';
import Alert from '../../../components/Alert.jsx';

import { getLists, addList, updateList } from '../listsThunks.js';
import { resetError } from '../listSlice.js';

const schema = yup.object({
  label: yup.string().required('Įveskite sąrašo pavadinimą').max(255)
});

function ListForm({ className, onListItemFormCancel, record = null, ...props }) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors }
  } = useForm({
    defaultValues: record ? { label: record.label } : null,
    resolver: yupResolver(schema)
  });
  const dispatch = useDispatch();
  const formError = useSelector((state) => state.list.error);
  const loading = useSelector((state) => state.list.loading);

  const onSubmit = (data) => {
    dispatch(resetError());
    if (record) {
      if (record.label === data.label) {
        reset();
        onListItemFormCancel();
        return;
      }

      dispatch(
        updateList({
          ...data,
          app_list_id: record.app_list_id
        })
      )
        .then(unwrapResult)
        .then(() => onListItemFormCancel())
        .then(() => reset())
        .then(() => dispatch(getLists()))
        .catch(() => {});
    } else {
      dispatch(addList(data))
        .then(unwrapResult)
        .then(() => reset())
        .then(() => dispatch(getLists()))
        .catch(() => {});
    }
  };

  useEffect(() => {
    reset();
    dispatch(resetError());
    if (record) {
      setValue('label', record.label);
    }
  }, [setValue, reset, dispatch, record]);

  const onCancel = () => {
    reset();
    onListItemFormCancel();
  };

  const onKeyUp = (ev) => {
    if (ev.key === 'Escape') {
      reset();
      dispatch(resetError());
      if (record) {
        onListItemFormCancel();
      }
    }
  };

  let actionButtons = [];

  if (record) {
    actionButtons.push(
      <button
        key="save-button"
        type="submit"
        className="p-1 text-blue-500 transition-all duration-500 ease-in-out hover:text-blue-400"
      >
        <FontAwesomeIcon icon={faFloppyDisk} />
      </button>,
      <button
        key="cancel-button"
        onClick={onCancel}
        className="p-1 text-blue-500 transition-all duration-500 ease-in-out hover:text-blue-400"
      >
        <FontAwesomeIcon icon={faXmark} />
      </button>
    );
  } else {
    actionButtons.push(
      <button
        key="plus-button"
        type="submit"
        className="p-1 text-blue-500 transition-all duration-500 ease-in-out hover:text-blue-400"
      >
        <FontAwesomeIcon icon={faPlus} />
      </button>
    );
  }

  return (
    <form className={className} onSubmit={handleSubmit(onSubmit)} {...props}>
      <div>
        <Label htmlFor="email-input" className="text-sm">
          Pavadinimas
        </Label>
        <div className="flex flex-row items-center gap-2">
          <Input
            type="text"
            name="label"
            placeholder="Sąrašo pavadinimas"
            className="text-sm"
            minLength={1}
            maxLength={255}
            valid={errors.label ? false : true}
            register={register}
            disabled={loading}
            onKeyUp={onKeyUp}
          />
          {actionButtons}
        </div>
      </div>
      {errors.label && <InputErrorText className="mt-2 text-xs" text={errors.label.message} />}
      {formError && (
        <Alert className="mt-2 text-xs" type="error">
          {formError}
        </Alert>
      )}
    </form>
  );
}

export default ListForm;
