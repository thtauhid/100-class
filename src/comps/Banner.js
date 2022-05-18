import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder } from '@fortawesome/free-solid-svg-icons'

function Banner({bg}) {
  return (
    <>
      <div className="card mb-3 mt-3 p-5 banner-container" style={{background: bg}}>
        <FontAwesomeIcon className='banner-icon' icon={faFolder} />
        <div className="banner-details">
          <h1 className='text-white'>DBMS</h1>
          <h4 className="text-white">01IT0402</h4>
        </div>
      </div>
    </>
  )
}

export default Banner