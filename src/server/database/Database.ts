import { DatabasePool, sql, QueryResult } from 'slonik';
import { v4 as uuidv4 } from 'uuid';
import { dateTimeAsTimestamp } from './utils';
import { hashAndSaltUserPassword, verifyPassword } from '../crypto';
import _ from 'lodash';

interface DatabaseUser {
  id: string;
  username: string;
  password: string;
  salt: string;
  createdAt: Date;
}

type User = Pick<DatabaseUser, 'username' | 'password'>;

/** TODO:
 * Perhaps have another type, e.g type `UserJwtPaload` - which has all user fields bar the salt & pw
 * then `writeUser` and `verifyUserForLogin` can omit the `salt & pw` fields and send back what we want
 * through the jwt
 */
export class Database {
  pool: DatabasePool;

  constructor(pool: DatabasePool) {
    this.pool = pool;
  }

  async getUser(username: string): Promise<DatabaseUser> {
    return this.pool.connect(async (connection) => {
      return connection.one<DatabaseUser>(sql`SELECT * FROM users WHERE username = ${username}`);
    });
  }

  async userExists(username: string): Promise<boolean> {
    return this.pool.connect((connection) => {
      return connection.exists(sql`SELECT * FROM users WHERE username = ${username}`);
    });
  }

  // figure out better name
  async writeUser(user: User): Promise<QueryResult<DatabaseUser> | null> {
    const { username, password } = user;
    const { salt, hashedPassword } = hashAndSaltUserPassword(password);

    const createdAt = dateTimeAsTimestamp(new Date());

    if (await this.userExists(username)) {
      return null;
    }

    return this.pool.connect((connection) => {
      return connection.query<DatabaseUser>(
        sql`INSERT INTO users (id, username, password, salt, created_at) VALUES (${uuidv4()}, ${username}, ${hashedPassword}, ${salt}, ${createdAt})`
      );
    });
  }

  // figure out better name
  async verifyUserForLogin(user: User): Promise<DatabaseUser | null> {
    const { username, password } = user;

    if (await this.userExists(username)) {
      const user = await this.getUser(username);
      const validPassword = verifyPassword(password, user.salt, user.password);

      if (!validPassword) {
        return null;
      }
      return user;
    }
    return null;
  }
}
