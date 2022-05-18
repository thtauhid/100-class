import Nav from './Nav'
import Banner from './comps/Banner'
import Upcoming from './comps/Upcoming'
import Content from './comps/Content'

function Class() {
  return (
    <>
        <Nav />
        <div className='container'>
            <Banner bg="#4C8BF5" />
            <div className='row'>

            
            <aside className='col-md-3'>
                <Upcoming />
            </aside>
            <main className='col-md-9'>
                {/* Posting Area */}
                <Content/>
            </main>

            </div>
        </div>
    </>
  )
}

export default Class