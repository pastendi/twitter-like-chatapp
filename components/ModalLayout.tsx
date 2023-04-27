import { useCallback } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import Button from './Form/Button'
interface Props {
  isOpen?: boolean
  onSubmit: () => void
  onClose: () => void
  title?: string
  body?: React.ReactElement
  footer?: React.ReactElement
  actionLabel: string
  disabled?: boolean
}
const ModalLayout: React.FC<Props> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  footer,
  actionLabel,
  disabled,
}) => {
  const handleClose = useCallback(() => {
    if (disabled) {
      return
    }
    onClose()
  }, [disabled, onClose])
  const handleSubmit = useCallback(() => {
    if (disabled) {
      return
    }
    onSubmit()
  }, [onSubmit, disabled])
  if (!isOpen) return null
  return (
    <div className='flex justify-center items-center fixed z-50 inset-0 bg-neutral-700 bg-opacity-60'>
      {/* model */}
      <div className='p-10 h-auto w-full sm:w-4/5 md:w-3/4 max-w-2xl border-0 rounded-lg shadow-lg flex flex-col  bg-black outline-none focus:outline-none space-y-8'>
        {/* header */}
        <div className='flex justify-between items-center text-xl md:text-3xl capitalize font-semibold'>
          <h3>{title}</h3>
          <button onClick={onClose} className='  border-0 hover:opacity-70 '>
            <AiOutlineClose />
          </button>
        </div>
        {/* body */}
        <div className='flex-auto'>{body}</div>
        {/* footer */}
        <div className='flex flex-col gap-2'>
          <Button
            disabled={disabled}
            label={actionLabel}
            secondary
            fullWidth
            large
            onClick={handleSubmit}
          />
          {/* optional footer */}
          {footer}
        </div>
      </div>
    </div>
  )
}

export default ModalLayout
