Download the App

1. Download the package provided in this [link](https://expo.dev/accounts/wzhua.02/projects/DailyEmote/builds/2626c71b-c613-45b1-a09c-51f64d9a68cb).
2. Unzip the package with [WinRAR](https://www.win-rar.com/download.html?&L=0) and select the release version (app-release.apk)
3. Download the apk on an android device OR drag and drop the apk into a virtual android device.

To debug the program, follow these steps:

1. **Requires Andriod Emulators either via Mobile Device or Virtual Device Emulator!**

   (Andriod Device)
   <br />
   Download [Expo Go](https://expo.dev/go) from the Google Play Store.
   
   (Virtual Device Emulator)<br />
   Follow the instructions  on the appropriate platform from [Expo documentation](https://docs.expo.dev/get-started/set-up-your-environment/?platform=android&device=simulated&mode=development-build&buildEnv=local) to set up [Android Studio](https://developer.android.com/studio).<br />**(Avoid "Running your app on an Android Emulator" step)**

2. Clone the repository to your local machine:
   ```
   git clone git@github.com:CloudKai/DailyEmote.git <Your local folder>
   ```
3. Go to <Your local folder> and Install expo:
   ```
   git checkout AppDeployment
   npm install expo
   ```
4. Once expo is installed, run the project with:
   ```
   npx expo start -c
   ```
   (Open project via **Andriod** Device)<br />
   Scan the QR code generated in the terminal to open the app.
   
   (Open project via Virtual Device Emulator)<br />
   After setting up Android Studio, press ‘a’ in the terminal, the app will open in the virtual device.
