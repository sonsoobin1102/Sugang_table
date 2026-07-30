const assert = require('assert');
const path = require('path');
const fs = require('fs');

// Mock localStorage for Node environment test
global.localStorage = (function () {
    let store = {};
    return {
        getItem: function (key) {
            return store[key] || null;
        },
        setItem: function (key, value) {
            store[key] = String(value);
        },
        removeItem: function (key) {
            delete store[key];
        },
        clear: function () {
            store = {};
        }
    };
})();

// Load storage module
require('./js/storage.js');

console.log("=== Running Timetable Unit Tests ===");

// 1. Test Storage Module
assert.ok(global.SubjectRepository, "SubjectRepository must be exported");

// Clear existing items
global.SubjectRepository.clear();
assert.strictEqual(global.SubjectRepository.getAll().length, 0, "Initial items should be empty");

// Test Save
const saved = global.SubjectRepository.save("자료구조", { credit: 3, sections: [] });
assert.strictEqual(saved.id, 1, "First saved item should have ID 1");
assert.strictEqual(saved.title, "자료구조", "Title should match");
assert.strictEqual(global.SubjectRepository.getAll().length, 1, "Storage should contain 1 item");

// Test Save Second Item
const saved2 = global.SubjectRepository.save("알고리즘", { credit: 3, sections: [] });
assert.strictEqual(saved2.id, 2, "Second item should have ID 2");
assert.strictEqual(global.SubjectRepository.getAll().length, 2, "Storage should contain 2 items");

// Test Delete
const deleted = global.SubjectRepository.deleteById(1);
assert.strictEqual(deleted, true, "Delete should return true");
assert.strictEqual(global.SubjectRepository.getAll().length, 1, "Storage should contain 1 item after delete");
assert.strictEqual(global.SubjectRepository.getAll()[0].id, 2, "Remaining item ID should be 2");

// 2. Test Server initialization
const app = require('./Server.js');
assert.ok(app, "Express app should be instantiated without database dependency");

console.log("✅ All unit tests passed successfully!");
