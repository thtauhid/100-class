import Nav from '../Nav'
import Banner from '../comps/Banner'
import Content from '../comps/Content'
import upcoming from '../config/upcoming'
import List from '../comps/List'
function Class() {
  return (
    <>
        <Nav />
        <div className='container'>
            <Banner bg="#4C8BF5" />
            <div className='row'>

            
            <aside className='col-md-3'>
              <div className="upcoming-container">
                  <h2 className='mb-3'>Upcoming</h2>
                  <List data={upcoming} />
              </div>
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