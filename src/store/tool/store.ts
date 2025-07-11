import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';
import { StateCreator } from 'zustand/vanilla';

import { createDevtools } from '../middleware/createDevtools';
import { ToolStoreState, initialState } from './initialState';
import { BuiltinToolAction, createBuiltinToolSlice } from './slices/builtin';
import { CustomPluginAction, createCustomPluginSlice } from './slices/customPlugin';
import { PluginMCPStoreAction, createMCPPluginStoreSlice } from './slices/mcpStore';
import { PluginAction, createPluginSlice } from './slices/plugin';
import { PluginStoreAction, createPluginStoreSlice } from './slices/oldStore';

//  ===============  聚合 createStoreFn ============ //

export type ToolStore = ToolStoreState &
  CustomPluginAction &
  PluginAction &
  PluginStoreAction &
  BuiltinToolAction &
  PluginMCPStoreAction;

const createStore: StateCreator<ToolStore, [['zustand/devtools', never]]> = (...parameters) => ({
  ...initialState,
  ...createPluginSlice(...parameters),
  ...createCustomPluginSlice(...parameters),
  ...createPluginStoreSlice(...parameters),
  ...createBuiltinToolSlice(...parameters),
  ...createMCPPluginStoreSlice(...parameters),
});

//  ===============  实装 useStore ============ //

const devtools = createDevtools('tools');

export const useToolStore = createWithEqualityFn<ToolStore>()(devtools(createStore), shallow);

export const getToolStoreState = () => useToolStore.getState();
