/**
 * LocalStorageRepository
 * Single Responsibility: Manage timetable subject persistence in browser LocalStorage.
 * Open/Closed: Extensible repository interface for client-side storage without server side-effects.
 */
(function (global) {
    'use strict';

    const STORAGE_KEY = 'sugang_timetable_posts';

    class LocalStorageRepository {
        constructor(storageKey = STORAGE_KEY) {
            this.storageKey = storageKey;
        }

        _getStorage() {
            if (typeof localStorage !== 'undefined') return localStorage;
            if (typeof global !== 'undefined' && global.localStorage) return global.localStorage;
            return null;
        }

        /**
         * Fetch all saved subject items.
         * @returns {Array<{id: number, title: string, content: string}>}
         */
        getAll() {
            try {
                const storage = this._getStorage();
                if (!storage) return [];
                const dataStr = storage.getItem(this.storageKey);
                if (!dataStr) return [];
                const parsed = JSON.parse(dataStr);
                return Array.isArray(parsed) ? parsed : [];
            } catch (err) {
                console.error("LocalStorage load failure:", err);
                return [];
            }
        }

        /**
         * Save a new subject item.
         * @param {string} title 
         * @param {object|string} content 
         * @returns {object} Created subject item
         */
        save(title, content) {
            const items = this.getAll();
            const newId = items.length > 0 ? Math.max(...items.map(i => Number(i.id) || 0)) + 1 : 1;
            const contentStr = typeof content === 'string' ? content : JSON.stringify(content);
            
            const newItem = {
                id: newId,
                title: title,
                content: contentStr
            };

            items.push(newItem);
            this._persist(items);
            return newItem;
        }

        /**
         * Delete subject by ID.
         * @param {number|string} id 
         * @returns {boolean} True if deleted
         */
        deleteById(id) {
            const numericId = Number(id);
            const items = this.getAll();
            const filtered = items.filter(item => Number(item.id) !== numericId);
            
            if (filtered.length !== items.length) {
                this._persist(filtered);
                return true;
            }
            return false;
        }

        /**
         * Clear all stored subjects.
         */
        clear() {
            try {
                const storage = this._getStorage();
                if (storage) storage.removeItem(this.storageKey);
            } catch (err) {
                console.error("LocalStorage clear failure:", err);
            }
        }

        /**
         * Private persistence helper.
         * @param {Array} items 
         */
        _persist(items) {
            try {
                const storage = this._getStorage();
                if (storage) storage.setItem(this.storageKey, JSON.stringify(items));
            } catch (err) {
                console.error("LocalStorage save failure:", err);
            }
        }
    }

    const repositoryInstance = new LocalStorageRepository();

    if (typeof window !== 'undefined') {
        window.SubjectRepository = repositoryInstance;
    }
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = repositoryInstance;
    }
    global.SubjectRepository = repositoryInstance;
})(typeof window !== 'undefined' ? window : global);
