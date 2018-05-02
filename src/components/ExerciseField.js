import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import FloatingLabelInput from './FloatingLabelInput';
import { editTimeslot } from '../Actions/ChangeWorkoutRoutine';

const mapDispatchToProps = dispatch => {
  return {
    editTimeslot: workoutData => dispatch(editTimeslot(workoutData))
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
  }
});

class ExerciseField extends Component {
  constructor(props) {
      super(props);
      this.updateInfo = this.updateInfo.bind(this);
    }

    updateInfo(value, type){
      if (type=="name") {
        this.props.editTimeslot({
          seconds: this.props.seconds,
          type: this.props.type,
          name: value,
          id: this.props.id
        });
      }
      else if (type=="seconds") {
        this.props.editTimeslot({
          seconds: parseInt(value),
          type: this.props.type,
          name: this.props.name,
          id: this.props.id
        });
      }
    }
    
    render() {
      console.log("render field");
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