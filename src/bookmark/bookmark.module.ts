import { Module } from '@nestjs/common';
import { BookmarkService } from './bookmark.service';
import { BookmarkController } from './bookmark.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BookmarkSchema } from 'src/schema/book.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Book', schema: BookmarkSchema }]),
  ],
  providers: [BookmarkService],
  controllers: [BookmarkController],
})
export class BookmarkModule {}
