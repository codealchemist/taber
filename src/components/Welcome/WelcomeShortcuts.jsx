import { useState } from 'react'
import '../Shortcuts/shortcuts.css'

function log () {
  console.log('[ WelcomeShortcuts ]', ...arguments)
}

export default function WelcomeShortcuts () {
  return (
    <>
      <div className='shortcuts-title'>
        <h3>Keyboard Shortcuts</h3>
      </div>
      <div className='shortcuts'>
        <ul>
          <li>
            <strong>q</strong> Quick Tab
          </li>
          <li>
            <strong>c</strong> Tab Collections
          </li>
        </ul>
      </div>
    </>
  )
}
