const firebase = jest.requireActual('firebase/app');
require('firebase/firestore');

const mockFirebase = {
  firestore: jest.fn(() => ({
    collection: jest.fn().mockReturnThis(),
    doc: jest.fn().mockReturnThis(),
    get: jest.fn().mockResolvedValue({
      exists: true,
      data: () => ({
        avatar: 'http://test.com/photo.jpg',
        username: 'Test User',
        email: 'test@example.com',
        password: 'password123',
      }),
    }),
    set: jest.fn().mockResolvedValue(undefined),
    update: jest.fn().mockResolvedValue(undefined),
  })),
};

firebase.initializeApp = jest.fn(() => mockFirebase);
module.exports = firebase;
