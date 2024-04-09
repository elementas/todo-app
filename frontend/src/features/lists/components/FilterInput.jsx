import Input from '../../../components/Input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

function FilterInput({ onChange, value = '', ...props }) {
  const onFilterKeyUp = (ev) => {
    if (ev.key === 'Escape') {
      onChange('');
    }
  };

  return (
    <div
      className="group flex flex-row items-center rounded-lg border bg-gray-100 focus-within:outline focus-within:outline-2 focus-within:outline-blue-700"
      {...props}
    >
      <Input
        type="text"
        placeholder="Ieškoti sąrašo"
        className="rounded-r-none border-none text-sm outline-none"
        value={value}
        onKeyUp={onFilterKeyUp}
        onChange={(ev) => onChange(ev.target.value.trim())}
      />
      <span className="px-2">
        <FontAwesomeIcon icon={faMagnifyingGlass} className="text-xs" />
      </span>
    </div>
  );
}

export default FilterInput;
