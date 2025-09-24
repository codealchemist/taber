import { useState, useEffect, useRef } from 'react'
import { toBlob } from 'html-to-image'
import { useHotkeys, useRecordHotkeys } from 'react-hotkeys-hook'
import './tab.css'
import chordsCollection from './6-string-chords.json'

const DEFAULT_STRINGS = [
  [false, false, false, false],
  [false, false, false, false],
  [false, false, false, false],
  [false, false, false, false],
  [false, false, false, false],
  [false, false, false, false]
]
const MIN_FRETS = 4

function log () {
  console.log('[ Tab ]', ...arguments)
}

/**
 * Renders a tab component.
 * Starts with 6 strings by default.
 * Props:
 * - strings: An array of strings to display in the tab.
 *
 * Each string contains an array of frets and a number prop indicating
 * the starting fret called `start`.
 * Each freat is a boolean indicating whether the fret is pressed.
 *
 * Example:
 * {
 *   start: 0, // Starts at fret 0.
 *   strings: [ // Rendering 6 strings with 4 frets per string.
 *     [false, false, false, false],
 *     [false, true, false, false],
 *     [false, true, false, false],
 *     [true, false, false, false],
 *     [false, false, false, false],
 *     [false, false, false, false]
 *   ]
 * }
 *
 * @param {*} params - The properties for the tab component.
 * @returns
 */
