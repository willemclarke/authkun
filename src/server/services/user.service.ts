import { hashAndSaltUserPassword } from '../crypto';
import { DatabaseService, User } from './database.service';
import { dateTimeAsTimestamp } from './utils';

/**
 * This class can call DatabaseService methods
 *  thus, the logic for checking if a user exists, should occur here
 *      - this service can then be called in express land
 */
export class UserService {
  DatabaserService: DatabaseService;

  constructor(databaseService: DatabaseService) {
    this.DatabaserService = databaseService;
  }

  async register(user: User) {
    const { salt, hashedPassword } = hashAndSaltUserPassword(user.password);
    const createdAt = dateTimeAsTimestamp(new Date());
  }

  async login(user: User) {}
}
