export const API_ENDPOINTS = {
    BASE_URL: 'https://api.open5e.com',

    MANIFEST: '/v1/manifest',

    SPELLS: '/v2/spells',
    SPELLLIST: '/v1/spelllist',
    MONSTERS: '/v1/monsters',
    DOCUMENTS: '/v2/documents',
    BACKGROUNDS: '/v2/backgrounds',
    PLANES: '/v1/planes',
    SECTIONS: '/v1/sections',

    RACES: '/v2/races',
    CLASSES: '/v1/classes',
    FEATS: '/v2/feats',
    CONDITIONS: '/v2/conditions',


    EQUIPMENT: '/v1/equipment',
    MAGIC_ITEMS: '/v1/magicitems',
    WEAPONS: '/v2/weapons',
    ARMOR: '/v2/armor',

    RACE_BY_INDEX: (index) => `/v2/races/${index}`,
    CLASS_BY_INDEX: (index) => `/v1/classes/${index}`,
    SPELL_BY_INDEX: (index) => `/v2/spells/${index}`,
    EQUIPMENT_BY_INDEX: (index) => `/v1/equipment/${index}`,
    MAGIC_ITEM_BY_INDEX: (index) => `/v1/magicitems/${index}`,
    MONSTER_BY_INDEX: (index) => `/v1/monsters/${index}`,
};