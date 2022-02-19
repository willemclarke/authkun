import { DatabasePool, sql } from 'slonik';
import { v4 as uuidv4 } from 'uuid';

interface DatabaseUser {
  id: string;
  username: string;
  email: string;
  password: string;
  createdAt: Date;
  resetPasswordToken: string;
}

type User = Pick<DatabaseUser, 'id' | 'username' | 'email' | 'password'>;

class DatabaseService {
  pool: DatabasePool;

  constructor(pool: DatabasePool) {
    this.pool = pool;
  }

  async insertUser(user: User) {
    const { email, username, password } = user;
    // TODO: have hashing function for password
    // TODO: then write slonik sql query to write
  }
}
