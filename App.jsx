import { NativeModules, StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import CodePush from "react-native-code-push";

const { ManageAppSDKModule } = NativeModules;

const App = () => {
  const [count, setCount] = useState(0);

  const launchManageAppSDK = () => {
    ManageAppSDKModule?.launchManageAppSDK({
      accessToken:
        "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI0MDU3MTEzMTM2MTc3NTcxNzU0MDIzNyIsImV4cCI6MTc3NTcxNzY2MCwidG9rZW5VdWlkIjoiNDA1NzExMzEzNjE3NzU3MTc1NDAyMzciLCJjb212aXZhQWNjb3VudElkIjoiNDA1NzExMzEzNiIsImFub255bW91c0lkIjoiIiwic3Vic2NyaWJlcklkIjoiIiwibWl4cGFuZWxJZCI6IkJJTkdFLThhMWY4MzhmOTJlYjQ5NTA4Y2VkNGQ1Y2Q5MTZlYTVlIiwicm1uIjoiOTQ4NTc2OTg0NyIsImFnZW50SWQiOiJudWxsIiwiYWdlbnRUeXBlIjoiIiwidXNlclR5cGUiOiJOb24gRFRIIFVzZXIiLCJwbGF0Zm9ybSI6IldFQiIsImR0aFN0YXR1cyI6Im51bGwiLCJkZXZpY2VJZCI6IjE3NjY0NjQyNjIwNzYiLCJhbmFseXRpY1NvdXJjZSI6IkhhbWJ1cmdlci1TdWJzY3JpYmUtQ1RBIiwicmV0dXJuVXJsIjoiaHR0cHM6Ly9zdGFnaW5nLXdlYi1mcm0udmlkZW9yZWFkeS50di8_dGlja1RpY2s9dHJ1ZSIsImJpbmdlQWNjb3VudElkIjoiNjExMTI4NTQzNyIsInNvdXJjZSI6IkJJTkdFX09UVCIsImpvdXJuZXlTb3VyY2UiOiJEUkFXRVIjQ1lPUCIsImpvdXJuZXlTb3VyY2VSZWZsZCI6IiIsInByb21vQ29kZSI6Im51bGwiLCJ2b3VjaGVyQ29kZSI6Im51bGwiLCJ1dGNUaW1lc3RhbXAiOiIxNzc1NzE3NTQwMjM3IiwiYXBwc0ZseWVyIjoie1wiYXBwc2ZseWVySWRcIjpcIjlhZGZjNDg3LTk3MDgtNDczYy1iYTk0LWE5NDU5MWYwNzRkOS1wXCIsXCJhZHZlcnRpc2luZ0lkXCI6XCI0MDU3MTEzMTM2XCIsXCJjdXN0b21lclVzZXJJZFwiOlwibnVsbFwiLFwiYXBwVmVyc2lvbk5hbWVcIjpcIlwiLFwib3NcIjpcIlwiLFwiaXBcIjpcIm51bGxcIixcImV2ZW50Q3VycmVuY3lcIjpcIm51bGxcIlwiZGV2aWNlXCI6XCJXRUJcIn0iLCJiaW5nZUFueXdoZXJlIjpmYWxzZSwib3JpZ2luIjoiRFJBV0VSI0NZT1AiLCJhcHBsaWVkQ291cG9uRGV0YWlscyI6IiIsImRpc2FibGVXYWxsZXQiOiIiLCJ0b2tlblR5cGUiOiJhY2Nlc3NUb2tlbiIsInplcm9BcHBTb3VyY2UiOiJudWxsIiwiY29udGVudE5hbWUiOiJudWxsIiwiY2FydEluZm8iOmZhbHNlLCJyZWZlcnJhbFNvdXJjZSI6IiIsImFkZGl0aW9uYWxJbmZvIjoiIn0.QNa_dGtmQkARW4MW_F5amIZV8KiIdZlzzsfCLuFr-65w8odsfkoZCOK_kv8gUCvfTsJe0K1T57rGDQ1RnAs3Mg",
      obj1: 123,
      obj2: true,
      obj3: null,
      obj4: undefined,
      obj5: 1.2,
    });
    console.log("NATIVE MODULES NativeModules: ", NativeModules);
    console.log("NATIVE MODULES ReactActivityModule: ", ManageAppSDKModule);
  };

  CodePush.notifyAppReady();

  return (
    <View style={styles.container}>
      <View style={styles.counter}>
        <TouchableOpacity style={styles.countBtn} onPress={() => setCount(prev => prev - 1)}>
          <Text style={styles.countText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.count}>Count: {count}</Text>
        <TouchableOpacity style={styles.countBtn} onPress={() => setCount(prev => prev + 1)}>
          <Text style={styles.countText}>+</Text>
        </TouchableOpacity>
      </View>

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
  counter: {
    flexDirection: "row",
    padding: 10,
    margin: 10,
    justifyContent: "space-evenly",
  },
  count: {
    fontSize: 13,
    fontWeight: 600,
    marginHorizontal: 20,
  },
  countBtn: {
    padding: 5,
    backgroundColor: "grey",
  },
  countText: {
    margin: 5,
    fontSize: 10,
    color: "white",
  },
});
