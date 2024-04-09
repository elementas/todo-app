import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import * as yup from 'yup';

import Input from '../../../components/Input.jsx';
import Button from '../../../components/Button.jsx';
import Label from '../../../components/Label.jsx';
import TextArea from '../../../components/TextArea.jsx';
import InputErrorText from '../../../components/InputErrorText.jsx';
import Alert from '../../../components/Alert.jsx';
import Modal from '../../../components/Modal.jsx';
import CheckBox from '../../../components/CheckBox.jsx';

import { addTask, updateTask } from '../tasksThunks.js';
import { resetError } from '../taskSlice.js';

const schema = yup.object({
  label: yup.string().required('Įveskite užduoties pavadinimą').max(255),
  description: yup.string().max(32000, 'Užduoties aprašymas negali viršyti 32000 simbolių'),
  finished: yup.bool()
});

function TaskFormModal({ listId, onSuccess, onClose, record = null, ...props }) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors }
  } = useForm({
    defaultValues: record ? { label: record.label, description: record.description, finished: record.finished } : null,
    resolver: yupResolver(schema)
  });
  const dispatch = useDispatch();
  const formError = useSelector((state) => state.task.error);
  const loading = useSelector((state) => state.task.loading);

  useEffect(() => {
    reset();
    dispatch(resetError());
    if (record) {
      setValue('label', record.label);
      setValue('description', record.description);
    }
  }, [setValue, reset, dispatch, record]);

  useEffect(() => {
    return () => {
      dispatch(resetError());
    };
  }, [dispatch]);

  const onSubmit = (data) => {
    if (record) {
      dispatch(
        updateTask({
          app_list_id: listId,
          app_task_id: record.app_task_id,
          ...data
        })
      )
        .then(unwrapResult)
        .then(() => {
          reset();
          onSuccess();
        })
        .catch(() => {});
    } else {
      dispatch(
        addTask({
          app_list_id: listId,
          ...data
        })
      )
        .then(unwrapResult)
        .then(() => {
          reset();
          onSuccess();
        })
        .catch(() => {});
    }
  };

  const onCancel = () => {
    reset();
    dispatch(resetError());
    onClose();
  };

  return (
    <Modal modalWidth={500} onCancel={onCancel} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2 className="mb-4 text-xl">{record ? 'Redaguoti užduotį' : 'Nauja užduotis'}</h2>
        <div className="mb-4">
          <Label htmlFor="task-label-input">Pavadinimas</Label>
          <Input
            type="text"
            id="task-label-input"
            name="label"
            placeholder="Užduoties pavadinimas"
            minLength={1}
            maxLength={255}
            valid={errors.label ? false : true}
            register={register}
            className="mt-1"
            disabled={loading}
          />
          {errors.label && <InputErrorText text={errors.label.message} />}
        </div>
        <div className="mb-4">
          <Label htmlFor="task-description-input">Aprašymas</Label>
          <div>
            <TextArea
              id="task-description-input"
              name="description"
              placeholder="Užduoties aprašymas"
              className="w-full border"
              rows={4}
              register={register}
              disabled={loading}
            />
          </div>
          {errors.description && <InputErrorText text={errors.description.message} />}
        </div>
        <div className="mb-4">
          <CheckBox name="finished" register={register}>
            Pabaigta
          </CheckBox>
        </div>
        {formError && (
          <Alert className="mb-4" type="error">
            {formError}
          </Alert>
        )}
        <div className="flex flex-row items-center justify-end gap-3">
          <Button type="submit" disabled={loading}>
            {record ? 'Atnaujinti' : 'Pridėti'}
          </Button>
          <Button onClick={onCancel} className="!bg-gray-200 text-black hover:!bg-gray-300" disabled={loading}>
            Atšaukti
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export default TaskFormModal;
