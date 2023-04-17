import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import thunk from "redux-thunk";
import { put, takeLatest } from "redux-saga";

const sagaMiddleware = createSagaMiddleware();

// Action Types
const ADD_ITEM = "ADD_ITEM";
const DELETE_ITEM = "DELETE_ITEM";
const SET_ITEMS = "SET_ITEMS";
const UPDATE_INPUT = "UPDATE_INPUT"; // add this

// Action Creators
export const addItem = (value) => ({ type: ADD_ITEM, value });
export const deleteItem = (id) => ({ type: DELETE_ITEM, id });
export const setItems = (items) => ({ type: SET_ITEMS, items });
export const updateInput = (key, value) => ({ type: UPDATE_INPUT, key, value }); // add this


// Reducer
const initialState = {
  newItem: "",
  listOfItems: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM:
      const newItemJSON = {
        id: state.listOfItems.length + 1,
        value: action.value.slice(),
      };

      const list = state.listOfItems.slice();

      list.push(newItemJSON);

      return {
        ...state,
        listOfItems: list,
        newItem: "",
      };
    case DELETE_ITEM:
      const updatedList = state.listOfItems.filter(
        (item) => item.id !== action.id
      );
      return {
        ...state,
        listOfItems: updatedList,
      };
    case SET_ITEMS:
      return {
        ...state,
        listOfItems: action.items,
      };
    case UPDATE_INPUT: // add this
      return {
        ...state,
        [action.key]: action.value,
      };
    default:
      return state;
  }
};

// Sagas
function* addItemSaga(action) {
  yield put(addItem(action.value));
}

function* deleteItemSaga(action) {
  yield put(deleteItem(action.id));
}

function* rootSaga() {
  yield takeLatest("ADD_ITEM_ASYNC", addItemSaga);
  yield takeLatest("DELETE_ITEM_ASYNC", deleteItemSaga);
}

// Store
const store = createStore(reducer, applyMiddleware(thunk, sagaMiddleware));
sagaMiddleware.run(rootSaga);

export default class todo extends React.Component {
  constructor() {
    super();
    this.state = store.getState();
  }

  componentDidMount() {
    store.subscribe(() => {
      this.setState(store.getState());
    });
  }

  addItem = () => {
    if (this.state.newItem !== "") {
      store.dispatch({ type: "ADD_ITEM_ASYNC", value: this.state.newItem });
      store.dispatch({ type: "ADD_ITEM", value: this.state.newItem });
    }
  };

  deleteItem = (id) => {
    store.dispatch(deleteItem(id));
  };


  updateInput(key, value) {
    store.dispatch(updateInput(key, value));
  }

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
              this.updateInput("newItem", text);
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
                    <Text style={styles.textstyle}>
                      {item.value}
                    </Text>
                    <TouchableOpacity
                      style={styles.deletebutton}
                      onPress={() => this.deleteItem(item.id)}
                      >
                      <Text style={styles.deletetext}>x</Text>
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
backgroundColor: "#F5FCFF",
},
textView: {
backgroundColor: "#E91E63",
height: 70,
justifyContent: "center",
alignItems: "center",
},
text: {
color: "white",
fontSize: 20,
},
inputBox: {
marginTop: 20,
marginLeft: 20,
marginRight: 20,
fontSize: 18,
borderWidth: 1,
borderColor: "#E91E63",
borderRadius: 8,
height: 50,
paddingLeft: 10,
},
button: {
backgroundColor: "#E91E63",
marginLeft: 20,
marginRight: 20,
marginTop: 10,
height: 50,
borderRadius: 8,
justifyContent: "center",
alignItems: "center",
},
buttontext: {
color: "white",
fontSize: 25,
},
listview: {
flexDirection: "row",
marginLeft: 20,
marginRight: 20,
marginTop: 10,
backgroundColor: "#F5FCFF",
borderRadius: 8,
height: 50,
alignItems: "center",
},
textstyle: {
fontSize: 18,
marginLeft: 20,
flex: 1,
},
deletebutton: {
width: 50,
height: 50,
backgroundColor: "#E91E63",
borderRadius: 8,
justifyContent: "center",
alignItems: "center",
},
deletetext: {
color: "white",
fontSize: 20,
},
});