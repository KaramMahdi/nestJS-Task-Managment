import { TypeOrmModuleOptions } from '@nestjs/typeorm'

export const TypeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '123123',
    database: 'taskmanagment',
    entities: [__dirname + '/../**/*.entity.{js,ts}'], // Note: {js, ts} err not found Task Entity
    synchronize: true,
}

