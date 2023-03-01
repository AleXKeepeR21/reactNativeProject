import {
  collection,
  doc,
  query,
  setDoc,
  getDocs,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Pressable,
} from "react-native";
import { db } from "../../firebase/config";
import { useSelector } from "react-redux";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

const CommentsScreen = ({ route }) => {
  const { postId } = route.params;
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [commentId, setCommentId] = useState(null);
  const { login, userId } = useSelector((state) => state.auth);

  useEffect(() => {
    getAllComments();
  }, [commentId]);

  const createComment = async () => {
    const uniqueCommentId = Date.now().toString();

    await setDoc(doc(db, "posts", postId, "comments", uniqueCommentId), {
      comment,
      login,
      userId,
    });
    setCommentId(uniqueCommentId);
    setComment(null);
  };

  const deleteComment = async (uniqueCommentId) => {
    await deleteDoc(doc(db, "posts", postId, "comments", uniqueCommentId));
    setCommentId(uniqueCommentId + "deleted");
  };

  const commentsRef = query(collection(db, "posts", postId, "comments"));
  const postRef = doc(db, "posts", postId);

  const getAllComments = async () => {
    let allComments = [];
    const comments = await getDocs(commentsRef);

    await comments.forEach((commData) => {
      allComments.push({ ...commData.data(), id: commData.id });
    });

    const commentsCount = comments.size;

    await updateDoc(postRef, { commentsCount: commentsCount });

    const allOrderedComments = allComments.sort(
      (firstComment, secondComment) => secondComment.id - firstComment.id
    );
    setComments(allOrderedComments);
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={comments}
          renderItem={({ item }) => (
            <View style={styles.comments}>
              <View>
                <Text>author {item.login}:</Text>
                <Text>comment: {item.comment}</Text>
              </View>

              {/* <View style={{ maxWidth: 270 }}>
                {item.userId !== userId ? (
                  <Text style={{ fontStyle: "italic" }}>
                    author: {item.login}
                  </Text>
                ) : (
                  <Text style={{ fontStyle: "italic" }}>author: You</Text>
                )}
                <Text>{item.comment}</Text>
              </View> */}

              <View style={{ minWidth: 30 }}>
                {item.userId === userId && (
                  <Pressable
                    title={"Delete"}
                    onPress={() => deleteComment(item.id)}
                  >
                    <MaterialIcons
                      name="delete-outline"
                      size={24}
                      color="#FFCCCB"
                    />
                  </Pressable>
                )}
              </View>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={setComment}
          placeholder="Коментувати..."
        />
        <TouchableOpacity activeOpacity={0.5} onPress={createComment}>
          <Ionicons name="arrow-up-circle-sharp" size={44} color="#FF6C00" />
        </TouchableOpacity>
        {/* {!comment ? ( 
          <View
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minWidth: 300,
              height: 50,
              padding: 10,
              borderColor: "grey",
              borderRadius: 100,
              marginBottom: 10,
              backgroundColor: "#F6F6F6",
              marginTop: 20,
            }}
          >
            <Text>Publish</Text>
          </View>
        ) : (
          <Pressable
            title={"Post"}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minWidth: 300,
              height: 50,
              padding: 10,
              borderColor: "grey",
              borderRadius: 100,
              marginBottom: 10,
              backgroundColor: "#FF6C00",
              marginTop: 20,
            }}
            onPress={createComment}
          >
            <Text>Publish</Text>
          </Pressable>
        )} */}
      </View>
      <View></View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
  },
  formButton: {
    backgroundColor: "#FF6C00",
    height: 51,
    borderRadius: 100,
    marginTop: 28,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 16,
  },
  textButton: {
    fontSize: 16,
    color: "#FFFFFF",
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#BDBDBD",
    height: 50,
    borderWidth: 1,
    borderColor: "transparent",
    borderColor: "#E8E8E8",
    backgroundColor: "#F6F6F6",
    borderRadius: 100,
    paddingLeft: 10,
  },
  inputContainer: {
    marginTop: 32,
    marginBottom: 10,
    marginHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  comments: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: 300,
    minHeight: 30,
    borderColor: "lightgrey",
    backgroundColor: "#rgba(0, 0, 0, 0.03)",
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 5,
    padding: 5,
  },
});

export default CommentsScreen;
