import React, {useState} from 'react';
import {AuthField, AuthForms, ErrorsInValues, SignInValues} from '../../types/auth';
import {
  Error,
  Form,
  FormHeader,
  FormHeaderItem,
  FormWrapper,
  Input,
  InputWrapper,
  Label,
  SubmitButton,
  Title,
  Wrapper,
  ServerError,
} from './styles';

type SignInField = keyof SignInValues;
type SignInProps = {
  loading?: boolean;
  onSubmit: (form: AuthForms) => void;
  errors: Partial<ErrorsInValues>;
  cleanState: () => void;
  onChange: (values: {name: SignInField; value: SignInValues[SignInField]}) => void;
  values: Partial<SignInValues>;
};

export const AuthComponent: React.FC<SignInProps> = ({onSubmit, onChange, values, errors, loading, cleanState}) => {
  const [isRegistering, setIsRegistering] = useState(true);
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    onSubmit(isRegistering ? AuthForms.registration : AuthForms.login);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({name: e.target.name as SignInField, value: e.target.value});
  };

  const toggleForm = () => {
    cleanState();
    setIsRegistering(!isRegistering);
  };

  return (
    <Wrapper>
      {(errors.server && <ServerError>Sorry,{errors.server}</ServerError>) || (
        <Title>{isRegistering ? 'Welcome to your new to-do list' : 'Welcome back'}</Title>
      )}
      <FormWrapper>
        <FormHeader>
          <FormHeaderItem theme={{select: isRegistering && true}} onClick={toggleForm}>
            Registration
          </FormHeaderItem>
          <FormHeaderItem theme={{select: !isRegistering && true}} onClick={toggleForm}>
            Login
          </FormHeaderItem>
        </FormHeader>
        <Form onSubmit={handleSubmit}>
          {isRegistering && (
            <>
              <InputWrapper>
                <Label htmlFor="name">Your name:</Label>
                <Input
                  type="text"
                  id="name"
                  value={values[AuthField.username]}
                  name={AuthField.username}
                  onChange={handleChange}
                />
                {errors.username && <Error>{errors.username}</Error>}
              </InputWrapper>
            </>
          )}
          <InputWrapper>
            <Label htmlFor="email">Email:</Label>
            <Input id="email" value={values[AuthField.email]} name={AuthField.email} onChange={handleChange} required />
            {errors.email && <Error>{errors.email}</Error>}
          </InputWrapper>
          <InputWrapper>
            <Label htmlFor="password">Password:</Label>
            <Input
              type="password"
              id="password"
              value={values[AuthField.password]}
              name={AuthField.password}
              onChange={handleChange}
            />
            {errors.password && <Error>{errors.password}</Error>}
          </InputWrapper>
          <SubmitButton type="submit" disabled={loading}>
            {isRegistering ? 'Register' : 'Login'}
          </SubmitButton>
        </Form>
      </FormWrapper>
    </Wrapper>
  );
};