export default function Tab (props) {
  // log('Rendering Tab with props:', props)
  const [isEditMode, setIsEditMode] = useState(!!props.edit)
  const [isTabMode, setIsTabMode] = useState(false)
  const [editPosition, setEditPosition] = useState({ string: 0, fret: 1 })
  const [settingNumber, setSettingNumber] = useState({
    string: null,
    fret: null
  })
  const chordData = chordsCollection?.[props.chord]
  const [mutedOpenStrings, setMutedOpenStrings] = useState(
    chordData?.mutedOpenStrings || []
  )
  let [strings, setStrings] = useState(
    props.strings || chordData?.strings || DEFAULT_STRINGS
  )
  const stringsCount = strings.length
  const [start, setStart] = useState(chordData?.start || props.start || 1)
  const edit = props.edit || false
  const ref = useRef()

  // const [keys, { start: startRecording, stop, isRecording }] =
  //   useRecordHotkeys()

  // useEffect(() => {
  //   if (!isRecording) {
  //     startRecording()
  //   }
  //   log('Hotkeys pressed:', keys, { isRecording })
  // }, [keys, isRecording])

  // log('Tab props:', {
  //   strings,
  //   stringsCount,
  //   start,
  //   edit
  // })

  // Effect to set the edit position if not provided
  useEffect(() => {
    if (edit && !props.editPosition) {
      setEditPosition({ string: 0, fret: 0 })
    }
  }, [edit, props.editPosition])

  async function copyImage () {
    // Turn off edit mode when copying the image so the cursor is not visible.
    setIsEditMode(false)

    const imageData = await toBlob(ref.current)
    await navigator.clipboard.write([
      new ClipboardItem({ 'image/png': imageData })
    ])
    log('Tab image copied to clipboard!', imageData)
    setIsEditMode(true)
  }

  // Function to handle click on a fret.
  function addRemoveFinger (stringIndex, fretIndex) {
    if (!isEditMode) return
    const newStrings = [...strings]
    if (newStrings[stringIndex][fretIndex]) {
      // Remove finger.
      newStrings[stringIndex][fretIndex] = false
    } else {
      // Add finger.
      newStrings[stringIndex][fretIndex] = true
    }
    log('Updating 👉', stringIndex, 'fret', fretIndex, { newStrings })
    setStrings(newStrings)
    props.onChange?.(newStrings)
  }

  // Add capo (one finger pressing all strings at the same fret).
  const addCapo = fretIndex => {
    if (!isEditMode) return
    const newStrings = strings.map(string => {
      const newString = [...string]
      newString[fretIndex] = true
      return newString
    })
    setStrings(newStrings)
    props.onChange?.(newStrings)
  }

  // Shortcut to add a new fret
  const addFret = () => {
    log('Adding fret')
    if (!isEditMode) return
    const newStrings = strings.map(string => [...string, false])
    setStrings(newStrings)
    props.onChange?.(newStrings)
  }

  const subtractFret = () => {
    if (!isEditMode) return
    if (strings[0].length <= MIN_FRETS) {
      log('Cannot subtract fret. Minimum frets reached:', MIN_FRETS)
      return
    }

    log('Subtracting fret')
    const newStrings = strings.map(string =>
      string.length > 1 ? string.slice(0, -1) : string
    )
    setStrings(newStrings)
    props.onChange?.(newStrings)
  }

  // Shortcut to remove the last fret
  const removeFret = () => {
    if (!isEditMode) return
    const newStrings = strings.map(string => string.slice(0, -1))
    setStrings(newStrings)
    props.onChange?.(newStrings)
  }

  function getPositionClassName ({ string, fret, pressed }) {
    let className = 'tab-fret'
    if (pressed) className += ' pressed'
    if (
      isEditMode &&
      editPosition.string === string &&
      editPosition.fret === fret
    ) {
      className += ' tab-fret-cursor'
    }
    return className
  }

  function muteOpenString (stringIndex) {
    if (!isEditMode) return
    log(editPosition, stringIndex)
    log('Toggling mute open string:', stringIndex)
    let newMutedOpenStrings = [...mutedOpenStrings]
    newMutedOpenStrings[stringIndex] = !newMutedOpenStrings[stringIndex]
    log('New muted open strings:', newMutedOpenStrings)
    setMutedOpenStrings(newMutedOpenStrings)
    props.onChange?.(strings, start, newMutedOpenStrings)
  }

  function getMutedOpenString (index) {
    const muted = mutedOpenStrings[index]
    let className = 'tab-fret'
    if (muted) className += ' muted'

    return (
      <span key={`open-${index}`} className={className + ' open-string'}></span>
    )
  }

  function setPositionNumber ({ string, fret }) {
    if (!isEditMode) return
    log('Settings number on', { string, fret })
    setSettingNumber({ string, fret })
  }

  // Add keyboard shortcuts for editing the tab
  // Add finger at the current edit position
  useHotkeys(
    'enter',
    () => {
      addRemoveFinger(editPosition.string, editPosition.fret)
    },
    [isEditMode, editPosition, strings]
  )

  useHotkeys(
    't',
    () => {
      setIsTabMode(!isTabMode)
    },
    [isEditMode, editPosition, isTabMode]
  )

  // Add capo at the current fret
  useHotkeys(
    'c',
    () => {
      addCapo(editPosition.fret)
    },
    [isEditMode, editPosition, strings]
  )

  // Move cursor right
  useHotkeys(
    ['right', '→'],
    () => {
      setEditPosition(pos => ({
        string: pos.string,
        fret: Math.min(pos.fret + 1, strings[0].length - 1)
      }))
    },
    [isEditMode, strings]
  )

  // Move cursor left
  useHotkeys(
    ['left', '←'],
    () => {
      setEditPosition(pos => ({
        string: pos.string,
        fret: Math.max(pos.fret - 1, 0)
      }))
    },
    [isEditMode, strings]
  )

  // Move cursor up
  useHotkeys(
    ['up', '↑'],
    () => {
      setEditPosition(pos => ({
        string: Math.max(pos.string - 1, 0),
        fret: pos.fret
      }))
    },
    [isEditMode, strings]
  )

  // Move cursor down
  useHotkeys(
    ['down', '↓'],
    () => {
      setEditPosition(pos => ({
        string: Math.min(pos.string + 1, strings.length - 1),
        fret: pos.fret
      }))
    },
    [isEditMode, strings]
  )

  // Add a new fret at the end
  useHotkeys('shift+equal', addFret, [isEditMode, strings])

  // Subtract fret.
  useHotkeys('minus', subtractFret, [isEditMode, strings])

  // Remove the last fret
  useHotkeys(
    'Backspace',
    () => {
      removeFret()
    },
    [isEditMode, strings]
  )

  useHotkeys(
    'Shift+Enter',
    () => {
      setPositionNumber(editPosition)
    },
    [isEditMode, editPosition]
  )

  useHotkeys(
    'm',
    () => {
      muteOpenString(editPosition.string)
    },
    [isEditMode, editPosition, mutedOpenStrings]
  )

  // Set start fret (1-9).
  // 0 is the open string, which is always there.
  useHotkeys(
    ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
    event => {
      const newStart = parseInt(event.key, 10)
      if (!isNaN(newStart)) {
        log('Setting start fret to:', newStart)
        setStart(newStart)
        props.onChange?.(strings, newStart)
      }
    },
    [strings]
  )

  // Copy tab image to clipboard.
  useHotkeys('ctrl+c', copyImage, [])

  return (
    <div className='tab-container' ref={ref}>
      <div className='tab'>
        {/* Draw strings with finger positions (dots). */}
        {strings.map((string, stringIndex) => (
          <div key={stringIndex} className='tab-string'>
            <span className='tab-string-label'>
              {stringsCount - stringIndex}
            </span>
            {getMutedOpenString(stringIndex)}

            {string.map((fingerNumber, fretIndex) => (
              <span
                key={fretIndex}
                className={getPositionClassName({
                  string: stringIndex,
                  fret: fretIndex,
                  pressed: fingerNumber
                })}
              >
                <p>{typeof fingerNumber === 'number' ? fingerNumber : ''}</p>

                {settingNumber.string === stringIndex &&
                settingNumber.fret === fretIndex ? (
                  <input
                    type='number'
                    className='tab-fret-number-input'
                    autoFocus
                    onBlur={e => {
                      const value = parseInt(e.target.value, 10)
                      if (!isNaN(value)) {
                        log('Setting finger number:', {
                          value,
                          stringIndex,
                          fretIndex
                        })
                        const newStrings = [...strings]
                        newStrings[stringIndex][fretIndex] = value
                        setStrings(newStrings)
                        props.onChange?.(newStrings)
                      }
                      setSettingNumber({ string: null, fret: null })
                    }}
                    onKeyDown={e => {
                      if (e.key === 'Enter') {
                        e.target.blur()
                      }
                    }}
                  />
                ) : null}
              </span>
            ))}
          </div>
        ))}

        {/* Double first fret. */}
        <span key={-1} className='tab-fret-line first-fret'>
          <span className='tab-fret-number'></span>
        </span>

        {/* Draw frets. */}
        {strings[0].map((_, fretIndex) => (
          <span
            key={fretIndex}
            className={isTabMode === true ? '' : 'tab-fret-line'}
            style={{ left: `calc(30px * ${fretIndex})` }}
          >
            <span className='tab-fret-number'>
              {isTabMode === true ? '' : fretIndex + start}
            </span>
          </span>
        ))}
      </div>
    </div>
  )
}
