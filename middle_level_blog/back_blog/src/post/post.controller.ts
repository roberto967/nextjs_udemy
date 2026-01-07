import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { PostResponseDto } from './dto/post-response.dto';
import { JwtAuthGuard } from '@/auth/guard/jwt-auth.guard';
import type { AuthenticatedRequest } from '@/auth/types/authenticated-request';
import { UpdatePostDto } from './dto/update-post.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('jwt-auth')
  @ApiOperation({ summary: 'Create a new post for the authenticated user' })
  @ApiResponse({
    status: 201,
    type: PostResponseDto,
    description: 'The post has been created.',
  })
  async create(
    @Req() req: AuthenticatedRequest,
    @Body() dto: CreatePostDto,
  ): Promise<PostResponseDto> {
    const post = await this.postService.create(dto, req.user);
    return new PostResponseDto(post);
  }

  @Get('me/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('jwt-auth')
  @ApiOperation({ summary: 'Get a post owned by the authenticated user' })
  @ApiResponse({
    status: 200,
    description: 'The post owned by the authenticated user.',
    type: PostResponseDto,
  })
  async findOneOwned(
    @Req() req: AuthenticatedRequest,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<PostResponseDto> {
    const post = await this.postService.findOneOwnedOrFail({ id }, req.user);
    return new PostResponseDto(post);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('jwt-auth')
  @ApiOperation({ summary: 'Get all posts owned by the authenticated user' })
  @ApiResponse({
    status: 200,
    description: 'List of posts owned by the authenticated user.',
    type: [PostResponseDto],
  })
  async findAllOwned(@Req() req: AuthenticatedRequest) {
    const posts = await this.postService.findAllOwned(req.user);
    return posts.map(post => new PostResponseDto(post));
  }

  @Patch('me/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('jwt-auth')
  @ApiOperation({ summary: 'Update a post owned by the authenticated user' })
  @ApiResponse({
    status: 200,
    description: 'The post owned by the authenticated user has been updated.',
    type: PostResponseDto,
  })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Req() req: AuthenticatedRequest,
    @Body() dto: UpdatePostDto,
  ) {
    const post = await this.postService.update({ id }, dto, req.user);
    return new PostResponseDto(post);
  }

  @Delete('me/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('jwt-auth')
  @ApiOperation({ summary: 'Delete a post owned by the authenticated user' })
  @ApiResponse({
    status: 200,
    description: 'The post owned by the authenticated user has been deleted.',
    type: PostResponseDto,
  })
  async remove(
    @Param('id', ParseUUIDPipe) id: string,
    @Req() req: AuthenticatedRequest,
  ) {
    const post = await this.postService.remove({ id }, req.user);
    return new PostResponseDto(post);
  }

  @Get(':slug')
  @ApiOperation({ summary: 'Get a published post by slug' })
  @ApiResponse({
    status: 200,
    description: 'The published post.',
    type: PostResponseDto,
  })
  async findOnePublished(@Param('slug') slug: string) {
    const post = await this.postService.findOneOrFail({
      slug,
      published: true,
    });
    return new PostResponseDto(post);
  }

  @Get()
  @ApiOperation({ summary: 'Get all published posts' })
  @ApiResponse({
    status: 200,
    description: 'List of published posts.',
    type: [PostResponseDto],
  })
  async findAllPublished() {
    const posts = await this.postService.findAll({ published: true });
    return posts.map(post => new PostResponseDto(post));
  }
}
