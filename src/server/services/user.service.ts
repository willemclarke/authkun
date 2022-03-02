import { hashAndSaltUserPassword, verifyPassword } from '../crypto';
import { DatabaseService, DatabaseUser } from './database.service';
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';

export class UserService {
  DatabaserService: DatabaseService;

  constructor(databaseService: DatabaseService) {
    this.DatabaserService = databaseService;
  }

  async getUser(username: string) {
    return this.DatabaserService.getUser(username);
  }

  async register(username: string, password: string) {
    const { salt, hashedPassword } = hashAndSaltUserPassword(password);
    const createdAt = new Date();

    if (await this.DatabaserService.userExists(username)) {
      throw new Error(`Username ${username} already exists`);
    }

    return this.DatabaserService.writeUser({
      id: uuidv4(),
      username,
      password: hashedPassword,
      salt,
      createdAt,
    });
  }

  async verifyUserCredentials(username: string, password: string): Promise<boolean> {
    if (!(await this.DatabaserService.userExists(username))) {
      return false;
    }

    const user = await this.DatabaserService.getUser(username);
    if (!user) {
      return false;
    }

    return verifyPassword(password, user.salt, user.password);
  }

  async login(username: string, password: string) {}
}
