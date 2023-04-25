import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const db = process.env.DATABASE_URI || 'mongodb://localhost:27017/chatroom';
console.log(db);
const config: TypeOrmModuleOptions = {
  type: 'mongodb',
  url: db,
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: true,
};

export default config;
