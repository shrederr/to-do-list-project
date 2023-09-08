import {
  Model,
  Table,
  Column,
  DataType,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { User } from '../users/users.model';

interface TaskCreationsAttrs {
  title: string;
  content: string;
  userId: string;
  position: number;
  image: string;
}

@Table({ tableName: 'tasks' })
export class Task extends Model<Task, TaskCreationsAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;
  @Column({
    type: DataType.INTEGER,
    autoIncrement: false,
  })
  position: number;
  @Column({
    type: DataType.STRING,
    unique: false,
    allowNull: false,
  })
  title: string;
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  content: string;
  @Column({
    type: DataType.STRING,
  })
  image: string;
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number;
  @BelongsTo(() => User)
  creator: User;
}
