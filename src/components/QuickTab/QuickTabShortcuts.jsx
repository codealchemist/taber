import { useState } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'
import '../Shortcuts/shortcuts.css'

function log () {
  console.log('[ QuickTabShortcuts ]', ...arguments)
}

export default function QuickTabShortcuts () {
  const [isVisible, setIsVisible] = useState(true)

  // Toggle visibility with '.'
  useHotkeys('period', () => setIsVisible(!isVisible), [isVisible])

  if (!isVisible) return null

  return (
    <>
      <div className='shortcuts-title'>
        <h3>Keyboard Shortcuts</h3>
      </div>
      <div className='shortcuts'>
        <ul>
          <li>
            <strong>⏵</strong> Move Right
          </li>
          <li>
            <strong>⏴</strong> Move Left
          </li>
          <li>
            <strong>⏶</strong> Move Up
          </li>
          <li>
            <strong>⏷</strong> Move Down
          </li>
          <li>
            <strong>+</strong> Add Fret
          </li>
          <li>
            <strong>-</strong> Subtract Fret
          </li>
          <li>
            <strong>z</strong> Undo
          </li>
          <li>
            <strong>y</strong> Redo
          </li>
          <li>
            <strong>t</strong> Tab Mode On/Off
          </li>
          <li>
            <strong>Shift+Enter</strong> Set Number
          </li>
          <li>
            <strong>m</strong> Mute String
          </li>
          <li>
            <strong>0-9</strong> Set Start
          </li>
          <li>
            <strong>^C</strong> Copy Tab Image
          </li>
          <li>
            <strong>Enter</strong> Put Finger
          </li>
          <li>
            <strong>r</strong> Reset
          </li>
          <li>
            <strong>q</strong> Exit Quick Tab
          </li>
          <li>
            <strong>.</strong> Toggle Shortcuts
          </li>
        </ul>
      </div>
    </>
  )
}
