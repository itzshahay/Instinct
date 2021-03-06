import { toast } from 'react-toastify';
import { userService } from 'app/service';
import { User } from 'instinct-interfaces';
import { SessionContext } from 'app/context';
import ReCAPTCHA from 'react-google-recaptcha';
import React, { useContext, useState } from 'react';
import { RegisterModalState, defaultRegisterModalState } from './';
import { Form, Input, Icon, ModalButton, Loading, redirect, ConfigContext } from 'instinct-frontend';

export function RegisterModal() {
  const configContext = useContext(ConfigContext);
  const sessionContext = useContext(SessionContext);
  const [state, setState] = useState<RegisterModalState>(defaultRegisterModalState);

  const disabled: boolean = state.username === '' || state.password === '' || state.email === '' || state.password !== state.passwordAgain || state.recaptcha === undefined;

  function setValue<T extends keyof RegisterModalState>(key: T, value: RegisterModalState[T]): void {
    setState({
      ...state,
      [key]: value,
    });
  }

  async function tryRegister(): Promise<void> {
    try {
      setValue('showSpinner', true);
      const newUser: User = await userService.create(state.username, state.password, state.email, state.recaptcha!);
      await sessionContext.forceStart(newUser);
      redirect('home');
    } catch {
      toast.error('There was a problem creating your account.');
      setValue('showSpinner', false);
    }
  }

  return (
    <ModalButton button="Register" className="mr-2" header="Create an Account">
      <Loading isLoading={state.showSpinner} text="Creating your account...">
        <Form className="login-form" onSubmit={tryRegister}>
          <label className="username-input">
            <Input name="username" placeholder="Username" value={state.username} onChange={setValue} type="text" />
            <Icon type="user" />
          </label>
          <label className="username-input">
            <Input name="email" placeholder="Email" value={state.email} onChange={setValue} type="email" />
            <Icon type="envelope" />
          </label>
          <label className="password-input">
            <Input name="password" placeholder="Password" value={state.password} onChange={setValue} type="password" />
            <Icon type="lock" />
          </label>
          <label className="password-input">
            <Input
              name="passwordAgain"
              placeholder="Password Again"
              value={state.passwordAgain}
              onChange={setValue}
              type="password"
            />
            <Icon type="lock" />
          </label>
          <ReCAPTCHA sitekey={configContext.googleRecaptchaSiteKey} onChange={x => setValue('recaptcha', x as string)}/>,
          <button className="rounded-button blue plain" disabled={disabled} type="submit">
            Create Account
          </button>
        </Form>
      </Loading>
    </ModalButton>
  );
}
