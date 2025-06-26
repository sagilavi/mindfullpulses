// src/services/AuthService.ts

export interface User {
  id: string;
  email: string;
}

export interface IAuthService {
  /**
   * @param: {string} email - The user's email address.
   * @param: {string} password - The user's password.
   * @description: Signs in a user with email and password (mock).
   * @returns: {Promise<User>} - Resolves with a fake user object.
   * @updates: Updates the global authentication state.
   */
  signIn(email: string, password: string): Promise<User>;

  /**
   * @param: {string} email - The user's email address.
   * @param: {string} password - The user's password.
   * @description: Registers a new user (mock).
   * @returns: {Promise<User>} - Resolves with a fake user object.
   * @updates: Updates the global authentication state.
   */
  signUp(email: string, password: string): Promise<User>;
}

export class MockAuthService implements IAuthService {
  async signIn(email: string, password: string): Promise<User> {
    return new Promise((resolve) => {
      setTimeout(() => resolve({ id: '1', email }), 800);
    });
  }
  async signUp(email: string, password: string): Promise<User> {
    return new Promise((resolve) => {
      setTimeout(() => resolve({ id: '2', email }), 800);
    });
  }
} 