import React, { useState, useEffect, useContext } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
} from "react-native";
import AuthContext from "../../auth/context";
import postsApi from "../../api/postsApi";
import Button from "../../components/Button";
import ScreenTemplate from "../../components/ScreenTemplate";
import { ScrollView } from "react-native-gesture-handler";

const predefinedTopics = [
  "Anxiety",
  "Depression",
  "ADHD",
  "BPD",
  "PTSD",
  "Bipolar",
  "Eating Related Issues",
  "Schizophrenia",
  "Narcissism",
  "Anger",
  "Self Esteem & Confidence",
  "OCD",
  "Others",
];

const AddPost = (props) => {
  const [postText, setPostText] = useState("");
  const [selectedTopics, setSelectedTopics] = useState([]);
  const authContext = useContext(AuthContext);

  useEffect(() => {
    props.navigation.setOptions({
      title: "Create",
      headerTitleStyle: { fontSize: 24 },
    });
  }, []);

  const toggleTopic = (topic) => {
    if (selectedTopics.includes(topic)) {
      setSelectedTopics(
        selectedTopics.filter((selectedTopic) => selectedTopic !== topic)
      );
    } else {
      if (selectedTopics.length < 2) {
        setSelectedTopics([...selectedTopics, topic]);
      } else {
        setSelectedTopics([]);
      }
    }
  };

  const placePost = async () => {
    if (selectedTopics.length < 1 || postText == "") {
      setPostText("");
      setSelectedTopics([]);
    } else {
      const postData = {
        content: postText.trim(),
        user: authContext.user._id,
        topics: selectedTopics,
      };

      try {
        const response = await postsApi.AddPost(postData);

        if (response.status === 201) {
          console.log("Post created:", response.data);
        } else {
          console.error("Error creating post:", response.data.message);
        }
      } catch (error) {
        console.error("Error creating post:", error.message);
      }

      // Clear the text input and selected topics after creating the post
      setPostText("");
      setSelectedTopics([]);
      props.navigation.goBack();
    }
  };

  return (
    <ScreenTemplate>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior="padding"
        keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
      >
        <View style={styles.container}>
          <TextInput
            style={[styles.input, { backgroundColor: "white", flex: 1 }]}
            placeholder="Share your thoughts..."
            value={postText}
            multiline={true}
            onChangeText={(text) => setPostText(text)}
          />
          <ScrollView style={{ flex: 1 }}>
            <View style={styles.topicsContainer}>
              {predefinedTopics.map((topic) => (
                <TouchableOpacity
                  key={topic}
                  style={[
                    styles.topicButton,
                    selectedTopics.includes(topic) &&
                      styles.selectedTopicButton,
                  ]}
                  onPress={() => toggleTopic(topic)}
                >
                  <Text
                    style={[
                      styles.topicButtonText,
                      selectedTopics.includes(topic) &&
                        styles.selectedTopicText,
                    ]}
                  >
                    {topic}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
          <View style={styles.buttonContainer}>
            <Button
              style={styles.button}
              class="primary"
              text="Post"
              onPress={placePost}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScreenTemplate>
  );
};

export default AddPost;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    margin: 20,
    padding: 16,
    borderRadius: 20,
    backgroundColor: "white",
  },
  input: {
    flex: 0.8,
    height: 100,
    borderColor: "gray",
    borderWidth: 2,
    paddingHorizontal: 8,
    backgroundColor: "white",
    borderColor: "purple",
    borderRadius: 10,
  },
  topicsContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    marginVertical: 12,
  },
  topicButton: {
    backgroundColor: "white",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginVertical: 8,
    marginRight: 8,
    borderColor: "#0a1145",
    borderWidth: 2,
  },
  selectedTopicButton: {
    backgroundColor: "#0a1145",
  },
  topicButtonText: {
    color: "black",
  },
  selectedTopicText: {
    color: "white",
  },
});
