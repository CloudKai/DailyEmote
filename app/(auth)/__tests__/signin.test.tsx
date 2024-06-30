import React from 'react'
import SignInPage from '../signin';
import '@testing-library/jest-dom';
import { FIREBASE_AUTH } from '../../../FireBaseConfig';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged, initializeAuth, getIdToken } from 'firebase/auth';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
//Install these 2 dependancies then install expo again to work
//WASTE MY TIME!


it('Check all elements are present', () => {
  const page = render(<SignInPage />);
  // Snapshot of the page
  // expect(tree).toMatchSnapshot();

  //Image Logo is present
  expect(page.getByTestId('logo'));

  //TextBoxes w the right placeholder are present
  expect(page.getByTestId("emailTextBox").props.placeholder).toEqual("Email");
  expect(page.getByTestId("pwdTextBox").props.placeholder).toEqual("Password");

  //Buttons are present
  expect(page.getByTestId("loginButton"));
  expect(page.getByTestId("signUpButton"));
})


it('Sign in Successfully', async() => {
  const page = render(<SignInPage />);

  const loginButton = page.getByTestId("loginButton");
  const emailTextInput = page.getByTestId("emailTextBox");
  const pwdTextInput = page.getByTestId("pwdTextBox");

  const email = "kaim@gmail.com";
  const password = "kai123";

  fireEvent.changeText(emailTextInput, email);
  fireEvent.changeText(pwdTextInput, password);
  await fireEvent.press(loginButton);
  // const user = await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
  // expect(user.user).toBeTruthy();
  // expect(FIREBASE_AUTH.currentUser).not.toBe(null);

  // expect(page).toMatchSnapshot();
})


it('Show error when sign in failed', async () => {
  const page = render(<SignInPage />);

})


it('Able to go to sign up page', () => {
  const page = render(<SignInPage />);

})


