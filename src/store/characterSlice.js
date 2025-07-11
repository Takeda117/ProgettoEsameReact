import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiClient } from '../api/apiClient';
import { API_ENDPOINTS } from '../api/endpoints';
import { CacheManager } from '../utils/localStorage';

// Helper per creare thunk con cache
const createCachedThunk = (name, endpoint, cacheKey) => {
    return createAsyncThunk(name, async () => {
        const cached = CacheManager.getCache(cacheKey);
        if (cached) return cached;

        const response = await apiClient.get(endpoint);
        const names = response.data.results.map(item => item.name);
        CacheManager.setCache(cacheKey, names);
        return names;
    });
};



// Configurazione per le risorse
const resources = [
    { name: 'armors', endpoint: API_ENDPOINTS.ARMOR, cacheKey: 'armors' },
    { name: 'weapons', endpoint: API_ENDPOINTS.WEAPONS, cacheKey: 'weapons' },
    { name: 'races', endpoint: API_ENDPOINTS.RACES, cacheKey: 'races' },
    { name: 'classes', endpoint: API_ENDPOINTS.CLASSES, cacheKey: 'classes' },
    { name: 'feats', endpoint: API_ENDPOINTS.FEATS, cacheKey: 'feats' }
];

// Creazione automatica dei thunk
const thunks = {};
resources.forEach(({ name, endpoint, cacheKey }) => {
    const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);
    thunks[`fetch${capitalizedName}`] = createCachedThunk(
        `character/fetch${capitalizedName}`,
        endpoint,
        cacheKey
    );
});

// Export dei thunk
export const { fetchArmors, fetchWeapons, fetchRaces, fetchClasses, fetchFeats } = thunks;

// Helper per aggiungere casi comuni
const addResourceCases = (builder, thunk, stateProp) => {
    builder
        .addCase(thunk.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(thunk.fulfilled, (state, action) => {
            state.loading = false;
            state[stateProp] = action.payload;
        })
        .addCase(thunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
};

// Stato iniziale
const initialState = {
    armors: [],
    weapons: [],
    races: [],
    classes: [],
    feats: [],
    loading: false,
    error: null
};

const characterSlice = createSlice({
    name: 'character',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        clearCache: (state) => {
            // Pulisce la cache delle risorse D&D
            resources.forEach(({ cacheKey, name }) => {
                CacheManager.invalidateCache(cacheKey);
                state[name] = [];
            });
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        }
    },
    extraReducers: (builder) => {
        // Aggiunge automaticamente i casi per ogni risorsa
        addResourceCases(builder, fetchArmors, 'armors');
        addResourceCases(builder, fetchWeapons, 'weapons');
        addResourceCases(builder, fetchRaces, 'races');
        addResourceCases(builder, fetchClasses, 'classes');
        addResourceCases(builder, fetchFeats, 'feats');
    }
});

export const { clearError, clearCache, setLoading } = characterSlice.actions;
export default characterSlice.reducer;