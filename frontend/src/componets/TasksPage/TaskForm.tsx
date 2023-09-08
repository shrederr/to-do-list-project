import React, {useEffect, useRef, useState} from 'react';
import {
  DefaultIconButton,
  LoadImage,
  LoadImageWrapper,
  PreviewImg,
  TaskContent,
  TaskTitle,
  TaskTitleWrapper,
  TitleButton,
  ViewTaskWrapper,
} from './styles';
import {Icon} from '../Icon';
import {TaskField, TaskInValues} from '../../types/task';

type TaskInField = keyof TaskInValues;
interface Props {
  toggleForm: () => void;
  isForm: boolean;
  createTask: () => void;
  updateTask: () => void;
  changeImageFile: (file: File | null) => void;
  onChange: (next: {name: keyof TaskInValues; value: TaskInValues[TaskInField]}) => void;
  values: Partial<TaskInValues>;
}
export const TaskForm: React.FC<Props> = ({
  toggleForm,
  isForm,
  createTask,
  changeImageFile,
  values,
  updateTask,
  onChange,
}) => {
  const [selectedImage, setSelectedImage] = useState<{image: string; name: string} | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const valuesIsValid = !values.title || values.title.length === 0;
  const isCreateForm = !values.id || values.id.length === 0;
  const isServerImage = values.image && values.image?.length > 0;
  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange({name: e.target.name as TaskInField, value: e.target.value});
  };
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    isServerImage && onChange({name: TaskField.image, value: ''});
    changeImageFile(file);
    if (file && file.type.startsWith('image/')) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage({image: imageUrl, name: file.name});
    } else {
      alert('Select image (jpg, png, gif и т. д.)');
    }
  };

  const handleCustomButtonClick = () => {
    inputRef.current && inputRef.current.click();
  };

  const cancelImage = () => {
    if (inputRef.current) {
      inputRef.current.value = '';
    }
    if (selectedImage) {
      URL.revokeObjectURL(selectedImage.image);
      changeImageFile(null);
      setSelectedImage(null);

      // Сброс значения input типа file
    } else {
      onChange({name: TaskField.image, value: ''});
      setSelectedImage(null);
    }
  };
  useEffect(() => {
    selectedImage && setSelectedImage(null);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  }, [isForm]);
  return (
    <ViewTaskWrapper theme={{open: isForm}}>
      <TaskTitleWrapper>
        <TitleButton onClick={toggleForm}>Cancel</TitleButton>
        <p>{(isCreateForm && 'NewTask') || values.title}</p>
        <TitleButton onClick={isCreateForm ? createTask : updateTask} disabled={valuesIsValid}>
          {(isCreateForm && 'Create') || 'Update'}
        </TitleButton>
      </TaskTitleWrapper>
      <TaskTitle
        type={'text'}
        id={'title'}
        placeholder={'Title task'}
        value={values.title}
        name={TaskField.title}
        onChange={handleChange}
      />
      <TaskContent
        placeholder={'Content'}
        id={'content'}
        onChange={handleChange}
        value={values.content}
        name={TaskField.content}
      />
      <LoadImageWrapper>
        <input type="file" ref={inputRef} accept={'image'} style={{display: 'none'}} onChange={handleImageChange} />
        <LoadImage onClick={handleCustomButtonClick}>
          {isServerImage ? 'Select new image for task:' : 'Select image for task:'}
        </LoadImage>
        {selectedImage && (
          <>
            <DefaultIconButton onClick={cancelImage}>
              <Icon type={'cancel'} />
            </DefaultIconButton>
            <p>{selectedImage.name}</p>
          </>
        )}
      </LoadImageWrapper>
      {(isServerImage && <PreviewImg src={values.image} />) ||
        (selectedImage && <PreviewImg src={selectedImage.image} />)}
    </ViewTaskWrapper>
  );
};
