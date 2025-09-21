import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'

/**
 * Slice for managing a collection of tabs.
 * Each tab can represent a musical tab with properties like start position and edit mode.
 * The slice includes actions to add, remove, and update tabs in the collection.
 * The initial state for each collection is an empty array.
 * The tab-collection-store is an array of tab collection objects.
 * Each tab collection object has the following structure:
 * {
 *  id: string, // Unique identifier for the tab collection (e.g., UUID)
 *  name: string, // Name of the tab collection
 *  tabs: [     // Array of tab objects
 *    { start: number, // Starting position of the tab
 *      edit: boolean // Whether the tab is in edit mode
 *    }
 *  ]
 * }
 */
const slice = createSlice({
  name: 'tab-collections',
  initialState: {},
  reducers: {
    createCollection (state, action) {
      const id = uuidv4()
      const name = action.payload?.name || 'Unnamed Collection'
      state[id] = { name, tabs: [] }
    },
    deleteCollection (state, action) {
      const { collectionId } = action.payload
      delete state[collectionId]
    },
    renameCollection (state, action) {
      const { collectionId, name } = action.payload
      state[collectionId].name = name
    },
    addTab (state, action) {
      const { collectionId, tab } = action.payload
      state[collectionId].tabs.push(tab)
    },
    removeTab (state, action) {
      const { collectionId, tabIndex } = action.payload
      state[collectionId].tabs.splice(tabIndex, 1)
    },
    updateTab (state, action) {
      const { collectionId, tabIndex, tab } = action.payload
      state[collectionId].tabs[tabIndex] = tab
    },
    clearTabs (state, action) {
      const { collectionId } = action.payload
      state[collectionId].tabs = []
    }
  }
})

export const {
  createCollection,
  deleteCollection,
  renameCollection,
  addTab,
  removeTab,
  updateTab,
  clearTabs
} = slice.actions
export default slice.reducer
export const tabCollectionsSelector = state => state?.tabCollections || {}
export const getCollectionById = (state, collectionId) =>
  state?.tabCollections?.[collectionId] || { name: '', tabs: [] }
export const getTabByIndex = (state, collectionId, tabIndex) =>
  state?.tabCollections?.[collectionId]?.tabs?.[tabIndex] || null
