
export class LocalStorageManager {
    static setItem(key, data) {
        try {
            localStorage.setItem(key, JSON.stringify(data));
            return true;
        } catch (error) {
            console.error(`Errore nel salvare ${key}:`, error);
            return false;
        }
    }

    static getItem(key, defaultValue = null) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (error) {
            console.error(`Errore nel recuperare ${key}:`, error);
            return defaultValue;
        }
    }

    static removeItem(key) {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (error) {
            console.error(`Errore nel rimuovere ${key}:`, error);
            return false;
        }
    }

    static addToArray(key, item) {
        const array = this.getItem(key, []);
        array.push(item);
        return this.setItem(key, array);
    }

    static removeFromArray(key, predicate) {
        const array = this.getItem(key, []);
        const filteredArray = array.filter(item => !predicate(item));
        return this.setItem(key, filteredArray);
    }

    static updateInArray(key, predicate, newItem) {
        const array = this.getItem(key, []);
        const updatedArray = array.map(item => {
            if (predicate(item)) {
                return typeof newItem === 'function' ? newItem(item) : newItem;
            }
            return item;
        });
        return this.setItem(key, updatedArray);
    }

    static findInArray(key, predicate) {
        const array = this.getItem(key, []);
        return array.find(predicate);
    }

    static filterArray(key, predicate) {
        const array = this.getItem(key, []);
        return array.filter(predicate);
    }
}

export class UserManager {
    static STORAGE_KEY = 'registeredUser';

    static getAllUsers() {
        return LocalStorageManager.getItem(this.STORAGE_KEY, []);
    }


    static findUserByEmail(email) {
        return LocalStorageManager.findInArray(
            this.STORAGE_KEY,
            user => user.email === email
        );
    }

    static registerUser(userData) {
        // Verifica se l'utente esiste già
        const existingUser = this.findUserByEmail(userData.email);
        if (existingUser) {
            throw new Error('User already exists');
        }

        return LocalStorageManager.addToArray(this.STORAGE_KEY, userData);
    }

    static updateUser(email, newUserData) {
        const updated = LocalStorageManager.updateInArray(
            this.STORAGE_KEY,
            user => user.email === email,
            newUserData
        );

        if (!updated) {
            throw new Error('Failed to update user');
        }

        return updated;
    }


    static deleteUser(email) {
        // Non permettere l'eliminazione dell'admin
        const user = this.findUserByEmail(email);
        if (user && user.role === 'admin') {
            throw new Error('Cannot delete admin user');
        }

        return LocalStorageManager.removeFromArray(
            this.STORAGE_KEY,
            user => user.email === email
        );
    }

    static validateLogin(email, password) {
        const user = this.findUserByEmail(email);
        return user && user.password === password ? user : null;
    }

    static changePassword(email, newPassword) {
        return this.updateUser(email, user => ({
            ...user,
            password: newPassword
        }));
    }

    static changeRole(email, newRole) {
        // Non permettere il cambio di ruolo dell'admin
        const user = this.findUserByEmail(email);
        if (user && user.role === 'admin') {
            throw new Error('Cannot change admin role');
        }

        return this.updateUser(email, user => ({
            ...user,
            role: newRole
        }));
    }
}

export class CharacterManager {
    static STORAGE_KEY = 'savedCharacters';

    static getAllCharacters() {
        return LocalStorageManager.getItem(this.STORAGE_KEY, []);
    }

    static getCharactersByUser(userEmail) {
        return LocalStorageManager.filterArray(
            this.STORAGE_KEY,
            character => character.email === userEmail
        );
    }

    static saveCharacter(characterData) {
        return LocalStorageManager.addToArray(this.STORAGE_KEY, characterData);
    }

    static deleteCharacter(predicate) {
        return LocalStorageManager.removeFromArray(this.STORAGE_KEY, predicate);
    }

    static deleteCharactersByUser(userEmail) {
        return LocalStorageManager.removeFromArray(
            this.STORAGE_KEY,
            character => character.email === userEmail
        );
    }

    static updateCharacter(predicate, newCharacterData) {
        return LocalStorageManager.updateInArray(
            this.STORAGE_KEY,
            predicate,
            newCharacterData
        );
    }
}

export class CurrentUserManager {
    static STORAGE_KEY = 'currentUser';

    static getCurrentUser() {
        return LocalStorageManager.getItem(this.STORAGE_KEY, null);
    }


    static setCurrentUser(userData) {
        return LocalStorageManager.setItem(this.STORAGE_KEY, userData);
    }

    static clearCurrentUser() {
        return LocalStorageManager.removeItem(this.STORAGE_KEY);
    }

    static isCurrentUserAdmin() {
        const user = this.getCurrentUser();
        return user && user.role === 'admin';
    }
}


export class CacheManager {
    static STORAGE_KEY = 'cache';
    static DEFAULT_TTL = 1000 * 60 * 60; // 1 ora

    static _loadCache() {
        return LocalStorageManager.getItem(this.STORAGE_KEY, {});
    }

    static _saveCache(cache) {
        return LocalStorageManager.setItem(this.STORAGE_KEY, cache);
    }

    static setCache(key, data, ttl = this.DEFAULT_TTL) {
        const cache = this._loadCache();
        cache[key] = {
            timestamp: Date.now(),
            data,
            ttl
        };
        return this._saveCache(cache);
    }

    static getCache(key) {
        const cache = this._loadCache();
        const item = cache[key];

        if (!item) return null;

        const { timestamp, data, ttl } = item;
        if (Date.now() - timestamp > ttl) {
            delete cache[key];
            this._saveCache(cache);
            return null;
        }

        return data;
    }

    static invalidateCache(key) {
        const cache = this._loadCache();
        if (cache[key]) {
            delete cache[key];
            return this._saveCache(cache);
        }
        return false;
    }

    static cleanExpiredCache() {
        const cache = this._loadCache();
        let modified = false;

        for (const key in cache) {
            const { timestamp, ttl } = cache[key];
            if (Date.now() - timestamp > ttl) {
                delete cache[key];
                modified = true;
            }
        }

        if (modified) {
            this._saveCache(cache);
        }
    }
}
