import { CacheModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientService } from './services/client/client.service';
import { PetService } from './services/pet/pet.service';
import { ClientController } from './controllers/client/client.controller';
import { AccountService } from './services/account/account.service';
import { AccountController } from './controllers/account/account.controller';
import { ClientSchema } from './schemas/client.schema';
import { UserSchema } from './schemas/user.schema';
import { AuthService } from './services/auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/shared/strategies/jwt.strategy';
import { PetController } from './controllers/pet/pet.controller';
import { MulterModule } from '@nestjs/platform-express';
import { AccountFacade } from './facades/account.facade';
@Module({
  providers: [ClientService, PetService, AccountService, AuthService,JwtStrategy,AccountFacade],
  controllers: [ClientController, AccountController, PetController],
  imports: [
    CacheModule.register(),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    MulterModule.register(),
    JwtModule.register({
            secretOrPrivateKey: 'secretKey',
            signOptions: {
                expiresIn: 3600,
            },
        }),
    MongooseModule.forFeature([
        {
          name:'Client',
          schema: ClientSchema
        },
        {
          name:'User',
          schema: UserSchema
        }
    ])
  ]})
export class BackofficeModule {}
