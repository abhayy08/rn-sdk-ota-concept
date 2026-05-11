# Installing Manage App SDK package

First install the package through npm or yarn

```bash
yarn add @abhay_sharma/manage-app-sdk

              OR

npm install @abhay_sharma/manage-app-sdk
```

# Android Setup

## app/build.gradle

add the following line at the end of your app-level build.gradle file

```gradle
// add this at the end of the file

apply from: "../../node_modules/@revopush/react-native-code-push/android/codepush.gradle"
```

## strings.xml

add the following line at the end of your app-level build.gradle file

```xml
<resources>
    ...
    <string moduleConfig="true" name="CodePushServerUrl">https://api.revopush.org</string>
    <string moduleConfig="false" name="CodePushDeploymentKey">rYVVQlHjw93w7jeHOt1qyGFF_GfWEysSNhz0Xe</string>
</resources>

```
