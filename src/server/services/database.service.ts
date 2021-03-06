import { DatabasePool, sql, QueryResult } from 'slonik';
import { dateTimeAsTimestamp } from './utils';
import _ from 'lodash';
import { User } from '../../common/types';

export interface DatabaseUser {
  id: string;
  username: string;
  password: string;
  salt: string;
  createdAt: Date;
}

// TODO:
// Setup a `transaction` for database, so each db query will innately handle any errors that occur
export class DatabaseService {
  pool: DatabasePool;

  constructor(pool: DatabasePool) {
    this.pool = pool;
  }

  async getUser(username: string): Promise<DatabaseUser | null> {
    return this.pool.connect((connection) => {
      return connection.maybeOne<DatabaseUser>(
        sql`SELECT * FROM users WHERE username = ${username}`
      );
    });
  }

  async getPartialUser(username: string): Promise<User | null> {
    return this.pool.connect((connection) => {
      return connection.maybeOne<User>(
        sql`SELECT id, username FROM users WHERE username = ${username}`
      );
    });
  }

  async getUsers(): Promise<readonly User[]> {
    return this.pool.connect(async (connection) => {
      const { rows } = await connection.query<User>(sql`SELECT id, username FROM users`);
      return rows;
    });
  }

  async userExists(username: string): Promise<boolean> {
    return this.pool.connect((connection) => {
      return connection.exists(sql`SELECT * FROM users WHERE username = ${username}`);
    });
  }

  async writeUser(user: DatabaseUser): Promise<QueryResult<DatabaseUser>> {
    const { id, username, password, salt, createdAt } = user;

    return this.pool.connect((connection) => {
      return connection.query<DatabaseUser>(
        sql`INSERT INTO users (id, username, password, salt, created_at) VALUES (${id}, ${username}, ${password}, ${salt}, ${dateTimeAsTimestamp(
          createdAt
        )})`
      );
    });
  }
}
