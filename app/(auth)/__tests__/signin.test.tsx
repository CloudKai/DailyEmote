//Not working!
import React from 'react'
import SignInPage from '../signin';
import '@testing-library/jest-dom';
import { FIREBASE_AUTH } from '../../../FireBaseConfig';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged, initializeAuth, getIdToken } from 'firebase/auth';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Alert } from 'react-native';
//Install these 2 dependancies then install expo again to work


jest.spyOn(Alert, 'alert');

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


// it('Show all errors when sign in failed', async () => {
//   const page = render(<SignInPage />);

//   const loginButton = page.getByTestId("loginButton");
//   const emailTextInput = page.getByTestId("emailTextBox");
//   const pwdTextInput = page.getByTestId("pwdTextBox");

//   //Empty Fields
//   fireEvent.changeText(emailTextInput, "");
//   fireEvent.changeText(pwdTextInput, "");
//   await fireEvent.press(loginButton);
//   expect(Alert.alert).toHaveBeenCalledWith('Invalid Email', 'Enter a valid email');
//   // fireEvent.press(Alert.prompt[0]);

//   //Invalid Email
//   fireEvent.changeText(emailTextInput, "kai");
//   fireEvent.changeText(pwdTextInput, "");
//   await fireEvent.press(loginButton);
//   expect(Alert.alert).toHaveBeenCalledWith('Invalid Email', 'Enter a valid email');
  

//   //Valid Email but Empty Pwd Fields
//   fireEvent.changeText(emailTextInput, "kai@gmail.com");
//   fireEvent.changeText(pwdTextInput, "");
//   await fireEvent.press(loginButton);
//   expect(Alert.alert).toHaveBeenCalledWith('Empty Password Fields', 'Enter your password');
  

//   //Valid Email but Invalid Pwd 
//   fireEvent.changeText(emailTextInput, "kai@gmail.com");
//   fireEvent.changeText(pwdTextInput, "123"); //Incorrect Password for email
//   await fireEvent.press(loginButton);
//   expect(Alert.alert).toHaveBeenCalledWith('Invalid credentials', 'Wrong credentials');

// })


it('Able to go to sign up page', () => {
  const page = render(<SignInPage />);

})

it('Sign in Successfully', async () => {
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

