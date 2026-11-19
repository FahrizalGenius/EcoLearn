import { storageService } from './storageService';
import { dummyUser } from '../data/userData';

const AUTH_KEY = 'ecolearn_auth_user';

export const authService = {
  login(identifier, password) {
    // Simulasi login autentikasi dummy
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (identifier && password && password.length >= 6) {
          const savedUser = storageService.get(AUTH_KEY, null);
          const user = savedUser && (savedUser.email === identifier || savedUser.username === identifier)
            ? savedUser
            : { ...dummyUser, email: identifier.includes('@') ? identifier : `${identifier}@ecolearn.id`, username: identifier };
          
          storageService.set(AUTH_KEY, user);
          resolve(user);
        } else {
          reject(new Error('Email/Username atau password tidak valid (min 6 karakter)'));
        }
      }, 400);
    });
  },

  register(name, username, email, password) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (name && username && email && password && password.length >= 6) {
          const newUser = {
            ...dummyUser,
            name,
            username,
            email,
            level: 'Ekonom Pemula Level 1',
            xp: 100,
            completedMateri: 0,
            totalMateri: 10,
            totalExams: 10,
            averageScore: 0,
          };
          storageService.set(AUTH_KEY, newUser);
          resolve(newUser);
        } else {
          reject(new Error('Lengkapi seluruh formulir pendaftaran dengan benar.'));
        }
      }, 400);
    });
  },

  getCurrentUser() {
    return storageService.get(AUTH_KEY, null);
  },

  logout() {
    storageService.remove(AUTH_KEY);
  }
};
