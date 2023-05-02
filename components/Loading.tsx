import { ClipLoader } from 'react-spinners'

const Loading = () => {
  return (
    <div className='flex justify-center items-center h-full'>
      <ClipLoader color='lightBlue' size={80} />
    </div>
  )
}

export default Loading
