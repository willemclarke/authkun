import { hashAndSaltUserPassword, verifyPassword } from '../crypto';
import { ClientUser, DatabaseService, DatabaseUser } from './database.service';
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';
import { AuthkunError, AuthkunErrorType } from '../AuthkunError';
import { QueryResult } from 'slonik';

export class UserService {
  DatabaseService: DatabaseService;

  constructor(databaseService: DatabaseService) {
    this.DatabaseService = databaseService;
  }

  async getUserForJWT(username: string): Promise<ClientUser | null> {
    return this.DatabaseService.getPartialUser(username);
  }

  async getUser(username: string): Promise<DatabaseUser | null> {
    return this.DatabaseService.getUser(username);
  }

  async register(username: string, password: string): Promise<QueryResult<DatabaseUser>> {
    const { salt, hashedPassword } = hashAndSaltUserPassword(password);
    const createdAt = new Date();
    const userExists = await this.DatabaseService.userExists(username);

    if (userExists) {
      throw new AuthkunError({
        type: AuthkunErrorType.UserAlreadyExists,
        message: `User already exists`,
      });
    }

    return this.DatabaseService.writeUser({
      id: uuidv4(),
      username,
      password: hashedPassword,
      salt,
      createdAt,
    });
  }

  async verifyUserCredentials(username: string, password: string): Promise<boolean> {
    const userExists = await this.DatabaseService.userExists(username);

    if (!userExists) {
      return false;
    }

    const user = await this.DatabaseService.getUser(username);
    if (!user) {
      return false;
    }

    return verifyPassword(password, user.salt, user.password);
  }

  async login(username: string, password: string) {}
}
