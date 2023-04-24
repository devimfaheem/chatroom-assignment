import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const config: TypeOrmModuleOptions = {
  type: 'mongodb',
  url: 'mongodb://localhost:27017/chatroom',
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: true,
};

export default config;
