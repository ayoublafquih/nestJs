import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { BookmarkService } from './bookmark.service';
import { JwtGuard } from '../auth/guard';
import { GetUser } from 'src/auth/decorator';
import { CreateBookMarkDto } from './dto';
import { EditBookMarkDto } from './dto';

@UseGuards(JwtGuard)
@Controller('bookmarks')
export class BookmarkController {
    constructor(private readonly bookmarkService: BookmarkService) { }


    @Post('create')
    createBookmark(@GetUser('id', ParseIntPipe) userId: number, @Body() dto: CreateBookMarkDto) {
        return this.bookmarkService.createBookmark(userId, dto);
    }

    @Get()
    getBookMarks(@GetUser('id', ParseIntPipe) userId: number) {
        return this.bookmarkService.getBookMarks(userId);
    }

    @Get(':id')
    getBookMarksById(
        @GetUser('id', ParseIntPipe) userId: number,
        @Param('id', ParseIntPipe) id: number) {
        return this.bookmarkService.getBookMarksById(userId, id);
    }

    @Patch(':id')
    editBookmark(
        @GetUser('id', ParseIntPipe) userId: number,
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: EditBookMarkDto
    ) {
        return this.bookmarkService.editBookmark(userId, id, dto);
    }

    @Delete(':id')
    deleteBookmark(
        @GetUser('id', ParseIntPipe) userId: number,
        @Param('id', ParseIntPipe) id: number) {
        return this.bookmarkService.deleteBookmark(userId, id);
    }
}
