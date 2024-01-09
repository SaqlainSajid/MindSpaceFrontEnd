
import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, TouchableOpacity, Text, StyleSheet } from 'react-native';
import axios from 'axios'; // Install axios using "npm install axios"
import ScreenTemplate from "../../components/ScreenTemplate";
//Api sauce


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
        console.warn('Maximum limit of topics (2) reached for this post.');
      }
    }
  };

  const placePost = async () => {
    const postData = {
      content: postText,
      user: "userId",  //How to get userID??
      topics: selectedTopics,
    };

    try {
      const response = await axios.post('https://brainy-boa-teddy.cyclic.app/posts/topics', postData);

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

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Share your thoughts..."
        value={postText}
        onChangeText={(text) => setPostText(text)}
        onSubmitEditing={placePost}
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