import { DatabasePool, sql, QueryResult } from 'slonik';
import { v4 as uuidv4 } from 'uuid';
import { dateTimeAsTimestamp } from './utils';
import { hashAndSaltUserPassword } from '../crypto';

interface DatabaseUser {
  id: string;
  username: string;
  password: string;
  salt: string;
  createdAt: Date;
}

type User = Pick<DatabaseUser, 'username' | 'password'>;

export class Database {
  pool: DatabasePool;

  constructor(pool: DatabasePool) {
    this.pool = pool;
  }

  // TODO: figure out way to handle `UniqueIntegrityConstraintViolationError` when a duplicate username
  // is entered
  async insertUser(user: User): Promise<QueryResult<DatabaseUser>> {
    const { username, password } = user;
    const { salt, hashedPassword } = hashAndSaltUserPassword(password);

    const createdAt = dateTimeAsTimestamp(new Date());

    if (await this.isDuplicateUser(username)) {
      console.log(`Username ${username} is already taken`);
    }

    return this.pool.connect((connection) => {
      return connection.query<DatabaseUser>(
        sql`INSERT INTO users (id, username, password, salt, created_at) VALUES (${uuidv4()}, ${username}, ${hashedPassword}, ${salt}, ${createdAt})`
      );
    });
  }

  async isDuplicateUser(username: string): Promise<boolean> {
    return this.pool.connect((connection) => {
      return connection.exists(sql`SELECT * FROM users WHERE username = ${username}`);
    });
  }
}
