import {
  Controller,
  Post,
  Get,
  Body,
  Headers,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { CreateTaskDto, UpdateTaskDto } from './dto/create-task.dto';
import { TasksService } from './tasks.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  createTask(
    @Headers('authorization') sessionToken: string,
    @Body() dto: CreateTaskDto,
    @UploadedFile() image: { buffer: Buffer } | undefined | null,
  ) {
    return this.taskService.create(sessionToken, dto, (image && image) || null);
  }
  @Post('/updateTask')
  @UseInterceptors(FileInterceptor('image'))
  updateTask(
    @Headers('authorization') sessionToken: string,
    @Body() dto: UpdateTaskDto,
    @UploadedFile() image: { buffer: Buffer } | null,
  ) {
    const currentImage = image ? image : dto.image ? dto.image : null;
    return this.taskService.update(sessionToken, currentImage, dto);
  }
  @Post('/deleteTask')
  deleteTask(
    @Headers('authorization') sessionToken: string,
    @Body() body: { id: string },
  ) {
    return this.taskService.delete(sessionToken, body.id);
  }
  @Post('/updateTasksPositions')
  updateTasksPositions(
    @Headers('authorization') sessionToken: string,
    @Body() body: { id: string; newTaskPosition: number },
  ) {
    return this.taskService.updateTasksPosition(sessionToken, body);
  }
  @Get('/getAllTasks')
  getAllUserTasks(@Headers('authorization') sessionToken: string) {
    return this.taskService.getAllUserTasks(sessionToken);
  }
  @Get('/getTask')
  getTask(
    @Headers('authorization') sessionToken: string,
    @Body() body: { id: string },
  ) {
    return this.taskService.getTask(sessionToken, body.id);
  }
}
