import Modal from './Modal';
import Button from './Button';

function ConfirmationModal({ message, pendingRecord, onConfirm, onCancel }) {
  return (
    <Modal modalWidth={400} onCancel={onCancel}>
      <p className="mb-4 text-center">{message}</p>
      <div className="flex flex-row items-center justify-center gap-3">
        <Button className="rounded-lg border p-2 text-sm" onClick={() => onConfirm(pendingRecord)}>
          Patvirtinti
        </Button>
        <Button className="rounded-lg border p-2 text-sm" onClick={() => onCancel()}>
          Atšaukti
        </Button>
      </div>
    </Modal>
  );
}

export default ConfirmationModal;
