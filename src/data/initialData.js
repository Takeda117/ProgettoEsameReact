export const INITIAL_USERS = [
    // Admin
    { email: 'admin@mail.it', password: 'admin', role: 'admin' },

    // Utenti normali
    { email: 'mario.rossi@email.it', password: 'password123', role: 'user' },
    { email: 'anna.verdi@email.it', password: 'password123', role: 'user' },
    { email: 'luca.bianchi@email.it', password: 'password123', role: 'user' },
    { email: 'sofia.neri@email.it', password: 'password123', role: 'user' },
    { email: 'marco.ferrari@email.it', password: 'password123', role: 'user' },
    { email: 'giulia.romani@email.it', password: 'password123', role: 'user' },
    { email: 'alessandro.costa@email.it', password: 'password123', role: 'user' },
    { email: 'francesca.marino@email.it', password: 'password123', role: 'user' },
    { email: 'davide.greco@email.it', password: 'password123', role: 'user' },
    { email: 'chiara.bruno@email.it', password: 'password123', role: 'user' }
];

export const INITIAL_CHARACTERS = [
    // Personaggi di mario.rossi@email.it
    {
        name: "Thorgan Forgiaccio",
        race: "Dwarf",
        class: "Fighter",
        feat: "Heavy Armor Expertise",
        armor: "Chain mail",
        weapon: "Greataxe",
        email: "mario.rossi@email.it",
        createdAt: "2024-01-15T10:30:00.000Z"
    },
    {
        name: "Elara Lunaverde",
        race: "Elf",
        class: "Ranger",
        feat: "Arcanum Master",
        armor: "Studded leather",
        weapon: "Longbow",
        email: "mario.rossi@email.it",
        createdAt: "2024-02-20T14:45:00.000Z"
    },

    // Personaggi di anna.verdi@email.it
    {
        name: "Mystara Stellaargentea",
        race: "High Elf",
        class: "Wizard",
        feat: "Mystic Arcanist",
        armor: "Padded",
        weapon: "Quarterstaff",
        email: "anna.verdi@email.it",
        createdAt: "2024-01-22T09:15:00.000Z"
    },
    {
        name: "Seraphina Cuoreluce",
        race: "Dragonborn",
        class: "Cleric",
        feat: "Divine Orator",
        armor: "Chain mail",
        weapon: "Mace",
        email: "anna.verdi@email.it",
        createdAt: "2024-03-10T16:20:00.000Z"
    },

    // Personaggi di luca.bianchi@email.it
    {
        name: "Zephyr Ombralesta",
        race: "Half-Elf",
        class: "Rogue",
        feat: "Covert Training",
        armor: "Leather",
        weapon: "Shortsword",
        email: "luca.bianchi@email.it",
        createdAt: "2024-02-05T11:30:00.000Z"
    },
    {
        name: "Ragnar Tempestafuriosa",
        race: "Human",
        class: "Barbarian",
        feat: "Brutal Attack",
        armor: "Hide",
        weapon: "Battleaxe",
        email: "luca.bianchi@email.it",
        createdAt: "2024-03-15T13:45:00.000Z"
    },
    {
        name: "Melodia Cantavento",
        race: "Halfling",
        class: "Bard",
        feat: "Linguistics Expert",
        armor: "Studded leather",
        weapon: "Rapier",
        email: "luca.bianchi@email.it",
        createdAt: "2024-04-01T08:00:00.000Z"
    },

    // Personaggi di sofia.neri@email.it
    {
        name: "Kael Ventooscuro",
        race: "Tiefling",
        class: "Warlock",
        feat: "Eldritch Archer",
        armor: "Leather",
        weapon: "Crossbow, light",
        email: "sofia.neri@email.it",
        createdAt: "2024-01-30T12:15:00.000Z"
    },
    {
        name: "Luna Passolesto",
        race: "Catfolk",
        class: "Monk",
        feat: "Martial Scholar",
        armor: "Padded",
        weapon: "Quarterstaff",
        email: "sofia.neri@email.it",
        createdAt: "2024-02-28T15:30:00.000Z"
    },

    // Personaggi di marco.ferrari@email.it
    {
        name: "Draven Mortegelida",
        race: "Human",
        class: "Paladin",
        feat: "Idealistic Leader",
        armor: "Splint",
        weapon: "Longsword",
        email: "marco.ferrari@email.it",
        createdAt: "2024-03-05T10:45:00.000Z"
    },
    {
        name: "Sylvana Fogliaargentea",
        race: "Elf",
        class: "Druid",
        feat: "Natural Warrior",
        armor: "Leather",
        weapon: "Scimitar",
        email: "marco.ferrari@email.it",
        createdAt: "2024-03-25T14:20:00.000Z"
    },

    // Personaggi di giulia.romani@email.it
    {
        name: "Ember Fiammasacra",
        race: "Dragonborn",
        class: "Sorcerer",
        feat: "Mystical Talent",
        armor: "Padded",
        weapon: "Dagger",
        email: "giulia.romani@email.it",
        createdAt: "2024-02-12T09:30:00.000Z"
    },

    // Personaggi di alessandro.costa@email.it
    {
        name: "Grimjaw Spezzaossa",
        race: "Half-Orc",
        class: "Fighter",
        feat: "Guarded Warrior",
        armor: "Chain mail",
        weapon: "Greatsword",
        email: "alessandro.costa@email.it",
        createdAt: "2024-01-18T16:45:00.000Z"
    },
    {
        name: "Whisper Umbranera",
        race: "Halfling",
        class: "Rogue",
        feat: "Nightstalker",
        armor: "Studded leather",
        weapon: "Shortbow",
        email: "alessandro.costa@email.it",
        createdAt: "2024-04-08T11:15:00.000Z"
    },

    // Personaggi di francesca.marino@email.it
    {
        name: "Celestine Raggiodorato",
        race: "Alseid",
        class: "Cleric",
        feat: "Heraldic Training",
        armor: "Scale mail",
        weapon: "Warhammer",
        email: "francesca.marino@email.it",
        createdAt: "2024-02-25T13:00:00.000Z"
    },
    {
        name: "Vex Artiglioombra",
        race: "Pantheran",
        class: "Ranger",
        feat: "Monster Hunter",
        armor: "Hide",
        weapon: "Handaxe",
        email: "francesca.marino@email.it",
        createdAt: "2024-03-30T10:30:00.000Z"
    },

    // Personaggi di davide.greco@email.it
    {
        name: "Azrath Linguafiamma",
        race: "Tiefling Heritage",
        class: "Warlock",
        feat: "Eldritch Volley Master",
        armor: "Studded leather",
        weapon: "Rapier",
        email: "davide.greco@email.it",
        createdAt: "2024-01-25T08:45:00.000Z"
    },
    {
        name: "Pippin Piedefelice",
        race: "Halfling Heritage",
        class: "Bard",
        feat: "Hardy Adventurer",
        armor: "Leather",
        weapon: "Crossbow, light",
        email: "davide.greco@email.it",
        createdAt: "2024-03-12T15:15:00.000Z"
    },
    {
        name: "Stoneheart Montelama",
        race: "Dwarf Heritage",
        class: "Cleric",
        feat: "Physician",
        armor: "Chain mail",
        weapon: "Light hammer",
        email: "davide.greco@email.it",
        createdAt: "2024-04-05T12:30:00.000Z"
    },

    // Personaggi di chiara.bruno@email.it
    {
        name: "Raven Nottetempesta",
        race: "Human Chassis",
        class: "Sorcerer",
        feat: "Night Master",
        armor: "Padded",
        weapon: "Crossbow, light",
        email: "chiara.bruno@email.it",
        createdAt: "2024-02-08T14:00:00.000Z"
    },
    {
        name: "Oakenshield Radicesalde",
        race: "Dwarf Chassis",
        class: "Druid",
        feat: "Living Stampede",
        armor: "Hide",
        weapon: "Club",
        email: "chiara.bruno@email.it",
        createdAt: "2024-03-20T09:45:00.000Z"
    },

    // Altri personaggi interessanti con razze uniche
    {
        name: "Zixis Acidspitter",
        race: "Kobold Chassis",
        class: "Ranger",
        feat: "Crossbow Expertise",
        armor: "Studded leather",
        weapon: "Crossbow, heavy",
        email: "mario.rossi@email.it",
        createdAt: "2024-04-15T11:00:00.000Z"
    },
    {
        name: "Mycelius Sporeheart",
        race: "Mushroomfolk",
        class: "Druid",
        feat: "Empathic",
        armor: "Hide",
        weapon: "Sickle",
        email: "anna.verdi@email.it",
        createdAt: "2024-04-20T16:30:00.000Z"
    },
    {
        name: "Ravenstar Voidcaller",
        race: "Ravenfolk",
        class: "Warlock",
        feat: "Fear Breaker",
        armor: "Leather",
        weapon: "Dart",
        email: "luca.bianchi@email.it",
        createdAt: "2024-04-25T09:15:00.000Z"
    },
    {
        name: "Crystalbeard Gearwright",
        race: "Gearforged",
        class: "Fighter",
        feat: "Crafting Expert",
        armor: "Plate",
        weapon: "War Pick",
        email: "sofia.neri@email.it",
        createdAt: "2024-05-01T14:45:00.000Z"
    },
    {
        name: "Purion Lightbringer",
        race: "Purified",
        class: "Paladin",
        feat: "Equipped for Justice",
        armor: "Chain mail",
        weapon: "Trident",
        email: "marco.ferrari@email.it",
        createdAt: "2024-05-05T10:20:00.000Z"
    },
    {
        name: "Shadowmere Whisperwind",
        race: "Satarre",
        class: "Rogue",
        feat: "Attentive",
        armor: "Studded leather",
        weapon: "Whip",
        email: "giulia.romani@email.it",
        createdAt: "2024-05-10T13:30:00.000Z"
    }
];

