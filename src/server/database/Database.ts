import { DatabasePool, sql, QueryResult } from 'slonik';
import { v4 as uuidv4 } from 'uuid';
import { dateTimeAsTimestamp } from './utils';
import { hashAndSaltPassword } from '../crypto';

interface DatabaseUser {
  id: string;
  username: string;
  password: string;
  salt: string;
  createdAt: Date;
}

type User = Pick<DatabaseUser, 'id' | 'username' | 'password'>;

export class DatabaseService {
  pool: DatabasePool;

  constructor(pool: DatabasePool) {
    this.pool = pool;
  }

  async insertUser(user: User): Promise<QueryResult<DatabaseUser>> {
    const { username, password } = user;
    const { salt, hashedPassword } = hashAndSaltPassword(password);
    const createdAt = dateTimeAsTimestamp(new Date());

    return this.pool.connect((connection) => {
      return connection.query<DatabaseUser>(
        sql`INSERT INTO users (id, username, password, salt, createdAt) VALUES (${uuidv4()}, ${username}, ${hashedPassword}, ${salt} ${createdAt})`
      );
    });
  }
}
