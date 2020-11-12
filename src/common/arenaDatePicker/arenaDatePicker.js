import React, { Component } from "react";
import "date-fns";
import Grid from "@material-ui/core/Grid";
import { MuiPickersUtilsProvider, DateTimePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

export default class ArenaDatePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDate: new Date(),
    };
  }

  handleDateChange = (date) => {
    this.props.onChange(date);
  };

  render() {
    return (
      <React.Fragment>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid>
            <div
              id={`${this.props.id}`}
              className="arenaDatePickerMainContainer"
            >
              <DateTimePicker
                value={this.props.value}
                onChange={this.handleDateChange}
                minDate={this.props.minDate}
                inputProps={{
                  "aria-label": `${this.props.ariaLabelText}`,
                }}
                KeyboardButtonProps={{
                  "aria-label": `change ${this.props.ariaLabelText}`,
                }}
                DialogProps={{
                  className: "datePickerDialog",
                }}
              />
              {/* <KeyboardDatePicker
                disableToolbar
                variant="inline"
                className="date-picker-dialog"
                format={DATE_FORMAT}
                value={this.props.value}
                onChange={this.handleDateChange}
                inputProps={{
                  "aria-label": `${this.props.ariaLabelText}`,
                }}
                KeyboardButtonProps={{
                  "aria-label": `change ${this.props.ariaLabelText}`,
                }}
                minDate={this.props.minDate}
              /> */}
            </div>
          </Grid>
        </MuiPickersUtilsProvider>
      </React.Fragment>
    );
  }
}
