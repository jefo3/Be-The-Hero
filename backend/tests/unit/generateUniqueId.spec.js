const generateUniqueId = require('../../src/utils/generateUniqueId');

describe('generate Unique ID', () => {
    it('gera um ID unico', () => {
        const id = generateUniqueId();
        
        expect(id).toHaveLength(8);
    })
})