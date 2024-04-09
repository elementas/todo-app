import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import Alert from '../../../components/Alert';
import { getLists } from '../listsThunks';

function ListItem({ list, onDelete, onEdit, isSelected = false, className = '', ...props }) {
  return (
    <div
      className={
        'select-none rounded-md border bg-white p-3 shadow-md transition-all duration-500 ease-in-out' +
        (className ? ` ${className}` : '') +
        (isSelected ? `  border-blue-400 !bg-blue-300` : ' cursor-pointer hover:bg-blue-100')
      }
      {...props}
    >
      <div className="flex flex-row items-center justify-between gap-1">
        <div className="grow text-sm">
          <div className={isSelected ? 'font-bold ' : ''}>{list.label}</div>
          <div className="text-xs text-black">Sukurta: {moment(list.created).format('YYYY-MM-DD HH:mm')}</div>
        </div>
        {list.task_count > 0 && (
          <span className="ms-3 inline-flex h-3 w-3 items-center justify-center rounded-full bg-blue-100 p-3 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-300">
            {list.task_count}
          </span>
        )}
      </div>
      <div className="flex flex-row items-center justify-end gap-2">
        <button className="mt-1 text-xs hover:text-blue-800" onClick={onEdit}>
          Redaguoti
        </button>
        <button className="mt-1 text-xs text-red-600 hover:text-red-800" onClick={onDelete}>
          Ištrinti
        </button>
      </div>
    </div>
  );
}

function ListsList({ filter, selectedListId, onListItemSelected, onDeleteListItem, onEditListItem, ...props }) {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.lists.data);
  const loadError = useSelector((state) => state.lists.error);

  useEffect(() => {
    dispatch(getLists());
  }, [dispatch]);

  const getClickHandler = (list) => {
    return (ev) => {
      ev.preventDefault();
      ev.stopPropagation();
      if (selectedListId !== list.app_list_id) {
        onListItemSelected(list);
      }
    };
  };

  const getDeleteHandler = (list) => {
    return (ev) => {
      ev.preventDefault();
      ev.stopPropagation();
      onDeleteListItem(list);
    };
  };

  const getEditHandler = (list) => {
    return (ev) => {
      ev.preventDefault();
      ev.stopPropagation();
      onEditListItem(list);
    };
  };

  if (loadError) {
    return (
      <div {...props}>
        <Alert type="error">{loadError}</Alert>
      </div>
    );
  }

  let listEls = [];

  if (data && data.length > 0) {
    if (filter) {
      listEls = data
        .filter((list) => {
          return list.label.toLowerCase().indexOf(filter.toLowerCase()) > -1;
        })
        .map((list) => {
          return (
            <ListItem
              key={list.app_list_id}
              list={{ ...list }}
              onClick={getClickHandler(list)}
              onDelete={getDeleteHandler(list)}
              onEdit={getEditHandler(list)}
              isSelected={selectedListId === list.app_list_id}
            />
          );
        });
    } else {
      listEls = data.map((list) => {
        return (
          <ListItem
            key={list.app_list_id}
            list={{ ...list }}
            onClick={getClickHandler(list)}
            onDelete={getDeleteHandler(list)}
            onEdit={getEditHandler(list)}
            isSelected={selectedListId === list.app_list_id}
          />
        );
      });
    }
  }

  return <div {...props}>{listEls}</div>;
}

export default ListsList;
