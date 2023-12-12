import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import {
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';
import { PrismaService } from '../src/prisma/prisma.service';

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

    prisma = await app.get(PrismaService);
    prisma.cleanDb();
  });

  afterAll(() => {
    app.close();
  });

  // AUTH
  describe('Auth', () => {
    describe('Signup', () => {});
    describe('Signin', () => {});
  });

  // USER
  describe('User', () => {
    describe('Get me', () => {
      it.todo('');
    });
    describe('Edit User', () => {
      it.todo('');
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
