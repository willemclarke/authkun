import { DatabasePool, sql, QueryResult } from 'slonik';
import { v4 as uuidv4 } from 'uuid';
import { dateTimeAsTimestamp } from './utils';
import { hashAndSaltUserPassword, verifyPassword } from '../crypto';
import _ from 'lodash';

export interface User {
  id: string;
  username: string;
  password: string;
  salt: string;
  createdAt: Date;
}

export class DatabaseService {
  pool: DatabasePool;

  constructor(pool: DatabasePool) {
    this.pool = pool;
  }

  async getUser(username: string): Promise<User | null> {
    return this.pool.connect((connection) => {
      return connection.maybeOne<User>(sql`SELECT * FROM users WHERE username = ${username}`);
    });
  }

  async userExists(username: string): Promise<boolean> {
    return this.pool.connect((connection) => {
      return connection.exists(sql`SELECT * FROM users WHERE username = ${username}`);
    });
  }

  // this now needs to take in a `User` and simply write that user to db
  // thus it needs to take in a uuid, hashedPw etc
  // checking if the user exists needs to happen in the user service
  async writeUser(user: User): Promise<QueryResult<User> | null> {
    const { salt, hashedPassword } = hashAndSaltUserPassword(user.password);

    const createdAt = dateTimeAsTimestamp(new Date());

    if (await this.userExists(user.username)) {
      return null;
    }

    return this.pool.connect((connection) => {
      return connection.query<User>(
        sql`INSERT INTO users (id, username, password, salt, created_at) VALUES (${uuidv4()}, ${
          user.username
        }, ${hashedPassword}, ${salt}, ${createdAt})`
      );
    });
  }

  // simplify to only interact with database (database.service)
  // this should probably return true or false
  // async verifyUserForLogin(username: string, password: string): Promise<DatabaseUser | null> {
  //   if (await this.userExists(username)) {
  //     const user = await this.getUser(username);
  //     const validPassword = verifyPassword(password, user?.salt, user?.password);

  //     if (!validPassword) {
  //       return null;
  //     }
  //     return user;
  //   }
  //   return null;
  // }
}
