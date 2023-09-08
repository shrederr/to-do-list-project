import { Model, Table, Column, DataType, HasMany } from 'sequelize-typescript';
import { Task } from '../tasks/tasks.model';

interface UserCreationsAttrs {
  email: string;
  password: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationsAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  email: string;
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;
  @Column({
    type: DataType.STRING,
    unique: false,
    allowNull: false,
  })
  name: string;
  @HasMany(() => Task)
  tasks: Task[];
}
