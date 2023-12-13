import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import * as pactum from 'pactum';
import {
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';
import { PrismaService } from '../src/prisma/prisma.service';
import { AuthDto } from 'src/auth/dto';


describe('App e2e', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  beforeAll(async () => {
    const moduleRef =
      await Test.createTestingModule({
        imports: [AppModule],
      }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({ whitelist: true }),
    );

    await app.init();
    await app.listen(3333);

    prisma = await app.get(PrismaService);
    prisma.cleanDb();

    pactum.request.setBaseUrl('http://localhost:3333')
  });

  afterAll(() => {
    app.close();
  });

  // AUTH
  describe('Auth', () => {
    const authDto: Partial<AuthDto> = {
      email: 'test@gmail.com',
      password: 'password',
      firstName: 'firstName',
      lastName: 'lastName'
    };
    describe('Signup', () => {
      it('should throw erro if email empty', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({
            email: authDto.email,
          })
          .expectStatus(400)
      });

      it('should throw erro if password empty', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({
            password: authDto.password,
          })
          .expectStatus(400)
      });

      it('should throw erro if no body provided', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .expectStatus(400)
      });

      it('should signup', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody(authDto)
          .expectStatus(201)
      });
    });

    describe('Signin', () => {
      it('should throw erro if email empty', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({
            email: authDto.email,
          })
          .expectStatus(400)
      });

      it('should throw erro if password empty', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({
            password: authDto.password,
          })
          .expectStatus(400)
      });

      it('should throw erro if no body provided', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .expectStatus(400)
      });

      it('should signin', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody(authDto)
          .expectStatus(200)
          // .inspect()
          .stores('userAt', 'access_token');
      });
    });
  });

  // USER
  describe('User', () => {
    describe('Get me', () => {
      it('should get current user', () => {
        return pactum
          .spec()
          .get('/users/me')
          .withBearerToken('$S{userAt}')
          .expectStatus(200)
      })
    });
    describe('Edit User', () => {
      const editDto: Partial<AuthDto> = {
        email: 'test2@gmail.com',
        firstName: 'firstName2',
        lastName: 'lastName2'
      };
      it('shoud update edit user', () => {
        return pactum
          .spec()
          .patch('/users/me')
          .withBody(editDto)
          .withBearerToken('$S{userAt}')
          .expectStatus(200)
          .expectJsonLike(editDto)
      })
    });
  });

  // BOOKMARKS
  describe('Bookmarks', () => {
    describe('Create Bookmark', () => {
      it.todo('');
    });
    describe('Get Bookmarks', () => {
      it.todo('');
    });
    describe('Get Bookmark by Id', () => {
      it.todo('');
    });
    describe('Edit Bookmark', () => {
      it.todo('');
    });
    describe('Delete Bookmark', () => {
      it.todo('');
    });
  });
});
