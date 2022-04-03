import './Loader.scss'

const Loader = ({ loaderBtn }) => {
  return (
    <div className='loader-container'>
      <div className='loader' style={loaderBtn && { width: '16px' }}>
        <span style={loaderBtn && { width: '3px', height: '8px' }}></span>
        <span style={loaderBtn && { width: '3px', height: '8px' }}></span>
        <span style={loaderBtn && { width: '3px', height: '8px' }}></span>
        <span style={loaderBtn && { width: '3px', height: '8px' }}></span>
      </div>
    </div>
  )
}

export default Loader