// Funzione per inizializzare i dati se non esistono
export const initializeAppData = () => {
    // Controlla se esistono già dati in localStorage
    const existingUsers = JSON.parse(localStorage.getItem('registeredUser') || '[]');
    const existingCharacters = JSON.parse(localStorage.getItem('savedCharacters') || '[]');

    // Se non ci sono utenti, inizializza con i dati predefiniti
    if (existingUsers.length === 0) {
        localStorage.setItem('registeredUser', JSON.stringify(INITIAL_USERS));
        console.log('Inizializzati utenti predefiniti:', INITIAL_USERS.length);
    }

    // Se non ci sono personaggi, inizializza con i dati predefiniti
    if (existingCharacters.length === 0) {
        localStorage.setItem('savedCharacters', JSON.stringify(INITIAL_CHARACTERS));
        console.log('Inizializzati personaggi predefiniti:', INITIAL_CHARACTERS.length);
    }
};

// Statistiche sui dati iniziali
export const getInitialDataStats = () => {
    return {
        totalUsers: INITIAL_USERS.length,
        totalCharacters: INITIAL_CHARACTERS.length,
        adminUsers: INITIAL_USERS.filter(u => u.role === 'admin').length,
        regularUsers: INITIAL_USERS.filter(u => u.role === 'user').length,
        charactersByUser: INITIAL_CHARACTERS.reduce((acc, char) => {
            acc[char.email] = (acc[char.email] || 0) + 1;
            return acc;
        }, {}),
        raceDistribution: INITIAL_CHARACTERS.reduce((acc, char) => {
            acc[char.race] = (acc[char.race] || 0) + 1;
            return acc;
        }, {}),
        classDistribution: INITIAL_CHARACTERS.reduce((acc, char) => {
            acc[char.class] = (acc[char.class] || 0) + 1;
            return acc;
        }, {}),
        featDistribution: INITIAL_CHARACTERS.reduce((acc, char) => {
            acc[char.feat] = (acc[char.feat] || 0) + 1;
            return acc;
        }, {}),
        armorDistribution: INITIAL_CHARACTERS.reduce((acc, char) => {
            acc[char.armor] = (acc[char.armor] || 0) + 1;
            return acc;
        }, {}),
        weaponDistribution: INITIAL_CHARACTERS.reduce((acc, char) => {
            acc[char.weapon] = (acc[char.weapon] || 0) + 1;
            return acc;
        }, {})
    };
};