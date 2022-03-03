import { hashAndSaltUserPassword, verifyPassword } from '../crypto';
import { DatabaseService, DatabaseUser } from './database.service';
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';
import { AuthkunError, AuthkunErrorType } from '../AuthkunError';

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

    try {
      if (await this.DatabaserService.userExists(username)) {
        throw new AuthkunError({
          type: AuthkunErrorType.UserAlreadyExists,
          message: `User already exists`,
        });
      }

      return this.DatabaserService.writeUser({
        id: uuidv4(),
        username,
        password: hashedPassword,
        salt,
        createdAt,
      });
    } catch (error) {
      throw new AuthkunError({
        type: AuthkunErrorType.InternalServerError,
        message: error instanceof Error ? error.message : 'Unknown error occured',
      });
    }
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
