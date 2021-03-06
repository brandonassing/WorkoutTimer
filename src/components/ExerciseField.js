import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import FloatingLabelInput from './FloatingLabelInput';
import { editTimeslot, deleteTimeslot } from '../Actions/ChangeWorkoutRoutine';
import { Button, ButtonGroup, Icon } from 'react-native-elements';

const mapDispatchToProps = dispatch => {
  return {
    editTimeslot: workoutData => dispatch(editTimeslot(workoutData)),
    deleteTimeslot: id => dispatch(deleteTimeslot(id))
  }
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around"
  },
  inputField: {
    height: 60
  },
  exerciseInput: {
    flexGrow: 5
  },
  timeInput: {
    flexGrow: 1
  },
  deleteButton: {
    flexGrow: 1
  }
});

class ExerciseField extends Component {
  constructor(props) {
      super(props);
      this.updateInfo = this.updateInfo.bind(this);
      this.deleteTimeslot = this.deleteTimeslot.bind(this);
    }

    updateInfo(value, type){
      if (type == "name") {
        this.props.editTimeslot({
          seconds: this.props.seconds,
          type: this.props.type,
          name: value,
          id: this.props.id
        });
      }
      else if (type == "seconds") {
        let secondsVal = 0;
        if (value > 0 && value != "" && value != undefined && value != null) {
          secondsVal = parseInt(value);
        }
        this.props.editTimeslot({
          seconds: secondsVal,
          type: this.props.type,
          name: this.props.name,
          id: this.props.id
        });
      }
    }

    deleteTimeslot(){
      this.props.deleteTimeslot(this.props.id);
    }

    render() {
      console.log("render field");
      //TODO add max input for seconds and name
      //TODO prevent blank name
      return (
        <View style={styles.container}>
          <TextInput
            style={[styles.inputField, styles.exerciseInput]}
            onChangeText={(name) => this.updateInfo(name, "name")}
            value={this.props.name}
            editable={this.props.type == "Exercise"}
          />
          <TextInput
            style={[styles.inputField, styles.timeInput]}
            onChangeText={(seconds) => this.updateInfo(seconds, "seconds")}
            value={this.props.seconds}
            keyboardType = 'numeric'
          />
          <Button
            icon={{
                name: 'close',
                size: 15,
                color: 'black'
            }}
            onPress={this.deleteTimeslot}
          />
        </View>
      );
    }
}
/*<FloatingLabelInput
  style={styles.exerciseInput}
  label="Exercise"
  value={this.state.exerciseName}
  onChangeText={(exerciseName) => this.setState({exerciseName})}
/>
<FloatingLabelInput
  style={styles.timeInput}
  label="Time"
  value={this.state.seconds}
  onChangeText={(seconds) => this.setState({seconds})}
/>*/
export default connect(null, mapDispatchToProps)(ExerciseField)
