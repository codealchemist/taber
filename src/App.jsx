import { useState } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'
import { useDispatch, useSelector } from 'react-redux'
import Welcome from './components/Welcome'
import TabCollection from './components/TabCollection'
import QuickTab from './components/QuickTab'
import {
  tabCollectionsSelector,
  createCollection
} from './store/slices/tab-collections.slice'
import './App.css'
import pkg from '../package.json'

const version = pkg.version

function log () {
  console.log('[ App ]', ...arguments)
}

function App () {
  const [tab, setTab] = useState(null)
  const [isQuickTabMode, setIsQuickTabMode] = useState(false)
  const [activeTab, setActiveTab] = useState(null)
  const dispatch = useDispatch()
  const tabCollections = useSelector(tabCollectionsSelector)
  log('Tab Collections from store:', tabCollections)

  // Keyboard shortcuts
  useHotkeys(
    'q',
    () => setIsQuickTabMode(!isQuickTabMode),
    [isQuickTabMode],
    []
  )
  useHotkeys('n', () => addTab({ strings: [], start: 0 }), [tab])
  useHotkeys('o', () => console.log('Open Tab Collection'), [])
  useHotkeys('s', () => console.log('Save Tab Collection'), [])
  useHotkeys('r', () => console.log('Rename Tab Collection'), [])
  // useHotkeys('t', () => addTab(), tab)
  useHotkeys('d', () => console.log('Duplicate Active Tab'), [activeTab])
  // useHotkeys('c', () => console.log('Copy Active Tab'), [activeTab])
  useHotkeys('p', () => console.log('Paste Active Tab'), [activeTab])
  useHotkeys(['right', '→'], () => console.log('Move Right'), [])
  useHotkeys(['left', '←'], () => console.log('Move Left'), [])
  useHotkeys(['up', '↑'], () => console.log('Move Up'), [])
  useHotkeys(['down', '↓'], () => console.log('Move Down'), [])
  useHotkeys('z', () => console.log('Undo'), [])
  useHotkeys('y', () => console.log('Redo'), [])
  useHotkeys('.', () => console.log('Toggle Shortcuts'), [])

  // Function to add a new tab to the collection
  function addTab () {
    log('Adding new tab', { activeTab, tab })
    const newTab = { start: 0, edit: true }
    setTab(newTab)
  }

  function goHome () {
    window.location.href = '/'
  }

  return (
    <>
      <div className='app'>
        <div className='logo' onClick={goHome}></div>
        {isQuickTabMode ? (
          <QuickTab setIsQuickTabMode={setIsQuickTabMode} />
        ) : (
          <>
            <Welcome />
            <TabCollection />
          </>
        )}
      </div>
      <footer>
        <p>
          Made with ❤️ by <a href='https://github.com/codealchemist'>Bert</a>
        </p>
        <p>·</p>
        <p>v{version}</p>
      </footer>
    </>
  )
}

export default App
