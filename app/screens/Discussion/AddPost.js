import React, { useState, useEffect, useContext } from 'react';
import { View, TextInput, Button, TouchableOpacity, Text, StyleSheet } from 'react-native';
import AuthContext from "../../auth/context";
import postsApi from "../../api/postsApi";

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
  "Others"
];

const AddPost = (props) => {
  const [postText, setPostText] = useState('');
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
      setSelectedTopics(selectedTopics.filter((selectedTopic) => selectedTopic !== topic));
    } else {
      if (selectedTopics.length < 2) {
        setSelectedTopics([...selectedTopics, topic]);
      } else {
        setSelectedTopics([]);
      }
    }
  };

  const placePost = async () => {
    if (selectedTopics.length < 1 || postText == '') {
      setPostText('');
      setSelectedTopics([]);
    } else {
      const postData = {
        content: postText,
        user: authContext.user._id,
        topics: selectedTopics,
        }

      try {
        const response = await postsApi.AddPost(postData);

        if (response.status === 201) {
          console.log('Post created:', response.data);
        } else {
          console.error('Error creating post:', response.data.message);
        }
      } catch (error) {
        console.error('Error creating post:', error.message);
      }

      // Clear the text input and selected topics after creating the post
      setPostText('');
      setSelectedTopics([]);
    };
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Share your thoughts..."
        value={postText}
        onChangeText={(text) => setPostText(text)}
      />
      <View style={styles.topicsContainer}>
        {predefinedTopics.map((topic) => (
          <TouchableOpacity
            key={topic}
            style={[
              styles.topicButton,
              selectedTopics.includes(topic) && styles.selectedTopicButton
            ]}
            onPress={() => toggleTopic(topic)}
          >
            <Text style={styles.topicButtonText}>{topic}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Button title="Post" onPress={placePost} />
    </View>
  );
};

export default AddPost;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
  input: {
    height: 100,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  topicsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  topicButton: {
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginVertical: 8,
    marginRight: 8,
  },
  selectedTopicButton: {
    backgroundColor: '#4CAF50',
  },
  topicButtonText: {
    color: '#333',
  },
});