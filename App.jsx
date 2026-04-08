import { NativeModules, StyleSheet, Text, View, Button } from "react-native";
import React from "react";
import CodePush from "react-native-code-push";

const { ReactActivityModule } = NativeModules;

const App = () => {
  const launchManageAppSDK = () => {
    ReactActivityModule?.launchManageAppSDK(
      "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxNzc1NjQzMDM5NzI3MzAwMjQzNzE1NCIsImV4cCI6MTc3NTY0MzE1OSwidG9rZW5VdWlkIjoiMTc3NTY0MzAzOTcyNzMwMDI0MzcxNTQiLCJjb212aXZhQWNjb3VudElkIjoiNDA1NzA1NzkwMyIsImFub255bW91c0lkIjoiIiwic3Vic2NyaWJlcklkIjoiMzAwMjQzNzE1NCIsIm1peHBhbmVsSWQiOiJCSU5HRS1mZjY0YTdhMjNhMmY0YTJjODg0NjBjNjc5MjMxNTNlMyIsInJtbiI6Ijc4OTMzMDQ5MzkiLCJhZ2VudElkIjoibnVsbCIsImFnZW50VHlwZSI6IiIsInVzZXJUeXBlIjoiRFRIIFdpdGggQmluZ2UgTmV3IFN0YWNrIiwicGxhdGZvcm0iOiJXRUIiLCJkdGhTdGF0dXMiOiJudWxsIiwiZGV2aWNlSWQiOiIxNzc0OTQ4NzkwNTYwIiwiYW5hbHl0aWNTb3VyY2UiOiJVUEdSQURFLVlPVVItUExBTiIsInJldHVyblVybCI6Imh0dHBzOi8vc3RhZ2luZy13ZWItZnJtLnZpZGVvcmVhZHkudHYvc3Vic2NyaXB0aW9uP3RpY2tUaWNrPXRydWUiLCJiaW5nZUFjY291bnRJZCI6IjYxMTEyODAxMTMiLCJzb3VyY2UiOiJNU0FMRVMiLCJqb3VybmV5U291cmNlIjoiTVNBTEVTI01ZUExBTiIsImpvdXJuZXlTb3VyY2VSZWZsZCI6IiIsInByb21vQ29kZSI6Im51bGwiLCJ2b3VjaGVyQ29kZSI6Im51bGwiLCJ1dGNUaW1lc3RhbXAiOiIxNzc1NjQzMDM5NzI3IiwiYXBwc0ZseWVyIjoie1wiYXBwc2ZseWVySWRcIjpcIjU1ZTE1NGZjLTViM2YtNDE1OS04YWQwLTEzMTc2ZjgwNzhhZC1wXCIsXCJhZHZlcnRpc2luZ0lkXCI6XCI0MDU3MDU3OTAzXCIsXCJjdXN0b21lclVzZXJJZFwiOlwibnVsbFwiLFwiYXBwVmVyc2lvbk5hbWVcIjpcIlwiLFwib3NcIjpcIlwiLFwiaXBcIjpcIm51bGxcIixcImV2ZW50Q3VycmVuY3lcIjpcIm51bGxcIlwiZGV2aWNlXCI6XCJXRUJcIn0iLCJiaW5nZUFueXdoZXJlIjpmYWxzZSwib3JpZ2luIjoibXktcGxhbi1lZGl0IiwiYXBwbGllZENvdXBvbkRldGFpbHMiOiIiLCJkaXNhYmxlV2FsbGV0IjoiIiwidG9rZW5UeXBlIjoiYWNjZXNzVG9rZW4iLCJ6ZXJvQXBwU291cmNlIjoibnVsbCIsImNvbnRlbnROYW1lIjoibnVsbCIsImNhcnRJbmZvIjpmYWxzZSwicmVmZXJyYWxTb3VyY2UiOiIiLCJhZGRpdGlvbmFsSW5mbyI6IiJ9.wdc4InArSamNzudUCKNDFP-PvsPpEszMRI-m2_XzlQgq_d87j9v4HoIfNo4z2Aan_3f7pde6p4klJ1lAbdd3vg",
    );
    console.log("NATIVE MODULES", ReactActivityModule?.launchManageAppSDK);
  };

  CodePush.notifyAppReady();

  return (
    <View style={styles.container}>
      <Text>App</Text>

      <Button title="Launch SDK" onPress={launchManageAppSDK} />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
