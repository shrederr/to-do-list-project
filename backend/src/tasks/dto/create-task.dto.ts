export class CreateTaskDto {
  readonly title: string;
  readonly content: string;
}

export class UpdateTaskDto extends CreateTaskDto {
  readonly id: string;
  readonly image?: string;
}
