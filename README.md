Install [Git](https://github.com/git-guides/install-git) if you do not have it.

To test the program:

1. **Requires Andriod Emulators either via Mobile Device or Virtual Device Emulator!**

   (Andriod Device)
   <br />
   Download [Expo Go](https://expo.dev/go) from the Google Play Store.
   
   (Virtual Device Emulator)<br />
   Follow the instructions  on the appropriate platform from [Expo documentation](https://docs.expo.dev/get-started/set-up-your-environment/?platform=android&device=simulated&mode=development-build&buildEnv=local) to set up [Android Studio](https://developer.android.com/studio).<br />**(Avoid "Running your app on an Android Emulator" step)**

3. Clone the repository to your local machine:
   ```
   git clone git@github.com:CloudKai/DailyEmote.git <Your local folder>
   [move to <Your local folder>)]
   git checkout AppDeployment 
   or
   Download the zip file from AppDeployment branch
   ```
4. Install expo:
   ```   
   npm install expo
   ```
5. Once expo is installed, run the project with:
   ```
   npx expo start -c
   ```
   (Open project via **Andriod** Device)<br />
   Scan the QR code generated in the terminal to open the app.
   
   (Open project via Virtual Device Emulator)<br />
   After setting up Android Studio, press ‘a’ in the terminal, the app will open in the virtual device.

   Wait for the app to be installed completely. Thank You!
