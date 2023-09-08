import { Injectable } from '@nestjs/common';
import { CreateTaskDto, UpdateTaskDto } from './dto/create-task.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize, Op } from 'sequelize';
import { Task } from './tasks.model';
//import { FilesService } from '../files/files.service';
import { AuthService } from '../auth/auth.service';
import { UploadService } from '../upload/upload.service';
import { ValidationException } from '../exceptions/validation.exception';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task) private taskRepository: typeof Task,
    private fileService: UploadService,
    private authService: AuthService,
  ) {}
  async create(
    sessionToken: string,
    dto: CreateTaskDto,
    image: { buffer: Buffer } | null,
  ) {
    const fileName = image
      ? ((await this.fileService.uploadFile(image)) as string)
      : '';
    const user = await this.authService.validateUserRequest(
      sessionToken,
      'Please login to app',
    );
    const position = await this.getLastPositionOfList(user.id.toString());
    const task = await this.taskRepository.create({
      ...dto,
      image: fileName,
      userId: user.id.toString(),
      position: position + 1,
    });
    return task;
  }
  async update(
    sessionToken: string,
    image: { buffer: Buffer } | null | string | undefined,
    dto: UpdateTaskDto,
  ) {
    const user = await this.authService.validateUserRequest(
      sessionToken,
      'Please login to app',
    );
    const fileName = image ? await this.fileService.uploadFile(image) : '';
    try {
      //add update image
      const response = await this.taskRepository.update(
        { title: dto.title, content: dto.content, image: fileName },
        {
          where: { userId: user.id.toString(), id: dto.id },
          returning: false,
        },
      );
      if (response) {
        return { success: true };
      }
    } catch (e) {
      throw new ValidationException('Something went wrong');
    }
  }
  async updateTasksPosition(
    sessionToken: string,
    body: { id: string; newTaskPosition: number },
  ) {
    const user = await this.authService.validateUserRequest(
      sessionToken,
      'Please login to app',
    );
    if (!user) {
      throw new ValidationException('User is not found');
    }
    const prevTask = await this.taskRepository.findOne({
      where: { userId: user.id.toString(), id: body.id },
      rejectOnEmpty: false,
    });
    if (!prevTask) {
      throw new ValidationException('Such a task does not exist');
    }
    try {
      const prevPosition = prevTask.position;
      const newPosition = Number(body.newTaskPosition);

      if (prevPosition === newPosition) {
        return { success: true };
      }
      const updateCondition = {
        userId: user.id.toString(),
        position:
          prevPosition < newPosition
            ? { [Op.gt]: prevPosition, [Op.lte]: newPosition }
            : { [Op.gte]: newPosition, [Op.lt]: prevPosition },
      };

      await this.taskRepository.update(
        {
          position: Sequelize.literal(
            prevPosition < newPosition ? 'position - 1' : 'position + 1',
          ),
        },
        { where: updateCondition, returning: false },
      );
      await this.taskRepository.update(
        { position: newPosition },
        {
          where: { userId: user.id.toString(), id: body.id },
          returning: false,
        },
      );

      return { success: true };
    } catch (e) {
      throw new ValidationException('Such a task does not exist');
    }
  }

  async delete(sessionToken: string, taskId: string) {
    const user = await this.authService.validateUserRequest(
      sessionToken,
      'Please login to app',
    );
    try {
      const task = await this.taskRepository.findOne({
        where: { userId: user.id.toString(), id: taskId },
        rejectOnEmpty: false,
      });
      await this.taskRepository.update(
        {
          position: Sequelize.literal('position - 1'),
        },
        {
          where: {
            userId: user.id.toString(),
            position: { [Op.gt]: task.position },
          },
          returning: false,
        },
      );
      const response = await this.taskRepository.destroy({
        where: { userId: user.id.toString(), id: taskId },
      });
      if (response) {
        return { success: true };
      }
    } catch (e) {
      throw new ValidationException('Something went wrong');
    }
  }
  async getAllUserTasks(sessionToken: string) {
    const user = await this.authService.validateUserRequest(
      sessionToken,
      'Please login to app',
    );
    const tasks = await this.taskRepository.findAll({
      where: { userId: user.id },
      order: [['position', 'DESC']],
    });
    return tasks;
  }
  async getTask(sessionToken: string, taskId: string) {
    const user = await this.authService.validateUserRequest(
      sessionToken,
      'Please login to app',
    );
    return this.taskRepository.findOne({
      where: { userId: user.id, id: taskId },
      include: { all: true },
      rejectOnEmpty: false,
    });
  }
  private async getLastPositionOfList(userId: string): Promise<number> {
    const position = await this.taskRepository.max('position', {
      where: { userId },
    });
    if (typeof position === 'number') {
      return position;
    }
    return 0;
  }
}
