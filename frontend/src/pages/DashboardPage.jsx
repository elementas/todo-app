import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { useNavigate, useParams } from 'react-router-dom';
import PageContainer from '../components/PageContainer';
import Header from '../components/Header';
import ListsList from '../features/lists/components/ListsList';
import ListForm from '../features/lists/components/ListForm';
import TasksList from '../features/tasks/components/TasksList';
import FilterInput from '../features/lists/components/FilterInput';
import ConfirmationModal from '../components/ConfirmationModal';
import { deleteList, getLists } from '../features/lists/listsThunks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareMinus, faSquarePlus } from '@fortawesome/free-regular-svg-icons';
import Button from '../components/Button';
import TextDivider from '../components/TextDivider';
import TaskFormModal from '../features/tasks/components/TaskFormModal';
import { getFinishedTasks, getUnfinishedTasks, updateTask, deleteTask } from '../features/tasks/tasksThunks';
import moment from 'moment';

const ACTION_DELETE_LIST = 'list';
const ACTION_DELETE_TASK = 'task';

function DashboardPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const [listFilter, setListFilter] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);
  const [pendingRecord, setPendingRecord] = useState(null);
  const [confirmationMessage, setConfirmationMessage] = useState(null);
  const [showFinishedTasks, setShowFinishedTasks] = useState(null);
  const [showTaskFormModal, setShowTaskFormModal] = useState(false);
  const [listFormRecord, setListFormRecord] = useState(null);
  const [taskFormRecord, setTaskFormRecord] = useState(null);
  const [shownList, setShownList] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);

  const listsLoading = useSelector((state) => state.lists.loading);
  const listLoading = useSelector((state) => state.list.loading);
  const finishedTasksLoading = useSelector((state) => state.tasks.finished.loading);
  const unfinishedTasksLoading = useSelector((state) => state.tasks.unfinished.loading);
  const taskLoading = useSelector((state) => state.task.loading);
  const authLoading = useSelector((state) => state.auth.loading);

  const selectedList = useSelector((state) =>
    state.lists.data?.find((list) => {
      return list.app_list_id === params.listId;
    })
  );

  useEffect(() => {
    if (selectedList && shownList !== selectedList.app_list_id) {
      setShownList(selectedList.app_list_id);
      setSelectedTask(null);
      setShowFinishedTasks(false);
      dispatch(getUnfinishedTasks(selectedList.app_list_id));
    }
  }, [selectedList, shownList, dispatch]);

  const onEditListItem = (list) => {
    setListFormRecord(list);
  };

  const onListItemFormCancel = () => {
    setListFormRecord(null);
  };

  const onDeleteListItem = (list) => {
    setPendingAction(ACTION_DELETE_LIST);
    setConfirmationMessage(`Ar tikrai norite ištrinti sąrašą '${list.label}'`);
    setPendingRecord({ ...list });
    setShowConfirmation(true);
  };

  const onActionConfirm = () => {
    const cleanup = () => {
      setPendingAction(null);
      setConfirmationMessage(null);
      setPendingRecord(null);
      setShowConfirmation(false);
      setShownList(null);
      setListFormRecord(null);
    };
    switch (pendingAction) {
      case ACTION_DELETE_LIST:
        dispatch(deleteList(pendingRecord))
          .then(unwrapResult)
          .then(() => {
            navigate(`/dashboard`, { replace: true });
            if (selectedList && selectedList.app_list_id === pendingRecord.app_list_id) {
              setSelectedTask(null);
            }
            cleanup();
            dispatch(getLists());
          })
          .catch(() => {});
        break;
      case ACTION_DELETE_TASK:
        dispatch(deleteTask(pendingRecord))
          .then(unwrapResult)
          .then(() => {
            if (selectedTask && selectedTask.app_task_id === pendingRecord.app_task_id) {
              setSelectedTask(null);
            }
            cleanup();
            dispatch(getLists());
            if (selectedList) {
              dispatch(getUnfinishedTasks(selectedList.app_list_id));
              if (showFinishedTasks) {
                dispatch(getFinishedTasks(selectedList.app_list_id));
              }
            }
          })
          .catch(() => {});
        break;
    }
  };

  const onActionCancel = () => {
    setPendingAction(null);
    setConfirmationMessage(null);
    setPendingRecord(null);
    setShowConfirmation(false);
  };

  const onListItemSelected = (list) => {
    navigate(`/dashboard/${list.app_list_id}`, { replace: true });
  };

  const onTaskItemToggle = (task) => {
    dispatch(updateTask({ ...task }))
      .then(unwrapResult)
      .then(() => {
        dispatch(getLists());
        if (task?.app_task_id === selectedTask?.app_task_id) {
          setSelectedTask(null);
        }
        if (selectedList) {
          dispatch(getUnfinishedTasks(selectedList.app_list_id));
          if (showFinishedTasks) {
            dispatch(getFinishedTasks(selectedList.app_list_id));
          }
        }
      })
      .catch(() => {});
  };

  const onTaskItemEditClick = (task) => {
    setTaskFormRecord(task);
    setShowTaskFormModal(true);
  };

  const onTaskItemFormSuccess = () => {
    if (taskFormRecord?.app_task_id === selectedTask?.app_task_id) {
      setSelectedTask(null);
    }
    setShowTaskFormModal(false);
    setTaskFormRecord(null);
    dispatch(getLists());
    if (selectedList) {
      dispatch(getUnfinishedTasks(selectedList.app_list_id));
      if (showFinishedTasks) {
        dispatch(getFinishedTasks(selectedList.app_list_id));
      }
    }
  };

  const onTaskItemFormCancel = () => {
    setShowTaskFormModal(false);
    setTaskFormRecord(null);
  };

  const toggleFinishedTasks = () => {
    setShowFinishedTasks(!showFinishedTasks);
    if (!showFinishedTasks) {
      dispatch(getFinishedTasks(selectedList.app_list_id));
    }
  };

  const onTaskItemSelect = (task) => {
    setSelectedTask(task);
  };

  const onDeleteTaskItem = (task) => {
    setPendingAction(ACTION_DELETE_TASK);
    setConfirmationMessage(`Ar tikrai norite ištrinti užduotį '${task.label}'`);
    setPendingRecord({ ...task });
    setShowConfirmation(true);
  };

  return (
    <PageContainer
      className="relative"
      loading={
        authLoading || listsLoading || listLoading || finishedTasksLoading || unfinishedTasksLoading || taskLoading
      }
    >
      <Header className={'h-[60px]'} />
      <div className="h-[calc(100dvh-60px)] w-full">
        <div className="flex h-full w-full flex-row ">
          <aside className="flex h-[calc(100dvh-60px)] w-[300px] flex-shrink-0 flex-col overflow-x-hidden border-r-2  border-r-blue-200">
            <div className=" p-2">
              <ListForm record={listFormRecord} onListItemFormCancel={onListItemFormCancel} />
            </div>
            <TextDivider text={'Sąrašai'} />
            <div className="h-full overflow-x-hidden overflow-y-scroll p-2">
              <ListsList
                className="flex h-full flex-col gap-1"
                filter={listFilter}
                selectedListId={selectedList?.app_list_id || null}
                onListItemSelected={onListItemSelected}
                onDeleteListItem={onDeleteListItem}
                onEditListItem={onEditListItem}
              />
            </div>
            <div className="border-t border-t-blue-200 p-2">
              <FilterInput onChange={setListFilter} value={listFilter} />
            </div>
          </aside>
          <main className="h-ful w-full overflow-x-hidden overflow-y-scroll p-8 pt-0">
            {selectedList && (
              <div>
                <div className="mb-8">
                  <div className="mb-4 py-2">
                    <Button onClick={() => setShowTaskFormModal(true)}>Pridėti naują užduotį</Button>
                  </div>
                  <h3 className="mb-4 text-xl">Nebaigtos užduotys</h3>
                  <TasksList
                    type="unfinished"
                    className="flex flex-col gap-1"
                    selectedTask={selectedTask}
                    onTaskItemSelect={onTaskItemSelect}
                    onTaskItemToggle={onTaskItemToggle}
                    onItemDoubleClick={onTaskItemEditClick}
                  />
                </div>
                <div>
                  <div className="mb-4 flex flex-row items-center gap-2">
                    {selectedList.finished_task_count > 0 ? (
                      <button
                        className="text-blue-600 transition-all duration-500 ease-in-out hover:text-blue-500"
                        onClick={toggleFinishedTasks}
                      >
                        <FontAwesomeIcon icon={showFinishedTasks ? faSquareMinus : faSquarePlus} />
                      </button>
                    ) : (
                      <FontAwesomeIcon icon={faSquareMinus} />
                    )}
                    <h3 className="text-xl">Pabaigtos užduotys ({selectedList.finished_task_count})</h3>
                  </div>
                  {showFinishedTasks && (
                    <TasksList
                      type="finished"
                      className="flex flex-col gap-1"
                      selectedTask={selectedTask}
                      onTaskItemSelect={onTaskItemSelect}
                      onTaskItemToggle={onTaskItemToggle}
                      onItemDoubleClick={onTaskItemEditClick}
                    />
                  )}
                </div>
              </div>
            )}
          </main>
          {selectedTask && (
            <aside className="flex h-[calc(100dvh-60px)] w-[300px] flex-shrink-0 flex-col items-center overflow-x-hidden  border-l-2 border-l-blue-200 bg-white text-sm">
              <div className="mt-10">
                <div className="p-2">
                  <div className="font-bold">Pavadinimas:</div>
                  {selectedTask.label}
                </div>
                <div className="p-2">
                  <div className="font-bold">Aprašymas:</div>
                  {selectedTask.description || <span className="italic">Nėra aprašymo</span>}
                </div>
                <div className="p-2">
                  <div className="font-bold">Sukurta:</div>
                  {moment(selectedTask.created).format('YYYY-MM-DD HH:mm:ss')}
                </div>
                {selectedTask.updated && (
                  <div className="p-2">
                    <div className="font-bold">Atnaujinta:</div>
                    {moment(selectedTask.updated).format('YYYY-MM-DD HH:mm:ss')}
                  </div>
                )}
                <div className="p-2">
                  <div className="font-bold">Būsena:</div>
                  {selectedTask.finished ? 'Pabaigta' : 'Nebaigta'}
                </div>
                {selectedTask.finished && (
                  <div className="p-2">
                    <div className="font-bold">Užbaigimo laikas:</div>
                    {moment(selectedTask.finished_timestamp).format('YYYY-MM-DD HH:mm:ss')}
                  </div>
                )}
                <div className="p-2">
                  <div className="flex flex-row items-center justify-center gap-3">
                    <Button className="rounded-lg border p-2 text-sm" onClick={() => onTaskItemEditClick(selectedTask)}>
                      Redaguoti
                    </Button>
                    <Button className="rounded-lg border p-2 text-sm" onClick={() => onDeleteTaskItem(selectedTask)}>
                      Ištrinti
                    </Button>
                  </div>
                </div>
              </div>
            </aside>
          )}
        </div>
      </div>

      {showConfirmation && pendingRecord && (
        <ConfirmationModal
          message={confirmationMessage}
          pendingRecord={{ ...pendingRecord }}
          onConfirm={onActionConfirm}
          onCancel={onActionCancel}
        />
      )}
      {showTaskFormModal && selectedList && (
        <TaskFormModal
          listId={selectedList.app_list_id}
          record={taskFormRecord}
          onSuccess={onTaskItemFormSuccess}
          onClose={onTaskItemFormCancel}
        />
      )}
    </PageContainer>
  );
}

export default DashboardPage;
