import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtStrategy } from './strategy/jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
    imports: [
        JwtModule.registerAsync({
          imports: [ConfigModule], 
          useFactory: async (configService: ConfigService) => ({
            secret: configService.get<string>('JWT_SECRET'), 
            signOptions: { expiresIn: '1h' },
          }),
          inject: [ConfigService], 
        }),
      ],
    controllers:[AuthController],
    providers:[AuthService,UsersService,PrismaService,JwtStrategy],
    exports:[]
})
export class AuthModule {}
