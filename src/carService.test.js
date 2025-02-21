// carService.test.js
import { saveCarrosBasureros } from './carService';
import { db } from './firebaseConfig';

jest.mock('./firebaseConfig'); 

describe('saveCarrosBasureros', () => {
    it('should save CarrosBasureros to firebase', async () => {
        db.collection.mockReturnValue({
            add: jest.fn().mockResolvedValue('success')
        });
        const response = await saveCarrosBasureros({ name: 'Test' });
        expect(response).toBe('success');
    });

    it('should return error if saving to firebase fails', async () => {
        db.collection.mockReturnValue({
            add: jest.fn().mockRejectedValue('error')
        });
        const response = await saveCarrosBasureros({ name: 'Test' });
        expect(response).toBe('error');
    });
});
