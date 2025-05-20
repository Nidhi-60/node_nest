import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { BookmarkService } from './bookmark.service';
import { IBookCreate, IBookId } from 'src/interface/Bookmark';

@Controller('books')
@UseGuards(AuthGuard('jwt'))
export class BookmarkController {
  constructor(private bookmarkService: BookmarkService) {}

  @Post('/create')
  create(@Body() body: IBookCreate) {
    return this.bookmarkService.create(body);
  }

  @Post('/list')
  list() {
    return this.bookmarkService.list();
  }

  @Post('/update/:_id')
  update(@Param() param: IBookId, @Body() body: IBookCreate) {
    return this.bookmarkService.update(param._id, body);
  }

  @Post('/delete/:_id')
  delete(@Param() param: IBookId) {
    return this.bookmarkService.delete(param._id);
  }
}
