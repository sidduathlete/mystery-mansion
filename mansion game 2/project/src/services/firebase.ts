// Firebase configuration and services
// Note: In a real implementation, you would set up Firebase project and add config
export interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}

// Mock Firebase service for demo purposes
class MockFirebaseService {
  private users: Map<string, any> = new Map();
  private currentUser: any = null;

  async signIn(username: string, password: string) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user = this.users.get(username) || {
      id: username,
      username,
      email: `${username}@example.com`,
      highScore: 0,
      gamesPlayed: 0,
      gamesWon: 0,
      createdAt: Date.now()
    };
    
    this.users.set(username, user);
    this.currentUser = user;
    localStorage.setItem('mysteryMansionUser', JSON.stringify(user));
    return user;
  }

  async signUp(username: string, email: string, password: string) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (this.users.has(username)) {
      throw new Error('Username already exists');
    }
    
    const user = {
      id: username,
      username,
      email,
      highScore: 0,
      gamesPlayed: 0,
      gamesWon: 0,
      createdAt: Date.now()
    };
    
    this.users.set(username, user);
    this.currentUser = user;
    localStorage.setItem('mysteryMansionUser', JSON.stringify(user));
    return user;
  }

  async signOut() {
    this.currentUser = null;
    localStorage.removeItem('mysteryMansionUser');
  }

  getCurrentUser() {
    if (this.currentUser) return this.currentUser;
    
    const stored = localStorage.getItem('mysteryMansionUser');
    if (stored) {
      this.currentUser = JSON.parse(stored);
      return this.currentUser;
    }
    
    return null;
  }

  async updateUserScore(userId: string, score: number, won: boolean) {
    const user = this.users.get(userId);
    if (user) {
      user.highScore = Math.max(user.highScore, score);
      user.gamesPlayed += 1;
      if (won) user.gamesWon += 1;
      this.users.set(userId, user);
      localStorage.setItem('mysteryMansionUser', JSON.stringify(user));
      return user;
    }
  }

  async getLeaderboard(limit = 10) {
    const users = Array.from(this.users.values())
      .sort((a, b) => b.highScore - a.highScore)
      .slice(0, limit);
    return users;
  }
}

export const firebaseService = new MockFirebaseService();