// import React, { useState } from "react";
// import { Camera } from "expo-camera";
// import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

// import { MaterialIcons } from "@expo/vector-icons";

// const CreatePostsScreen = () => {
//   const [camera, setCamera] = useState(null);
//   const [photo, setPhoto] = useState("");

//   const takePhoto = async () => {
//     const photo = await camera.takePictureAsync();
//     setPhoto(photo.uri);
//   };

//   return (
//     <View style={styles.container}>
//       <Camera style={styles.camera} ref={setCamera}>
//         <View>
//           <Image source={{ url: photo }} />
//         </View>
//         <TouchableOpacity onPress={takePhoto} style={styles.cameraWrap}>
//           {/* <Entypo name="instagram-with-circle" size={24} color="#BDBDBD" /> */}
//           <MaterialIcons name="photo-camera" size={24} color="#BDBDBD" />
//           {/* <Text style={styles.cameraTitle}>ппп</Text> */}
//         </TouchableOpacity>
//       </Camera>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     // justifyContent: "center",
//     // alignItems: "center",
//   },
//   camera: {
//     marginTop: 32,
//     height: 240,
//     marginHorizontal: 16,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   cameraWrap: {
//     borderWidth: 1,
//     backgroundColor: "#FFFFFF",
//     width: 60,
//     height: 60,
//     borderRadius: 50,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   cameraTitle: {
//     color: "black",
//   },
// });

// export default CreatePostsScreen;

import React, { useState, useEffect, useRef } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";

export default function Home() {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();

      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={type}
        ref={(ref) => {
          setCameraRef(ref);
        }}
      >
        <View style={styles.photoView}>
          <TouchableOpacity
            style={styles.flipContainer}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}
          >
            <Text style={{ fontSize: 18, marginBottom: 10, color: "white" }}>
              {" "}
              Flip{" "}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={async () => {
              if (cameraRef) {
                const { uri } = await cameraRef.takePictureAsync();
                await MediaLibrary.createAssetAsync(uri);
              }
            }}
          >
            <View style={styles.takePhotoOut}>
              <View style={styles.takePhotoInner}></View>
            </View>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  camera: { flex: 1 },
  photoView: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "flex-end",
  },

  flipContainer: {
    flex: 0.1,
    alignSelf: "flex-end",
  },

  button: { alignSelf: "center" },

  takePhotoOut: {
    borderWidth: 2,
    borderColor: "white",
    height: 50,
    width: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },

  takePhotoInner: {
    borderWidth: 2,
    borderColor: "white",
    height: 40,
    width: 40,
    backgroundColor: "white",
    borderRadius: 50,
  },
});
