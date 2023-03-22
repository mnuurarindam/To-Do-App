import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";

export default class Todo extends React.Component {
  constructor() {
    super();
    this.state = {
      newItem: "",
      listOfItems: [],
    };
  }

  deleteItem(id) {
    const list = this.state.listOfItems;
    const updatedList = list.filter((item) => item.id !== id);
    this.setState({
      listOfItems: updatedList,
    });
  }
  updateInput(key, value) {
    this.setState({
      [key]: value,
    });
  }
  addItem = () => {
    if (this.state.newItem != "") {
      const newItemJSON = {
        id: 1 + Math.random(),
        value: this.state.newItem.slice(),
      };

      const list = this.state.listOfItems;

      list.push(newItemJSON);

      this.setState({
        listOfItems: list,
        newItem: "",
      });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.textView}>
          <Text style={styles.text}>To-Do Lists</Text>
        </View>
        <View>
          <TextInput
            placeholder="  List item baru..."
            style={styles.inputBox}
            onChangeText={(text) => {
              this.setState({ newItem: text });
            }}
            value={this.state.newItem}
          ></TextInput>
          <View>
            <TouchableOpacity style={styles.button} onPress={this.addItem}>
              <Text style={styles.buttontext}>+</Text>
            </TouchableOpacity>
          </View>

          <View>
            <ScrollView>
              {this.state.listOfItems.map((item) => {
                return (
                  <View style={styles.listview}>
                    <Text style={styles.textstyle}> {item.value}</Text>
                    <TouchableOpacity
                      style={{
                        backgroundColor: "#1466FF",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: 10,
                      }}
                      onPress={() => this.deleteItem(item.id)}
                    >
                      <Text style={{ color: "white" }}>Delete</Text>
                    </TouchableOpacity>
                  </View>
                );
              })}
            </ScrollView>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E5EEFF",
  },
  textView: {
    backgroundColor: "#1466FF",
    height: 80,
  },
  text: {
    textAlign: "center",
    marginTop: "10%",
    fontSize: 25,
    color: "white",
    fontWeight: "bold",
  },
  inputBox: {
    backgroundColor: "white",
    textAlign: "center",
    fontSize: 20,
    height: 40,
  },
  button: {
    position: "absolute",
    right: 20,
    top: 200,
    backgroundColor: "#1466FF",
    width: 50,
    height: 50,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    elevation: 8,
  },

  buttontext: {
    color: "#fff",
    fontSize: 24,
  },
  textstyle: {
    fontSize: 20,
    color: "#1466FF",
  },
  listview: {
    borderWidth: 2,
    height: 40,
    justifyContent: "space-between",
    borderColor: "#1466FF",
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
});